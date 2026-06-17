-- ============================================================================
-- Comarden — Migration 003: MG Bouw (Meuwissen Gerritsen) products
-- ----------------------------------------------------------------------------
-- Adds 3 technical films to public.products:
--   miofol-125s, miofol-active-xtr, polytex-xtr
-- brand = 'MG BOUW' (matched case-insensitively by /marques/mg-bouw).
-- category = isolation (11111111-1111-1111-1111-000000000004) for now.
-- price_cents 0 (lead/quote), EUR, stock 0, is_active true, images '[]'.
--
-- Idempotent: ON CONFLICT (slug) DO UPDATE (images left untouched on re-run so
-- admin-uploaded Storage URLs survive). Run ONCE in the Supabase SQL Editor.
--
-- Source: the 3 MG Bouw PDFs (Miofol 125S, Miofol Active XTR, Polytex XTR).
-- Strings are dollar-quoted ($q$...$q$) so French apostrophes need no escaping.
-- All values transcribed from the PDFs and reviewed (Phase 3B clarifications).
-- ============================================================================

begin;

insert into public.products
  (slug, title, description, category_id, brand, price_cents, currency, sku, stock, is_active, images, tags, specs, avantages, variants, lien_produit, warning)
values
  -- ===== 1. Miofol® 125S =====
  (
    $q$miofol-125s$q$,
    $q$Miofol® 125S — Membrane pare-vapeur renforcée$q$,
    $q$Miofol® 125S de Meuwissen Gerritsen est une membrane technique pour la construction, renforcée et retardatrice de vapeur. Le film composite a une durée de vie extrêmement longue grâce à l'utilisation de PE vierge. La vapeur provenant de la pièce ne peut pas pénétrer dans la structure ou l'isolation à travers le Miofol® 125S.$q$,
    $q$11111111-1111-1111-1111-000000000004$q$,
    $q$MG BOUW$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$pare-vapeur$q$, $q$membrane$q$, $q$mg bouw$q$, $q$étanchéité à l'air$q$, $q$toiture$q$, $q$mur$q$],
    array[
      $q$Perméabilité à la vapeur d'eau : 0,6 g/m²/jour$q$,
      $q$Résistance à la température : -20 °C / +80 °C$q$,
      $q$Résistance relative à l'humidité : Sd 40 m$q$,
      $q$Résistance à la déchirure du clou (longueur initiale) : 400 N$q$,
      $q$Résistance à la déchirure du clou (transversale initiale) : 365 N$q$,
      $q$Résistance initiale à la traction (longitudinal) : 330 N / 50 mm$q$,
      $q$Résistance initiale à la traction (transversal) : 290 N / 50 mm$q$,
      $q$Allongement à la rupture (longitudinal) : 20 %$q$,
      $q$Allongement à la rupture (transversal) : 16 %$q$,
      $q$Poids : 125 g/m²$q$,
      $q$Étanchéité : W1$q$,
      $q$Classe feu : F$q$
    ],
    array[
      $q$Imperméable à l'eau$q$,
      $q$Résistance élevée à la traction et à l'allongement à la rupture$q$,
      $q$Étanchéité à l'air$q$,
      $q$Traitement plus rapide que le film plié$q$,
      $q$Le renforcement prévient les dommages potentiels à l'étanchéité à l'air$q$,
      $q$La composition du LDPE empêche la dégradation à long terme$q$
    ],
    array[
      $q$1,50 m × 25 m — réf 6112415026 — EAN 8714672002683 — 44 rouleaux/palette$q$,
      $q$1,50 m × 50 m — réf 6112415010 — EAN 8714672000900 — 22 rouleaux/palette$q$,
      $q$2,00 m × 50 m — réf 6112420010 — EAN 8714672000085 — 22 rouleaux/palette$q$,
      $q$2,60 m × 50 m — réf 6112426010 — EAN 8714672000092 — 22 rouleaux/palette$q$
    ],
    $q$https://www.mg-bouw.com/miofol-125s/$q$,
    null
  ),

  -- ===== 2. Miofol® Active XTR =====
  (
    $q$miofol-active-xtr$q$,
    $q$Miofol® Active XTR — Membrane à perméabilité variable$q$,
    $q$Miofol® Active XTR est une membrane à perméabilité variable à la vapeur, composée d'un non-tissé en polypropylène, d'un film copolymère en polyéthylène et d'un renfort tissé pour une résistance accrue à la déchirure et à la traction. Miofol® Active XTR est donc particulièrement adapté à l'isolation par insufflation. La membrane a une double fonction : en hiver, le film présente une résistance élevée à la vapeur (pare-vapeur) et en été, il présente une faible résistance à la vapeur (ouvert à la vapeur) — l'humidité éventuelle peut alors s'échapper vers l'intérieur de la construction. Miofol® Active XTR peut ainsi être utilisé de manière optimale dans les constructions où le côté froid ne peut pas ou peu respirer. C'est le film idéal pour les matériaux d'isolation biosourcés et l'isolation par insufflation.$q$,
    $q$11111111-1111-1111-1111-000000000004$q$,
    $q$MG BOUW$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$pare-vapeur$q$, $q$membrane climatique$q$, $q$perméabilité variable$q$, $q$mg bouw$q$, $q$insufflation$q$, $q$biosourcé$q$],
    array[
      $q$Temps d'ouverture : 1 mois$q$,
      $q$Résistance à la température : -40 °C / +80 °C$q$,
      $q$Poids : 100 g/m²$q$,
      $q$Valeur Sd (perméabilité variable) : 0,34 – 46,6 m$q$,
      $q$Résistance initiale à la déchirure des clous (longueur) : ≥ 230 N$q$,
      $q$Résistance initiale à la déchirure des clous (transversale) : ≥ 230 N$q$,
      $q$Résistance initiale à la traction (longitudinale) : ≥ 300 N / 50 mm$q$,
      $q$Résistance initiale à la traction (transversale) : ≥ 260 N / 50 mm$q$,
      $q$Étanchéité : W1$q$,
      $q$Classe de résistance au feu : E$q$
    ],
    array[
      $q$Pare-vapeur intelligent à régulation automatique$q$,
      $q$Valeur Sd variable$q$,
      $q$Solution idéale pour les constructions fermées$q$,
      $q$Film le plus adapté pour les matériaux isolants biosourcés$q$,
      $q$Évacuation rapide de l'humidité présente dans la construction$q$,
      $q$Très haute résistance à la déchirure et à la traction$q$,
      $q$Contribue à un climat intérieur sain$q$,
      $q$Très adapté à l'isolation par insufflation$q$
    ],
    array[
      $q$1,50 m × 50 m — réf 8610015000 — EAN 8714672002690 — 30 rouleaux/palette$q$,
      $q$3,00 m × 50 m — réf 8610030000 — EAN 8714672002713 — 30 rouleaux/palette$q$
    ],
    $q$https://www.mg-bouw.com/miofol-active/$q$,
    null
  ),

  -- ===== 3. Polytex® XTR =====
  (
    $q$polytex-xtr$q$,
    $q$Polytex® XTR — Membrane pare-pluie 4 couches haute résistance$q$,
    $q$Polytex® XTR est une membrane de toiture et façade à quatre couches très résistantes. Elle est composée de deux couches de polypropylène, d'un film respirant microporeux et d'un renfort tissé qui améliore sa résistance à la déchirure et à la traction. Cette membrane imperméable protège la structure contre le vent et la pluie, tout en permettant à la vapeur de s'évacuer vers l'extérieur.$q$,
    $q$11111111-1111-1111-1111-000000000004$q$,
    $q$MG BOUW$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$pare-pluie$q$, $q$membrane$q$, $q$écran de sous-toiture$q$, $q$mg bouw$q$, $q$toiture$q$, $q$façade$q$, $q$coupe-vent$q$],
    array[
      $q$Durée d'exposition aux UV : 2 mois$q$,
      $q$Résistance à la température : -40 °C / +80 °C$q$,
      $q$Résistance relative à l'humidité : Sd 0,025 m$q$,
      $q$Résistance à la déchirure du clou (longueur initiale) : 500 N$q$,
      $q$Résistance à la déchirure du clou (transversale initiale) : 450 N$q$,
      $q$Résistance initiale à la traction (longitudinal) : 500 N / 50 mm$q$,
      $q$Résistance initiale à la traction (transversal) : 470 N / 50 mm$q$,
      $q$Allongement à la rupture (longitudinal) : > 65 %$q$,
      $q$Allongement à la rupture (transversal) : 65 %$q$,
      $q$Poids : 200 g/m²$q$,
      $q$Étanchéité : W1$q$,
      $q$Classe feu : E$q$
    ],
    array[
      $q$Très résistant$q$,
      $q$Bande adhésive intégrée$q$,
      $q$Imperméable à l'eau / à la pluie$q$,
      $q$Ouvert à la vapeur$q$,
      $q$Coupe-vent$q$,
      $q$Résistance élevée à la traction et à l'allongement à la rupture$q$,
      $q$Peut être appliqué directement sur les panneaux et la laine minérale$q$,
      $q$Toit et façade$q$
    ],
    array[
      $q$1,50 m × 50 m — réf 8220015000 — EAN 8714672002409 — 25 rouleaux/palette$q$
    ],
    $q$https://www.mg-bouw.com/polytex-xtr/$q$,
    null
  )

on conflict (slug) do update set
  title        = excluded.title,
  description  = excluded.description,
  category_id  = excluded.category_id,
  brand        = excluded.brand,
  price_cents  = excluded.price_cents,
  currency     = excluded.currency,
  sku          = excluded.sku,
  stock        = excluded.stock,
  is_active    = excluded.is_active,
  tags         = excluded.tags,
  specs        = excluded.specs,
  avantages    = excluded.avantages,
  variants     = excluded.variants,
  lien_produit = excluded.lien_produit,
  warning      = excluded.warning;
  -- images intentionally NOT updated on conflict (preserve admin-uploaded Storage URLs).

commit;

-- ===========================================================================
-- Verification (read-only) — expect 3 rows, brand MG BOUW, isolation category
-- ===========================================================================
select
  slug,
  title,
  brand,
  category_id,
  is_active,
  array_length(specs, 1)     as n_specs,
  array_length(avantages, 1) as n_avantages,
  array_length(variants, 1)  as n_variants
from public.products
where slug in ('miofol-125s', 'miofol-active-xtr', 'polytex-xtr')
order by slug;
