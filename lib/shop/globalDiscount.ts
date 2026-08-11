// ============================================================================
// Site-wide percentage discount.
// ----------------------------------------------------------------------------
// Stored as a single reserved row in `promotions`, identified by a sentinel
// `code`. The column is UNIQUE, so there can only ever be one such row and the
// admin page can upsert it on conflict - no schema change needed.
//
// Business rules (shared by every surface that displays a price):
//   - only products in stock (stock > 0) are discounted
//   - "Sur devis" products (price_cents === 0) are never discounted, there is
//     no price to reduce
//   - the discount only applies when the row is active and the percent is 1..100
// ============================================================================

/** Reserved `promotions.code` marking the single site-wide discount row. */
export const GLOBAL_DISCOUNT_CODE = "__GLOBAL_DISCOUNT__";

/** Title stored alongside the sentinel row (shown nowhere public). */
export const GLOBAL_DISCOUNT_TITLE = "Remise globale du site";

export interface GlobalDiscount {
  /** Whole percent off, 1..100. */
  percent: number;
}

/**
 * True when this product is eligible for the site-wide discount.
 *
 * Eligibility is "has a real price". The `stock` column is not maintained in
 * this catalogue (every product sits at 0), so keying off it would discount
 * nothing. Products priced at 0 are quote-only ("Sur devis") and are never
 * discounted - there is no price to reduce.
 */
export function isDiscountable(product: { price_cents: number }): boolean {
  return product.price_cents > 0;
}

/**
 * Returns the discounted price in cents, rounded to the nearest cent.
 * Falls back to the original price when the product is not eligible.
 */
export function discountedPriceCents(
  product: { price_cents: number },
  percent: number
): number {
  if (!isValidPercent(percent) || !isDiscountable(product)) {
    return product.price_cents;
  }
  return Math.round(product.price_cents * (1 - percent / 100));
}

/** Percent must be a whole number strictly between 0 and 100 inclusive. */
export function isValidPercent(percent: unknown): percent is number {
  return (
    typeof percent === "number" &&
    Number.isInteger(percent) &&
    percent > 0 &&
    percent <= 100
  );
}
