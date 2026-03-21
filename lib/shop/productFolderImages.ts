import fs from "fs";
import path from "path";
import type { Product } from "@/types/shop";

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function isSafeProductSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 120;
}

/**
 * Lists image files in `public/images/products/<slug>/` and returns public URL paths.
 * Ignores `.gitkeep` and hidden files.
 */
export function listProductImageUrlsFromDisk(slug: string): string[] {
  if (!isSafeProductSlug(slug)) return [];

  const dir = path.join(process.cwd(), "public", "images", "products", slug);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    return [];
  }

  let names: string[];
  try {
    names = fs.readdirSync(dir);
  } catch {
    return [];
  }

  const files = names.filter((n) => {
    if (!n || n.startsWith(".")) return false;
    if (n === ".gitkeep") return false;
    const ext = path.extname(n).toLowerCase();
    return IMAGE_EXT.has(ext);
  });

  files.sort((a, b) => {
    const aMain = a.toLowerCase().startsWith("main") ? 0 : 1;
    const bMain = b.toLowerCase().startsWith("main") ? 0 : 1;
    if (aMain !== bMain) return aMain - bMain;
    return a.localeCompare(b, "fr", { sensitivity: "base" });
  });

  return files.map((n) => `/images/products/${slug}/${n}`);
}

function urlDedupeKey(url: string): string {
  const u = url.trim();
  if (u.startsWith("http://") || u.startsWith("https://")) {
    return `abs:${u}`;
  }
  return `path:${u.split("?")[0]}`;
}

/**
 * Merges `product.images` (admin / DB / seed) with files found on disk for this slug.
 * Order: DB URLs first (curated order + external links), then folder files not already listed.
 */
export function mergeProductImagesWithFolder(product: {
  slug: string;
  images?: string[] | null;
}): string[] {
  const fromDb = Array.isArray(product.images)
    ? product.images.map((x) => (typeof x === "string" ? x.trim() : "")).filter(Boolean)
    : [];

  const fromFolder = listProductImageUrlsFromDisk(product.slug);
  const seen = new Set<string>();
  const out: string[] = [];

  for (const u of fromDb) {
    const k = urlDedupeKey(u);
    if (!seen.has(k)) {
      seen.add(k);
      out.push(u);
    }
  }
  for (const u of fromFolder) {
    const k = urlDedupeKey(u);
    if (!seen.has(k)) {
      seen.add(k);
      out.push(u);
    }
  }

  return out;
}

/** Returns a shallow copy of the product with `images` = folder + DB merge */
export function withMergedProductImages<P extends Product>(product: P): P {
  return {
    ...product,
    images: mergeProductImagesWithFolder(product),
  };
}
