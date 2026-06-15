// ============================================================================
// Comarden — Supabase health check (READ-ONLY)
// ----------------------------------------------------------------------------
// Usage:
//   node scripts/healthcheck.mjs
//
// Credential resolution order:
//   1. process.env (NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY / SUPABASE_SERVICE_ROLE_KEY)
//   2. .env.local
//   3. .env.local.example  (ONLY as a last resort — prints a loud warning,
//      because committed keys are a security problem and should be rotated)
//
// This script performs ONLY read-only operations:
//   - connection test
//   - table existence + row counts (service-role, bypasses RLS)
//   - products column sample
//   - profiles / admin presence
//   - auth user count (auth.admin.listUsers)
//   - storage bucket listing
//   - category + product slug listing
//
// It NEVER prints secret values. It does NOT write to the database.
//
// NOTE: PostgREST does not expose information_schema / pg_policies / pg_indexes,
// so full schema/RLS/index/trigger introspection must be run in the Supabase
// SQL Editor. The SQL to paste there is printed at the end.
// ============================================================================

import { readFileSync, existsSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

// Node < 22 has no global WebSocket. We never use Realtime here, so a stub is
// enough to let createClient() construct without pulling in the "ws" package.
if (typeof globalThis.WebSocket === "undefined") {
  globalThis.WebSocket = class {
    constructor() {
      throw new Error("Realtime not used in healthcheck");
    }
  };
}

const ok = (s) => `✅ ${s}`;
const bad = (s) => `❌ ${s}`;
const warn = (s) => `⚠️  ${s}`;

function parseEnvFile(path) {
  const out = {};
  if (!existsSync(path)) return out;
  for (const lineRaw of readFileSync(path, "utf8").split("\n")) {
    const line = lineRaw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const k = line.slice(0, eq).trim();
    let v = line.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[k] = v;
  }
  return out;
}

function resolveCreds() {
  const need = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"];
  // 1. process env
  if (need.every((k) => process.env[k])) {
    return { source: "process.env", vals: Object.fromEntries(need.map((k) => [k, process.env[k]])) };
  }
  // 2. .env.local
  if (existsSync(".env.local")) {
    const e = parseEnvFile(".env.local");
    if (need.every((k) => e[k])) return { source: ".env.local", vals: e };
  }
  // 3. .env.local.example (last resort)
  if (existsSync(".env.local.example")) {
    const e = parseEnvFile(".env.local.example");
    if (need.every((k) => e[k])) return { source: ".env.local.example (INSECURE FALLBACK)", vals: e };
  }
  return null;
}

async function main() {
  console.log("================ Comarden Supabase health check ================\n");

  const creds = resolveCreds();
  if (!creds) {
    console.log(bad("No usable credentials found in process.env, .env.local, or .env.local.example."));
    console.log("   Set the three Supabase env vars and re-run.");
    process.exit(1);
  }
  console.log(`Credential source: ${creds.source}`);
  if (creds.source.includes("example")) {
    console.log(warn("Using keys from the COMMITTED example file. These should be rotated & scrubbed."));
  }
  const url = creds.vals.NEXT_PUBLIC_SUPABASE_URL;
  const anon = creds.vals.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const service = creds.vals.SUPABASE_SERVICE_ROLE_KEY;

  // isSupabaseConfigured() === both public vars present
  const configured = Boolean(url) && Boolean(anon);
  console.log(configured ? ok("isSupabaseConfigured() would return TRUE") : bad("isSupabaseConfigured() would return FALSE"));
  console.log(`URL format ${/^https:\/\/[a-z0-9]+\.supabase\.co/.test(url) ? "valid" : "INVALID"}: ${url.replace(/(https:\/\/[a-z0-9]{4})[a-z0-9]+/, "$1…")}`);
  console.log("");

  const sb = createClient(url, service, { auth: { autoRefreshToken: false, persistSession: false } });

  // --- Connection test (SELECT 1 equivalent) ---
  console.log("---- Connection test ----");
  {
    const { error } = await sb.from("categories").select("id", { count: "exact", head: true });
    if (error && error.code === "42P01") {
      console.log(warn("Connected, but 'categories' table does not exist (PGRST/42P01)."));
    } else if (error) {
      console.log(bad(`Connection/query failed: ${error.message} (code ${error.code ?? "?"})`));
    } else {
      console.log(ok("Connection OK (service-role query succeeded)"));
    }
  }
  console.log("");

  // --- Table existence + row counts ---
  console.log("---- Tables & row counts (service-role, bypasses RLS) ----");
  const tables = [
    "profiles", "categories", "products", "orders", "order_items",
    "promotions", "events", "job_postings", "job_applications",
  ];
  const counts = {};
  for (const t of tables) {
    const { count, error } = await sb.from(t).select("*", { count: "exact", head: true });
    if (error) {
      counts[t] = null;
      const missing = error.code === "42P01";
      console.log(`  ${missing ? bad(`${t}: MISSING`) : warn(`${t}: error ${error.code ?? ""} ${error.message}`)}`);
    } else {
      counts[t] = count ?? 0;
      console.log(`  ${ok(`${t}: ${count} row(s)`)}`);
    }
  }
  console.log("");

  // --- products column sample ---
  console.log("---- products columns (sampled from a row; types need SQL editor) ----");
  {
    const { data, error } = await sb.from("products").select("*").limit(1);
    if (error) console.log(bad(`products select failed: ${error.message}`));
    else if (!data?.length) console.log(warn("products has 0 rows — cannot sample columns via REST."));
    else console.log("  columns: " + Object.keys(data[0]).join(", "));
  }
  console.log("");

  // --- profiles / admin presence ---
  console.log("---- Admin / profiles ----");
  if (counts.profiles !== null) {
    const { count: adminCount, error } = await sb
      .from("profiles").select("*", { count: "exact", head: true }).eq("role", "admin");
    if (error) console.log(bad(`admin count failed: ${error.message}`));
    else console.log(adminCount > 0 ? ok(`${adminCount} admin profile(s)`) : bad("NO admin profiles — nobody can access /admin"));
  }

  // --- auth.users count ---
  {
    const { data, error } = await sb.auth.admin.listUsers({ page: 1, perPage: 1 });
    if (error) console.log(bad(`auth.admin.listUsers failed: ${error.message}`));
    else {
      const total = data?.total ?? data?.users?.length ?? "unknown";
      console.log(ok(`auth.users reachable (page1 returned ${data?.users?.length ?? 0}; total≈${total})`));
    }
  }
  console.log("");

  // --- storage buckets ---
  console.log("---- Storage buckets ----");
  {
    const { data, error } = await sb.storage.listBuckets();
    if (error) console.log(bad(`listBuckets failed: ${error.message}`));
    else {
      const names = (data ?? []).map((b) => `${b.name}(${b.public ? "public" : "private"})`);
      console.log("  found: " + (names.length ? names.join(", ") : "(none)"));
      for (const want of [["cvs", false], ["event-media", true], ["product-images", true]]) {
        const found = (data ?? []).find((b) => b.name === want[0]);
        console.log("  " + (found ? ok(`${want[0]} present (${found.public ? "public" : "private"})`) : bad(`${want[0]} MISSING`)));
      }
    }
  }
  console.log("");

  // --- categories list ---
  console.log("---- Categories in DB ----");
  {
    const { data, error } = await sb.from("categories").select("name,slug").order("name");
    if (error) console.log(bad(error.message));
    else (data ?? []).forEach((c) => console.log(`  - ${c.slug}  (${c.name})`));
  }
  console.log("");

  // --- product slugs ---
  console.log("---- Product slugs in DB ----");
  {
    const { data, error } = await sb.from("products").select("slug").order("slug");
    if (error) console.log(bad(error.message));
    else {
      console.log(`  ${data?.length ?? 0} product(s)`);
      (data ?? []).forEach((p) => console.log(`  - ${p.slug}`));
    }
  }
  console.log("");

  console.log("================ Run this in the Supabase SQL Editor for schema/RLS/index/trigger drift ================");
  console.log(`
-- tables
select table_name from information_schema.tables where table_schema='public' order by 1;
-- products columns
select column_name, data_type, is_nullable, column_default
  from information_schema.columns
  where table_schema='public' and table_name='products' order by ordinal_position;
-- RLS enabled?
select relname, relrowsecurity from pg_class
  where relnamespace='public'::regnamespace and relkind='r' order by 1;
-- policies
select tablename, policyname, cmd, roles from pg_policies where schemaname='public' order by 1,2;
-- indexes
select tablename, indexname from pg_indexes where schemaname='public' order by 1,2;
-- triggers
select event_object_table, trigger_name from information_schema.triggers
  where trigger_schema='public' order by 1,2;
-- functions
select proname from pg_proc where pronamespace='public'::regnamespace order by 1;
`);
  console.log("================ done ================");
}

main().catch((e) => { console.error(bad(`Uncaught: ${e?.message ?? e}`)); process.exit(1); });
