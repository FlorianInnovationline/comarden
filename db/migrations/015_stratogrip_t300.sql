-- ============================================================================
-- Comarden - Migration 015: STRATO GRIP - STRATOGRIP T300 + Pistolet (2 products)
-- ----------------------------------------------------------------------------
--   1. STRATOGRIP T300 (canister 22 L) - colle PU toiture plate
--   2. Pistolet pour T300 + Tuyau 2 m  - accessoire d'application
-- brand = 'STRATO GRIP', category colles-mastics (010).
--
-- NOTE: unlike the lead/quote rows, these have REAL prices/stock (client):
--   - T300     : price_cents 48900 (489,00 EUR for ~350 m²), stock 10, no discount
--   - Pistolet : price_cents 27000 (270,00 EUR list), discount_percent 63
--     (=> 99,90 EUR final), stock 10
--
-- Custom pages at /shop/produit/<slug>. Content verbatim from the client.
-- No em dashes. Idempotent: ON CONFLICT (slug) DO UPDATE (images preserved).
-- ============================================================================

begin;

insert into public.products
  (slug, title, description, category_id, brand, price_cents, discount_percent, currency, sku, stock, is_active, images, tags, specs, avantages, variants, lien_produit, warning)
values
  -- 1. STRATOGRIP T300 (canister 22 L)
  (
    $q$stratogrip-t300-22l$q$,
    $q$STRATOGRIP T300 - Colle polyuréthane toiture plate (canister 22 L)$q$,
    $q$La STRATOGRIP T300 est une colle polyuréthane monocomposant à prise rapide, spécialement développée pour le collage des panneaux d'isolation sur les toitures plates. Conditionnée en canister de 22 litres, elle permet une application rapide, régulière et efficace sur chantier et constitue une excellente alternative aux systèmes de fixation mécanique pour de nombreuses applications de toiture plate. Elle convient au collage de panneaux PIR, PUR, ISO, EPS et XPS sur différents supports tels que le béton, le contreplaqué, les panneaux cimentaires et certains supports bitumineux existants.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$STRATO GRIP$q$, 48900, null, $q$EUR$q$, $q$STRATOGRIP-T300$q$, 10, true, '[]'::jsonb,
    array[$q$stratogrip$q$,$q$colle polyuréthane$q$,$q$toiture plate$q$,$q$isolation$q$,$q$pir$q$,$q$pur$q$,$q$eps$q$,$q$xps$q$,$q$panneaux isolants$q$],
    array[
      $q$Produit : STRATOGRIP T300$q$,
      $q$Type : colle polyuréthane monocomposant (durcit à l'humidité)$q$,
      $q$Conditionnement : canister 22 L$q$,
      $q$Application : collage de panneaux isolants en toiture plate$q$,
      $q$Rendement : jusqu'à ± 350 m² par canister*$q$,
      $q$Temps d'attente : jusqu'à ± 2 minutes selon les conditions d'application*$q$,
      $q$Durée de conservation : jusqu'à 12 mois selon les conditions de stockage*$q$,
      $q$Isolants compatibles : PIR, PUR, ISO, EPS, XPS et panneaux à surface tissée$q$,
      $q$Supports : béton, contreplaqué, panneaux cimentaires et supports compatibles$q$,
      $q$Utilisation : construction neuve et rénovation$q$
    ],
    array[
      $q$Application rapide : système monocomposant en canister$q$,
      $q$Jusqu'à ± 350 m² par canister de 22 L$q$,
      $q$Temps d'attente très court (max ± 2 minutes avant pose de l'isolant)$q$,
      $q$Gain de temps sur chantier grâce à l'application par pulvérisation$q$,
      $q$Moins de déchets d'emballage$q$,
      $q$Collage solide et durable une fois polymérisée$q$,
      $q$Solution développée pour les professionnels (couvreurs, étancheurs)$q$
    ],
    array[
      $q$Canister 22 L (jusqu'à ± 350 m²)$q$
    ],
    $q$https://stratogrip.com/$q$,
    $q$Les rendements, temps d'attente, compatibilités et performances peuvent varier selon le support, la température, l'humidité, les conditions de chantier et les prescriptions du fabricant. Toujours consulter la fiche technique avant application.$q$
  ),

  -- 2. Pistolet pour T300 + Tuyau 2 m
  (
    $q$pistolet-t300-tuyau-2m$q$,
    $q$Pistolet pour STRATOGRIP T300 (colle PU) + Tuyau 2 m$q$,
    $q$Pistolet applicateur professionnel pour la colle polyuréthane STRATOGRIP T300, livré avec un tuyau de 2 m. Il permet une pulvérisation régulière et maîtrisée de la colle sur le support lors de la pose des panneaux d'isolation en toiture plate.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$STRATO GRIP$q$, 27000, 63, $q$EUR$q$, $q$STRATOGRIP-T300-PISTOLET$q$, 10, true, '[]'::jsonb,
    array[$q$stratogrip$q$,$q$pistolet$q$,$q$applicateur$q$,$q$colle pu$q$,$q$t300$q$,$q$toiture plate$q$,$q$accessoire$q$],
    array[
      $q$Type : pistolet applicateur pour colle PU$q$,
      $q$Compatibilité : colle STRATOGRIP T300$q$,
      $q$Tuyau : longueur 2 m (inclus)$q$,
      $q$Application : collage de panneaux isolants en toiture plate$q$
    ],
    array[
      $q$Application régulière et maîtrisée de la colle$q$,
      $q$Livré avec un tuyau de 2 m$q$,
      $q$Compatible avec le canister STRATOGRIP T300$q$,
      $q$Conçu pour un usage professionnel sur chantier$q$
    ],
    '{}'::text[],
    $q$https://stratogrip.com/$q$, null
  )

on conflict (slug) do update set
  title            = excluded.title,
  description      = excluded.description,
  category_id      = excluded.category_id,
  brand            = excluded.brand,
  price_cents      = excluded.price_cents,
  discount_percent = excluded.discount_percent,
  currency         = excluded.currency,
  sku              = excluded.sku,
  stock            = excluded.stock,
  is_active        = excluded.is_active,
  tags             = excluded.tags,
  specs            = excluded.specs,
  avantages        = excluded.avantages,
  variants         = excluded.variants,
  lien_produit     = excluded.lien_produit,
  warning          = excluded.warning;
  -- images intentionally NOT updated on conflict (preserve admin-uploaded Storage URLs).

commit;

-- Verification
select slug, sku, title, price_cents, discount_percent, stock, brand
from public.products
where slug in ('stratogrip-t300-22l', 'pistolet-t300-tuyau-2m')
order by slug;
