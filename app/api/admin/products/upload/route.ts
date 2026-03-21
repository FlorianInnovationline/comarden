import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

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

async function requireAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session");
  const devAdmin = cookieStore.get("dev_admin");
  return (
    adminSession?.value === "authenticated" || devAdmin?.value === "true"
  );
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // Vercel / serverless: filesystem is read-only — uploads must be done locally then git push,
  // or use external storage (S3, Supabase Storage, etc.).
  if (process.env.VERCEL === "1") {
    return NextResponse.json(
      {
        error:
          "L'upload vers le disque n'est pas disponible sur Vercel. Ajoutez les images dans public/images/products/<slug>/ en local, puis poussez le dépôt, ou configurez un stockage cloud.",
      },
      { status: 501 }
    );
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

  const dir = path.join(process.cwd(), "public", "images", "products", slugRaw);
  const fullPath = path.join(dir, filename);

  try {
    await mkdir(dir, { recursive: true });
    const buf = Buffer.from(await file.arrayBuffer());
    await writeFile(fullPath, buf);
  } catch (e) {
    console.error("Product image upload write error:", e);
    return NextResponse.json(
      { error: "Échec de l'enregistrement du fichier" },
      { status: 500 }
    );
  }

  const publicUrl = `/images/products/${slugRaw}/${filename}`;
  return NextResponse.json({ url: publicUrl, filename }, { status: 201 });
}
