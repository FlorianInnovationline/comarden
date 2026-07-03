-- ============================================================================
-- Comarden - Migration 009: Algimouss products (4)
-- ----------------------------------------------------------------------------
-- Adds 4 Algimouss products (brand = 'ALGIMOUSS'), all in Colles & Mastics (010)
-- to group with the existing ALGIMOUSS rows:
--   1. ALGIALGUES          -> traitement toiture/mur/façade (à diluer)
--   2. ALGIALGUES PREMIUM  -> traitement curatif + préventif (prêt à l'emploi)
--   3. ALGIBAC             -> nettoyant bac acier
--   4. ALGIFUGE            -> hydrofuge toiture et façade
-- Source: Algimouss product datasheets (images) + algimouss.com.
-- Custom rich pages at /shop/produit/<slug> (AlgimoussProductPage component).
-- NOTE: the uploaded images 3 and 4 are the SAME product (ALGIBAC), so there
-- are 4 distinct products, not 5.
-- price_cents 0 (lead/quote), EUR, stock 0, is_active true, images '[]'.
-- Idempotent: ON CONFLICT (slug) DO UPDATE (images preserved). Dollar-quoted.
-- No em dashes - plain hyphens only.
-- ============================================================================

begin;

insert into public.products
  (slug, title, description, category_id, brand, price_cents, currency, sku, stock, is_active, images, tags, specs, avantages, variants, lien_produit, warning)
values
  -- 1. ALGIALGUES (à diluer)
  (
    $q$algialgues$q$,
    $q$ALGIALGUES - Traitement toiture, mur et façade (à diluer)$q$,
    $q$Traitement curatif et préventif à diluer. Élimine durablement lichens, algues et moisissures sur les toitures, les murs et les façades, et retarde leur réapparition. Sans rinçage et sans chlore, il ne modifie pas l'aspect ni la structure des supports, y compris le zinc.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$ALGIMOUSS$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$algimouss$q$,$q$entretien$q$,$q$traitement$q$,$q$anti-mousse$q$,$q$toiture$q$,$q$façade$q$],
    array[
      $q$Type : traitement curatif et préventif à diluer$q$,
      $q$Conditionnement : 5 L, 30 L$q$,
      $q$Consommation : 1 litre = jusqu'à 6 m²$q$,
      $q$Dilution : 1 L de produit pour 1 L à 5 L d'eau selon l'encrassement$q$,
      $q$Délai d'action : 3 à 9 mois$q$,
      $q$Conditions d'application : entre 5 °C et 25 °C$q$,
      $q$Sans rinçage et sans chlore : oui$q$,
      $q$Après application : prévoir au moins 12 heures sans pluie$q$
    ],
    array[
      $q$Élimine durablement lichens, algues et moisissures sur toitures, murs et façades$q$,
      $q$Retarde leur réapparition$q$,
      $q$Sans rinçage et sans chlore$q$,
      $q$Facile et rapide à appliquer$q$,
      $q$Ne modifie pas l'aspect ni la structure des supports (y compris le zinc)$q$,
      $q$Recommandé avant mise en peinture pour éviter le cloquage et l'écaillement$q$
    ],
    array[ $q$ALGIALGUES 5 L$q$, $q$ALGIALGUES 30 L$q$ ],
    $q$https://algimouss.com/$q$, null
  ),

  -- 2. ALGIALGUES PREMIUM (prêt à l'emploi)
  (
    $q$algialgues-premium$q$,
    $q$ALGIALGUES PREMIUM - Traitement curatif et préventif (prêt à l'emploi)$q$,
    $q$Traitement curatif et préventif prêt à l'emploi, à base de sels d'ammonium quaternaire. Élimine en profondeur les dépôts verts, lichens, mousses et moisissures sur les toitures, façades et murs, et retarde leur réapparition pendant 3 à 5 ans. Sans rinçage, il s'applique pur au pulvérisateur.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$ALGIMOUSS$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$algimouss$q$,$q$entretien$q$,$q$traitement$q$,$q$curatif$q$,$q$préventif$q$,$q$anti-mousse$q$],
    array[
      $q$Type : traitement curatif et préventif prêt à l'emploi$q$,
      $q$Composition : sels d'ammonium quaternaire$q$,
      $q$Conditionnement : 1 L, 5 L$q$,
      $q$Rendement moyen : 1 litre traite 5 à 10 m² (25 à 50 m² par bidon de 5 L)$q$,
      $q$Application : au pulvérisateur, au rouleau ou à la brosse, sur support sec$q$,
      $q$Effet préventif : 3 à 5 ans$q$,
      $q$Conditions d'application : entre 5 °C et 25 °C, temps sec (pas de pluie sous 24 h)$q$,
      $q$Sans rinçage et sans chlore : oui$q$,
      $q$Homologation : autorisé par les ministères de la santé belge et néerlandais (N° 3708B)$q$
    ],
    array[
      $q$Double action : détruit instantanément les micro-organismes et retarde leur réapparition pendant 3 à 5 ans$q$,
      $q$Respect du support : sans chlore et non corrosif, n'altère pas les matériaux ni les métaux comme le zinc$q$,
      $q$Prêt à l'emploi : s'applique pur, aucun rinçage nécessaire$q$,
      $q$Idéal avant peinture : évite cloquage et écaillage (minimum 5 jours avant de peindre)$q$,
      $q$Accessible à tous pour entretenir son toit ou sa façade$q$
    ],
    array[ $q$ALGIALGUES PREMIUM 1 L$q$, $q$ALGIALGUES PREMIUM 5 L$q$ ],
    $q$https://algimouss.com/produit/anti-mousse-toiture-algimouss-pro/$q$, null
  ),

  -- 3. ALGIBAC (nettoyant bac acier)
  (
    $q$algibac$q$,
    $q$ALGIBAC - Nettoyant bac acier$q$,
    $q$Nettoyant spécifique pour les toitures et bardages en bac acier. Nettoie les salissures tenaces (traces de pollution, verdissures et fientes d'oiseaux), supprime le film statique sur les bardages et redonne un aspect propre. Efficace en 10 minutes, sans chlore, ni soude caustique, ni acide.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$ALGIMOUSS$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$algimouss$q$,$q$nettoyage$q$,$q$bac acier$q$,$q$bardage$q$,$q$toiture$q$],
    array[
      $q$Type : nettoyant bac acier$q$,
      $q$Conditionnement : 5 L, 15 L, 30 L$q$,
      $q$Consommation : 1 litre = environ 10 m²$q$,
      $q$Efficacité : en 10 minutes$q$,
      $q$Composition : sans chlore, ni soude caustique, ni acide$q$,
      $q$Conditions d'application : entre 5 °C et 25 °C$q$,
      $q$Utilisable par faible pluie : oui$q$
    ],
    array[
      $q$Nettoie les salissures tenaces (pollution, verdissures, fientes d'oiseaux) sur bac acier$q$,
      $q$Supprime le film statique sur les bardages et redonne un aspect propre$q$,
      $q$Efficace en 10 minutes$q$,
      $q$N'altère pas les matériaux$q$,
      $q$Composition sans chlore, ni soude caustique, ni acide$q$,
      $q$Utilisable par faible pluie$q$
    ],
    array[ $q$ALGIBAC 5 L$q$, $q$ALGIBAC 15 L$q$, $q$ALGIBAC 30 L$q$ ],
    $q$https://algimouss.com/$q$, $q$Ne jamais appliquer sur des bardages repeints.$q$
  ),

  -- 4. ALGIFUGE (hydrofuge toiture et façade)
  (
    $q$algifuge-toiture-facade$q$,
    $q$ALGIFUGE - Hydrofuge toiture et façade$q$,
    $q$Hydrofuge de protection longue durée pour les toitures, les murs et les façades. Protège de l'eau, du gel et du vieillissement, limite l'incrustation des salissures et empêche la pénétration de l'eau dans les matériaux, tout en laissant respirer le support. Non filmogène, il ne modifie pas l'aspect ni la structure des matériaux.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$ALGIMOUSS$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$algimouss$q$,$q$protection$q$,$q$hydrofuge$q$,$q$toiture$q$,$q$façade$q$],
    array[
      $q$Type : hydrofuge de protection, non filmogène$q$,
      $q$Conditionnement : 5 L, 15 L$q$,
      $q$Consommation : 1 litre = environ 5 m²$q$,
      $q$Conditions d'application : entre 8 °C et 25 °C, sur support sec$q$,
      $q$Temps de séchage : 12 heures minimum selon la porosité$q$,
      $q$Effet : protection hydrofuge longue durée$q$
    ],
    array[
      $q$Protège durablement toitures, murs et façades de l'eau, du gel et du vieillissement$q$,
      $q$Limite l'incrustation des salissures$q$,
      $q$Empêche la pénétration de l'eau dans les matériaux$q$,
      $q$Retarde l'apparition des micro-organismes (lichens, algues, moisissures, champignons)$q$,
      $q$Non filmogène, laisse respirer le support$q$,
      $q$Ne modifie pas l'aspect ni la structure des matériaux$q$
    ],
    array[ $q$ALGIFUGE 5 L$q$, $q$ALGIFUGE 15 L$q$ ],
    $q$https://algimouss.com/$q$, $q$Ne jamais appliquer sur des matériaux non absorbants (ardoises, verre, plastiques, peintures, métaux, bardeaux bitumineux).$q$
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

-- OPTIONAL (recommended): retire the older generic anti-mousse row, now superseded
-- by ALGIALGUES PREMIUM, so the brand page does not show two near-identical items.
-- Reversible (set is_active back to true). Comment out this line to keep it visible.
update public.products set is_active = false
where slug = 'anti-mousse-toiture-algimouss-pro';

commit;

-- Verification - expect the 4 new active ALGIMOUSS rows (+ ALGIFUGE BOIS)
select slug, title, is_active,
       array_length(specs,1)     as n_specs,
       array_length(avantages,1) as n_avantages
from public.products
where brand = 'ALGIMOUSS'
order by is_active desc, slug;
