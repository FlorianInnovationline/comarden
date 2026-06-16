import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { isAdmin } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const BUCKET = "product-images";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

function isValidProductSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length >= 2 && slug.length <= 120;
}

function sanitizeBaseName(name: string): string {
  const base = path.basename(name, path.extname(name));
  return base
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "image";
}

export async function POST(request: NextRequest) {
  // Middleware already enforces admin on /api/admin/*, but defence-in-depth.
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Formulaire invalide" }, { status: 400 });
  }

  const slugRaw = formData.get("slug");
  const file = formData.get("file");

  if (typeof slugRaw !== "string" || !isValidProductSlug(slugRaw)) {
    return NextResponse.json(
      { error: "Slug produit invalide (lettres minuscules, chiffres et tirets uniquement)" },
      { status: 400 }
    );
  }

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `Fichier trop volumineux (max ${MAX_BYTES / 1024 / 1024} Mo)` },
      { status: 400 }
    );
  }

  const mime = file.type || "application/octet-stream";
  if (!ALLOWED_MIME.has(mime)) {
    return NextResponse.json(
      { error: "Type non autorisé (JPEG, PNG, WebP, GIF)" },
      { status: 400 }
    );
  }

  const ext = EXT_BY_MIME[mime];
  const base = sanitizeBaseName(file.name);
  const filename = `${base}-${Date.now()}${ext}`;
  const objectPath = `${slugRaw}/${filename}`;

  let sb;
  try {
    sb = createSupabaseAdminClient();
  } catch (e) {
    console.error("Product image upload: Supabase admin client error:", e);
    return NextResponse.json(
      {
        error:
          "Stockage non configuré : vérifiez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.",
      },
      { status: 503 }
    );
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const { error: uploadErr } = await sb.storage
    .from(BUCKET)
    .upload(objectPath, buf, {
      contentType: mime,
      upsert: false,
      cacheControl: "31536000",
    });

  if (uploadErr) {
    console.error("Product image upload (storage) error:", uploadErr.message);
    return NextResponse.json(
      { error: `Échec de l'envoi vers le stockage : ${uploadErr.message}` },
      { status: 500 }
    );
  }

  const { data: pub } = sb.storage.from(BUCKET).getPublicUrl(objectPath);
  if (!pub?.publicUrl) {
    return NextResponse.json(
      { error: "Fichier envoyé mais URL publique introuvable." },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: pub.publicUrl, filename }, { status: 201 });
}
