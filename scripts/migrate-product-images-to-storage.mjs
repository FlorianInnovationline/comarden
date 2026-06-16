// ============================================================================
// Comarden — one-time migration: disk product images → Supabase Storage
// ----------------------------------------------------------------------------
// Uploads every image under public/images/products/<slug>/ to the
// `product-images` bucket, then sets products.images[] to the resulting public
// URLs (only when the row's images[] is currently empty, so admin-curated lists
// are never clobbered).
//
// Usage:
//   node scripts/migrate-product-images-to-storage.mjs            # safe, idempotent
//   node scripts/migrate-product-images-to-storage.mjs --force    # re-upload + overwrite images[]
//
// Idempotency model (safe to re-run):
//   - If the bucket ALREADY has objects for a slug and --force is NOT set, the
//     script does NOT re-upload. It REUSES the existing objects' public URLs so
//     it can still populate products.images[] if a previous run uploaded files
//     but failed to update the DB.
//   - With --force, it re-uploads the disk files (new timestamped names,
//     upsert:true) and overwrites products.images[] regardless of current value.
//   - DB update (non-force) happens only when products.images[] is empty.
//
// Reads credentials from .env.local (or process.env / .env.local.example).
// Uses the service-role admin client (bypasses RLS). READS disk, WRITES Storage
// + the products table. Does NOT touch public/images/products/ (left as the
// transitional fallback).
// ============================================================================

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

// Node < 22 has no global WebSocket; Realtime is unused here.
if (typeof globalThis.WebSocket === "undefined") {
  globalThis.WebSocket = class {
    constructor() {
      throw new Error("Realtime not used in migration");
    }
  };
}

const BUCKET = "product-images";
const PRODUCTS_DIR = path.join(process.cwd(), "public", "images", "products");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const MIME_BY_EXT = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};
const FORCE = process.argv.includes("--force");

// ---- env loading (process.env → .env.local → .env.local.example) -----------
function parseEnvFile(p) {
  const out = {};
  if (!existsSync(p)) return out;
  for (const raw of readFileSync(p, "utf8").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    let v = line.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[line.slice(0, eq).trim()] = v;
  }
  return out;
}

function resolveCreds() {
  const need = ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];
  if (need.every((k) => process.env[k])) {
    return { NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY };
  }
  for (const f of [".env.local", ".env.local.example"]) {
    const e = parseEnvFile(f);
    if (need.every((k) => e[k] && !e[k].includes("your-"))) return e;
  }
  return null;
}

// ---- helpers ---------------------------------------------------------------
function isSafeSlug(slug) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 120;
}

function sanitizeBaseName(name) {
  const base = path.basename(name, path.extname(name));
  return (
    base.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) ||
    "image"
  );
}

// main* first, then alphabetical (fr) — mirrors listProductImageUrlsFromDisk()
function sortImages(names) {
  return [...names].sort((a, b) => {
    const am = a.toLowerCase().startsWith("main") ? 0 : 1;
    const bm = b.toLowerCase().startsWith("main") ? 0 : 1;
    if (am !== bm) return am - bm;
    return a.localeCompare(b, "fr", { sensitivity: "base" });
  });
}

function listLocalImages(slug) {
  const dir = path.join(PRODUCTS_DIR, slug);
  if (!existsSync(dir) || !statSync(dir).isDirectory()) return [];
  const names = readdirSync(dir).filter((n) => {
    if (!n || n.startsWith(".") || n === ".gitkeep") return false;
    return IMAGE_EXT.has(path.extname(n).toLowerCase());
  });
  return sortImages(names);
}

async function listBucketImages(sb, slug) {
  const { data, error } = await sb.storage.from(BUCKET).list(slug, { limit: 1000 });
  if (error) throw new Error(`storage list failed: ${error.message}`);
  const names = (data ?? [])
    .map((o) => o.name)
    .filter((n) => n && IMAGE_EXT.has(path.extname(n).toLowerCase()));
  return sortImages(names);
}

function publicUrl(sb, objectPath) {
  return sb.storage.from(BUCKET).getPublicUrl(objectPath).data.publicUrl;
}

// ---- main ------------------------------------------------------------------
async function main() {
  console.log("=== Migrate product images → Supabase Storage ===");
  console.log(FORCE ? "mode: --force (re-upload + overwrite images[])" : "mode: safe (idempotent)");

  const creds = resolveCreds();
  if (!creds) {
    console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (set them in .env.local).");
    process.exit(1);
  }
  if (!existsSync(PRODUCTS_DIR)) {
    console.error(`❌ ${PRODUCTS_DIR} not found.`);
    process.exit(1);
  }

  const sb = createClient(creds.NEXT_PUBLIC_SUPABASE_URL, creds.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const slugs = readdirSync(PRODUCTS_DIR)
    .filter((n) => statSync(path.join(PRODUCTS_DIR, n)).isDirectory())
    .filter(isSafeSlug)
    .sort();

  let processed = 0;
  let filesUploaded = 0;
  let dbUpdated = 0;
  const failures = [];

  for (const slug of slugs) {
    processed++;
    try {
      const localFiles = listLocalImages(slug);
      if (localFiles.length === 0) {
        console.log(`[skip] ${slug}: no local image files`);
        continue;
      }

      // Decide: re-upload, or reuse existing bucket objects?
      const existing = await listBucketImages(sb, slug);
      let urls;

      if (existing.length > 0 && !FORCE) {
        urls = existing.map((n) => publicUrl(sb, `${slug}/${n}`));
        console.log(`[reuse] ${slug}: ${existing.length} object(s) already in bucket (use --force to re-upload)`);
      } else {
        urls = [];
        const ts = Date.now();
        for (let i = 0; i < localFiles.length; i++) {
          const name = localFiles[i];
          const ext = path.extname(name).toLowerCase();
          const objectPath = `${slug}/${ts + i}-${sanitizeBaseName(name)}${ext}`;
          const buf = readFileSync(path.join(PRODUCTS_DIR, slug, name));
          const { error: upErr } = await sb.storage.from(BUCKET).upload(objectPath, buf, {
            contentType: MIME_BY_EXT[ext] || "application/octet-stream",
            upsert: FORCE,
            cacheControl: "31536000",
          });
          if (upErr) throw new Error(`upload ${name}: ${upErr.message}`);
          filesUploaded++;
          urls.push(publicUrl(sb, objectPath));
        }
      }

      // Update DB — only when images[] is empty, unless --force.
      const { data: rows, error: selErr } = await sb
        .from("products")
        .select("id, images")
        .eq("slug", slug)
        .limit(1);
      if (selErr) throw new Error(`product lookup: ${selErr.message}`);

      if (!rows || rows.length === 0) {
        console.log(`[ok] ${slug}: ${urls.length} URL(s) ready, but NO matching products row — DB not updated`);
        continue;
      }

      const current = Array.isArray(rows[0].images) ? rows[0].images : [];
      if (current.length > 0 && !FORCE) {
        console.log(`[ok] ${slug}: images[] already set (${current.length}) — left untouched`);
        continue;
      }

      const { error: updErr } = await sb.from("products").update({ images: urls }).eq("slug", slug);
      if (updErr) throw new Error(`db update: ${updErr.message}`);
      dbUpdated++;
      console.log(`[OK] ${slug}: ${urls.length} file(s) ready, DB updated`);
    } catch (e) {
      const msg = e?.message ?? String(e);
      failures.push({ slug, msg });
      console.log(`[FAIL] ${slug}: ${msg}`);
    }
  }

  console.log("\n=== Summary ===");
  console.log(`  products processed: ${processed}`);
  console.log(`  files uploaded:     ${filesUploaded}`);
  console.log(`  DB rows updated:    ${dbUpdated}`);
  console.log(`  failures:           ${failures.length}`);
  for (const f of failures) console.log(`    - ${f.slug}: ${f.msg}`);
  process.exit(failures.length > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error("Uncaught:", e?.message ?? e);
  process.exit(1);
});
