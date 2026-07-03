-- ============================================================================
-- Comarden - Migration 010: Algimouss products (7 more)
-- ----------------------------------------------------------------------------
-- Adds 7 Algimouss products (brand = 'ALGIMOUSS'), all in Colles & Mastics (010):
--   1. ALGIFUGE COLORÉ            -> hydrofuge coloré toiture
--   2. ALGINET BOIS               -> nettoyant bardage / terrasses bois
--   3. ALGINET SOLAIRE            -> nettoyant panneaux photovoltaïques
--   4. ALGINET TOITURES           -> nettoyant toitures
--   5. ALGIPULVE lance 3,20 m     -> équipement (lance télescopique)
--   6. ALGIPULVE lance 5,40 m     -> équipement (lance télescopique)
--   7. ALGISPRAY (ALGIPULVE PRO III) -> équipement (pulvérisateur sur chariot)
-- Source: Algimouss product datasheets (images) + algimouss.com.
-- Custom rich pages at /shop/produit/<slug> (AlgimoussProductPage component).
-- price_cents 0 (lead/quote), EUR, stock 0, is_active true, images '[]'.
-- Idempotent: ON CONFLICT (slug) DO UPDATE (images preserved). Dollar-quoted.
-- No em dashes - plain hyphens only.
-- ============================================================================

begin;

insert into public.products
  (slug, title, description, category_id, brand, price_cents, currency, sku, stock, is_active, images, tags, specs, avantages, variants, lien_produit, warning)
values
  -- 1. ALGIFUGE COLORÉ
  (
    $q$algifuge-colore$q$,
    $q$ALGIFUGE COLORÉ - Hydrofuge coloré toiture$q$,
    $q$Produit hydrofuge coloré pour toiture : imperméabilise et redonne la teinte d'origine. Protège les matériaux de l'humidité, du gel et du vieillissement, limite l'incrustation des salissures et retarde l'apparition des micro-organismes. Application en une seule couche, disponible en 3 coloris.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$ALGIMOUSS$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$algimouss$q$,$q$protection$q$,$q$hydrofuge$q$,$q$coloré$q$,$q$toiture$q$],
    array[
      $q$Type : hydrofuge coloré, application en une seule couche$q$,
      $q$Conditionnement : seau 15 L$q$,
      $q$Coloris : brun (RAL 8028), noir ardoise (RAL 7016), rouge tuile (RAL 3016)$q$,
      $q$Consommation : 1 litre = environ 10 m²$q$,
      $q$Conditions d'application : entre 6 °C et 30 °C$q$,
      $q$Après application : prévoir au moins 6 heures sans pluie$q$,
      $q$Norme : NF P84-404 (réf. DTU 42.1)$q$
    ],
    array[
      $q$Imperméabilise et redonne la teinte d'origine à la toiture$q$,
      $q$Limite l'incrustation des salissures$q$,
      $q$Application en une seule couche$q$,
      $q$Protège de l'humidité, du gel et du vieillissement$q$,
      $q$Retarde l'apparition des micro-organismes (lichens, algues, moisissures, champignons)$q$,
      $q$Protection longue durée et ravive la couleur de la toiture$q$,
      $q$Disponible en 3 couleurs : brun (RAL 8028), noir ardoise (RAL 7016), rouge tuile (RAL 3016)$q$
    ],
    array[
      $q$ALGIFUGE COLORÉ 15 L - Brun (RAL 8028)$q$,
      $q$ALGIFUGE COLORÉ 15 L - Noir ardoise (RAL 7016)$q$,
      $q$ALGIFUGE COLORÉ 15 L - Rouge tuile (RAL 3016)$q$
    ],
    $q$https://algimouss.com/$q$, $q$Ne jamais appliquer sur des matériaux non absorbants (verre, plastiques, peintures, métaux) qui n'ont pas à être imperméabilisés.$q$
  ),

  -- 2. ALGINET BOIS
  (
    $q$alginet-bois$q$,
    $q$ALGINET BOIS - Nettoyant bardage et terrasses bois$q$,
    $q$Nettoyant bois gélifié qui nettoie les salissures tenaces et redonne un aspect naturel au bois brut ou exotique. Efficace contre les noircissements et les verdissures, facile à appliquer, efficace en 30 minutes et sans chlore.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$ALGIMOUSS$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$algimouss$q$,$q$nettoyage$q$,$q$bois$q$,$q$terrasse$q$,$q$bardage$q$],
    array[
      $q$Type : nettoyant bois gélifié$q$,
      $q$Conditionnement : 1 L, 5 L$q$,
      $q$Consommation : 1 litre = environ 5 m²$q$,
      $q$Efficacité : en 30 minutes$q$,
      $q$Sans chlore : oui$q$
    ],
    array[
      $q$Nettoie les salissures tenaces et redonne un aspect naturel au bois brut ou exotique$q$,
      $q$Convient pour les bois intérieurs ou extérieurs$q$,
      $q$Efficace contre les noircissements et les verdissures$q$,
      $q$Formule gélifiée facile à appliquer$q$,
      $q$Efficace en 30 minutes$q$,
      $q$Respecte le support$q$,
      $q$Sans chlore$q$
    ],
    array[ $q$ALGINET BOIS 1 L$q$, $q$ALGINET BOIS 5 L$q$ ],
    $q$https://algimouss.com/$q$, null
  ),

  -- 3. ALGINET SOLAIRE
  (
    $q$alginet-solaire$q$,
    $q$ALGINET SOLAIRE - Nettoyant panneaux photovoltaïques$q$,
    $q$Nettoyant pour panneaux solaires (photovoltaïques et thermiques) et fenêtres de toit. Élimine toutes les salissures tenaces, optimise le rendement des panneaux, agit en 5 minutes sans rinçage et limite les traces grâce à ses propriétés déperlantes.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$ALGIMOUSS$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$algimouss$q$,$q$nettoyage$q$,$q$panneaux solaires$q$,$q$photovoltaïque$q$],
    array[
      $q$Type : nettoyant panneaux solaires$q$,
      $q$Conditionnement : 5 L$q$,
      $q$Consommation : 1 litre = environ 7 m²$q$,
      $q$Efficacité : agit en 5 minutes$q$,
      $q$Sans rinçage : oui$q$,
      $q$Sans chlore : oui$q$
    ],
    array[
      $q$Nettoie toutes les salissures tenaces (déjections d'oiseaux, poussières, lichens, mousses, feuilles, pollution industrielle)$q$,
      $q$Optimise le rendement des panneaux solaires$q$,
      $q$Action rapide et résultat optimal sans rinçage$q$,
      $q$Formule exclusive limitant les traces grâce à ses propriétés déperlantes$q$,
      $q$N'agresse pas les matériaux$q$,
      $q$Agit en 5 minutes$q$,
      $q$Sans chlore$q$
    ],
    array[ $q$ALGINET SOLAIRE 5 L$q$ ],
    $q$https://algimouss.com/$q$, null
  ),

  -- 4. ALGINET TOITURES
  (
    $q$alginet-toitures$q$,
    $q$ALGINET TOITURES - Nettoyant toitures$q$,
    $q$Nettoyant qui élimine les micro-organismes (algues, lichens), les salissures et les traces de pollution sur les toitures, et se montre efficace contre les graisses (sorties de VMC). Ne modifie pas l'aspect ni la structure des supports, sans chlore, ni soude caustique, ni acide. Conseillé en première application avant tout traitement.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$ALGIMOUSS$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$algimouss$q$,$q$nettoyage$q$,$q$toiture$q$],
    array[
      $q$Type : nettoyant toiture$q$,
      $q$Conditionnement : 5 L, 15 L$q$,
      $q$Consommation : 1 litre = environ 5 m²$q$,
      $q$Composition : sans chlore, ni soude caustique, ni acide$q$,
      $q$Conditions d'application : entre 5 °C et 25 °C$q$
    ],
    array[
      $q$Nettoie les micro-organismes (algues, lichens), les salissures et les traces de pollution sur les toitures$q$,
      $q$Efficace également contre les graisses (sorties de VMC)$q$,
      $q$Ne modifie pas l'aspect ni la structure des supports$q$,
      $q$N'agresse pas les matériaux$q$,
      $q$Ne contient ni chlore, ni soude caustique, ni acide$q$,
      $q$Conseillé en première application sur les supports encrassés avant tout traitement$q$,
      $q$Nouvelle formule améliorée pour un temps de contact plus long$q$
    ],
    array[ $q$ALGINET TOITURES 5 L$q$, $q$ALGINET TOITURES 15 L$q$ ],
    $q$https://algimouss.com/$q$, $q$Ne pas appliquer sur des bacs aciers et tous supports métalliques.$q$
  ),

  -- 5. ALGIPULVE lance télescopique 3,20 m
  (
    $q$algipulve-lance-320m$q$,
    $q$ALGIPULVE PRO III - Lance télescopique 3,20 m$q$,
    $q$Lance télescopique de pulvérisation en fibre de verre, utilisable avec tous les produits Algimouss. Cette canne évite les déplacements sur la toiture et limite l'utilisation d'une échelle. Compatible avec l'ALGIPULVE PRO III et munie d'un coupleur rapide, elle mesure 1,25 m une fois repliée.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$ALGIMOUSS$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$algimouss$q$,$q$équipement$q$,$q$lance télescopique$q$,$q$pulvérisation$q$],
    array[
      $q$Type : lance télescopique de pulvérisation$q$,
      $q$Longueur déployée : 3,20 m$q$,
      $q$Longueur repliée : 1,25 m$q$,
      $q$Matériau : fibre de verre$q$,
      $q$Compatibilité : ALGIPULVE PRO III, utilisable avec tous les produits$q$,
      $q$Raccord : coupleur rapide$q$
    ],
    array[
      $q$Utilisable avec tous les produits Algimouss$q$,
      $q$Évite les déplacements sur la toiture et limite l'utilisation d'échelle$q$,
      $q$Simple à mettre en œuvre$q$,
      $q$En fibre de verre, légère$q$,
      $q$Compatible avec l'ALGIPULVE PRO III$q$,
      $q$Munie d'un coupleur rapide$q$
    ],
    '{}'::text[],
    $q$https://algimouss.com/$q$, null
  ),

  -- 6. ALGIPULVE lance télescopique 5,40 m
  (
    $q$algipulve-lance-540m$q$,
    $q$ALGIPULVE PRO III - Lance télescopique 5,40 m$q$,
    $q$Lance télescopique de pulvérisation en fibre de verre, utilisable avec tous les produits Algimouss. Cette canne évite les déplacements sur la toiture et limite l'utilisation d'une échelle. Compatible avec l'ALGIPULVE PRO III et munie d'un coupleur rapide, elle mesure 1,25 m une fois repliée.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$ALGIMOUSS$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$algimouss$q$,$q$équipement$q$,$q$lance télescopique$q$,$q$pulvérisation$q$],
    array[
      $q$Type : lance télescopique de pulvérisation$q$,
      $q$Longueur déployée : 5,40 m$q$,
      $q$Longueur repliée : 1,25 m$q$,
      $q$Matériau : fibre de verre$q$,
      $q$Compatibilité : ALGIPULVE PRO III, utilisable avec tous les produits$q$,
      $q$Raccord : coupleur rapide$q$
    ],
    array[
      $q$Utilisable avec tous les produits Algimouss$q$,
      $q$Évite les déplacements sur la toiture et limite l'utilisation d'échelle$q$,
      $q$Simple à mettre en œuvre$q$,
      $q$En fibre de verre, légère$q$,
      $q$Compatible avec l'ALGIPULVE PRO III$q$,
      $q$Munie d'un coupleur rapide$q$
    ],
    '{}'::text[],
    $q$https://algimouss.com/$q$, null
  ),

  -- 7. ALGISPRAY (ALGIPULVE PRO III) - pulvérisateur électrique sur chariot
  (
    $q$algispray-pulverisateur$q$,
    $q$ALGISPRAY (ALGIPULVE PRO III) - Pulvérisateur électrique sur chariot$q$,
    $q$Pulvérisateur électrique sur chariot qui facilite le transport sur les terrains irréguliers. Conçu pour l'application des produits chimiques (anti-verdissures, hydrofuges, fixateurs, produits de nettoyage, huile de décoffrage, produits d'imprégnation bois). Puissant et léger, ses composants en polypropylène et Viton en font un allié robuste.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$ALGIMOUSS$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$algimouss$q$,$q$équipement$q$,$q$pulvérisateur$q$,$q$chariot$q$,$q$algispray$q$],
    array[
      $q$Pression : 15 bars$q$,
      $q$Débit max. : 12 L/min$q$,
      $q$Lance : polypropylène, longueur 80 cm$q$,
      $q$Portée du jet : jusqu'à 1,50 m (canne et buse incluses)$q$,
      $q$Tuyau : flexible 25 mètres$q$,
      $q$Poids : 23 kg$q$,
      $q$Version : acides, à pistons/membranes$q$,
      $q$Composants : membranes et joints en Viton, corps et culasse en polypropylène, pièces en contact avec le liquide en acier inox AISI 316$q$,
      $q$Accessoires sur demande : lance télescopique 5,50 m ou 6 m$q$
    ],
    array[
      $q$Chariot pour faciliter le transport sur terrains irréguliers$q$,
      $q$Application des produits chimiques : anti-verdissures, hydrofuges, fixateurs, produits de nettoyage, huile de décoffrage, produits d'imprégnation bois$q$,
      $q$Version acides à pistons/membranes$q$,
      $q$Puissant et léger pour des travaux plus confortables$q$,
      $q$Composants en polypropylène et Viton, robuste pour tous vos travaux$q$
    ],
    '{}'::text[],
    $q$https://algimouss.com/$q$, null
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

-- Verification - expect the 7 new rows among the ALGIMOUSS products
select slug, title,
       array_length(specs,1)     as n_specs,
       array_length(avantages,1) as n_avantages
from public.products
where brand = 'ALGIMOUSS'
order by slug;
