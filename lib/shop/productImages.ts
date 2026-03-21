import { PLACEHOLDER_PRODUCT_IMAGE } from "@/lib/site";

/**
 * Shop images are stored under `/images/products/<slug>/...` and listed in `product.images`.
 * The site does not auto-scan folders — you must save URLs in the product (admin / seed / DB).
 */
export function resolveProductImageSrc(src: string | undefined | null): string {
  if (!src || typeof src !== "string" || !src.trim()) {
    return PLACEHOLDER_PRODUCT_IMAGE;
  }
  const s = src.trim();
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.startsWith("/images/products/")) return s;
  // Legacy guard: empty or generic /images/* paths (not product folder) → placeholder
  if (s.startsWith("/images/") && !s.startsWith("/images/logos/")) {
    return PLACEHOLDER_PRODUCT_IMAGE;
  }
  if (s.startsWith("/")) return s;
  return PLACEHOLDER_PRODUCT_IMAGE;
}

export function resolveProductGalleryImages(images: string[] | undefined | null): string[] {
  const raw = (images || []).map((x) => x?.trim()).filter((x): x is string => Boolean(x));
  if (raw.length === 0) return [PLACEHOLDER_PRODUCT_IMAGE];
  return raw.map((src) => resolveProductImageSrc(src));
}
