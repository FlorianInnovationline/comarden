-- ===========================================================================
-- 015 - Per-variant pricing
-- ---------------------------------------------------------------------------
-- Products keep their `variants text[]` list of labels. This adds an optional
-- price for each of those labels, stored as a jsonb object keyed by the exact
-- variant label:
--
--   {"Ép. 30 mm - réf 00230822": 59142, "Ép. 35 mm - réf 00230827": 61200}
--
-- Values are prices in CENTS, matching products.price_cents.
--
-- Purely additive and nullable: any product without variant pricing keeps
-- behaving exactly as before, and code that only reads `variants` is unaffected.
-- ===========================================================================

alter table public.products
  add column if not exists variant_prices jsonb;

comment on column public.products.variant_prices is
  'Optional price per variant label, in cents. Keys must match entries of products.variants. Example: {"Ép. 30 mm": 59142}';

-- ===========================================================================
-- Per-product discount
-- ---------------------------------------------------------------------------
-- Each product carries its own discount percentage, so different products can
-- run different promotions at the same time. NULL or 0 means "no discount".
-- ===========================================================================

alter table public.products
  add column if not exists discount_percent integer
  check (discount_percent is null or (discount_percent >= 0 and discount_percent <= 100));

comment on column public.products.discount_percent is
  'Discount applied to this product, in whole percent (1-100). NULL or 0 = no discount.';

create index if not exists idx_products_discount_percent
  on public.products(discount_percent)
  where discount_percent is not null and discount_percent > 0;
