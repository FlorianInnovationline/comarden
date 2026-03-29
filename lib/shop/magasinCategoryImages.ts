import { PLACEHOLDER_PRODUCT_IMAGE } from "@/lib/site";

/**
 * Hero images for shop category cards on /shop (Magasin).
 * Paths are under public/images/Magasin/.
 */
export const MAGASIN_CATEGORY_IMAGES: Record<string, string> = {
  "etancheite-epdm": "/images/Magasin/1.jpg",
  "isolation-ite": "/images/Magasin/2.jpg",
  "visserie-fixations": "/images/Magasin/3.jpg",
  "colles-mastics": "/images/Magasin/6.jpg",
  "entretien-toiture": "/images/Magasin/4.jpg",
  "accessoires-rives": "/images/Magasin/5.jpg",
};

export function resolveShopCategoryImageUrl(
  slug: string,
  dbImageUrl?: string | null
): string {
  const magasin = MAGASIN_CATEGORY_IMAGES[slug];
  if (magasin) return magasin;
  const trimmed = dbImageUrl?.trim();
  if (trimmed) return trimmed;
  return PLACEHOLDER_PRODUCT_IMAGE;
}
