-- ============================================================================
-- Comarden - Migration 008: DuPont Tyvek products (3 more)
-- ----------------------------------------------------------------------------
-- Adds the next three of the Tyvek range (brand = 'TYVEK DUPONT'):
--   3. AirGuard Sd23 8207A     -> pare-vapeur              -> Isolation (004)
--   4. Tyvek Tape Plus 2062B   -> accessoire (bande)       -> Colles & Mastics (010)
--   5. Tyvek FlexWrap EZ 2064FW-> accessoire (solin)       -> Colles & Mastics (010)
-- Source: DuPont AirGuard Sd23 datasheet (EN 13984, 2021) + Tyvek Tape Plus &
--         FlexWrap EZ datasheets. Custom rich pages at /shop/produit/<slug>.
-- price_cents 0 (lead/quote), EUR, stock 0, is_active true, images '[]'.
-- Idempotent: ON CONFLICT (slug) DO UPDATE (images preserved). Dollar-quoted.
-- No em dashes - plain hyphens only.
-- ============================================================================

begin;

insert into public.products
  (slug, title, description, category_id, brand, price_cents, currency, sku, stock, is_active, images, tags, specs, avantages, variants, lien_produit, warning)
values
  -- 3. AirGuard Sd23 8207A (pare-vapeur)
  (
    $q$airguard-sd23-8207a$q$,
    $q$DuPont™ AirGuard® Sd23 8207A - Pare-vapeur translucide$q$,
    $q$Pare-vapeur (frein-vapeur) translucide et hautement résistant, étanche à l'eau et à l'air. Sa translucidité offre une parfaite visibilité de l'installation de l'isolant. Idéal sous l'isolant en PUR/PIR en pose sarking suivant les recommandations de la NIT 251. Réduit le risque de condensation et élimine les pertes de chaleur par convection. Garantie 25 ans.$q$,
    $q$11111111-1111-1111-1111-000000000004$q$, $q$TYVEK DUPONT$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$tyvek$q$,$q$dupont$q$,$q$airguard$q$,$q$pare-vapeur$q$,$q$frein-vapeur$q$,$q$sarking$q$,$q$membrane$q$,$q$étanchéité à l'air$q$],
    array[
      $q$Référence (style) : 8207A$q$,
      $q$Type de matière : DuPont™ Typar® (non-tissé PP) avec une couche de composé PP-PE$q$,
      $q$Norme : EN 13984 : 2013 (pare-vapeur)$q$,
      $q$Dimensions : 1,50 m x 50 m ou 2,80 m x 50 m$q$,
      $q$Transmission de la vapeur d'eau (Sd) : 23 m (EN 1931 : nominal 29 m, plage 18 à 45 m)$q$,
      $q$Facteur de résistance à l'humidité (g) : 1,5 x 10-8 kg/(m².s) (EN 1931)$q$,
      $q$Masse par unité de surface : 102 g/m² (EN 1849-2)$q$,
      $q$Épaisseur : 0,32 mm (EN 1849-2)$q$,
      $q$Étanchéité à l'eau : réussi, classe A (EN 1928)$q$,
      $q$Étanchéité à l'air (Gurley) : supérieure à 2000 s (ISO 5636/5)$q$,
      $q$Réaction au feu : classe E-d2 (EN ISO 11925-2)$q$,
      $q$Force de traction MD / XD : 230 / 210 N par 50 mm (EN 12311-2)$q$,
      $q$Allongement MD / XD : 42 % / 43 % (EN 12311-2)$q$,
      $q$Résistance à la déchirure MD / XD : 210 / 210 N (EN 12310-1)$q$,
      $q$Résistance au cisaillement des joints : au moins 150 N/5 cm (EN 12317-2)$q$,
      $q$Résistance à la température : -40 °C à +80 °C$q$,
      $q$Résistance aux intempéries : 4 semaines$q$,
      $q$Rectitude : au maximum 75 mm/10 m (EN 1848-2)$q$,
      $q$Marquage CE : oui (depuis le 03/08/2010)$q$,
      $q$Garantie : 25 ans$q$
    ],
    array[
      $q$Risque de condensation dans l'isolation réduit$q$,
      $q$Élimine les pertes de chaleur par convection$q$,
      $q$Translucide : parfaite visibilité de l'installation de l'isolant$q$,
      $q$Léger et facile à installer$q$,
      $q$Hautes résistances mécaniques, résistant 4 semaines aux rayons UV$q$,
      $q$Idéal sous isolant PUR/PIR en pose sarking (NIT 251)$q$,
      $q$Pare-vapeur durable, garantie 25 ans$q$
    ],
    array[
      $q$AirGuard Sd23 - 1,50 m x 50 m$q$,
      $q$AirGuard Sd23 - 2,80 m x 50 m$q$
    ],
    $q$https://www.tyvek.fr$q$, null
  ),

  -- 4. Tyvek Tape Plus 2062B (accessoire - bande adhésive acrylique)
  (
    $q$tyvek-tape-plus-2062b$q$,
    $q$DuPont™ Tyvek® Tape Plus 2062B - Bande adhésive acrylique$q$,
    $q$Bande adhésive simple face (HD-PE) dotée d'un adhésif acrylique modifié. Permet de coller, même en conditions d'installation extrêmes (température basse et humidité élevée), hermétiquement les membranes, de rendre étanche le pourtour des zones de pénétration et de réparer les dommages sur tous les écrans de sous-toiture et pare-vapeur de la gamme.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$TYVEK DUPONT$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$tyvek$q$,$q$dupont$q$,$q$bande adhésive$q$,$q$tape$q$,$q$sous-toiture$q$,$q$pare-vapeur$q$,$q$accessoire$q$],
    array[
      $q$Code produit : 2062B$q$,
      $q$Couleur : blanc$q$,
      $q$Largeur : 60 mm$q$,
      $q$Épaisseur : 400 µm$q$,
      $q$Masse par unité de surface : 300 g/m²$q$,
      $q$Adhésif : acrylique modifié, simple face (HD-PE)$q$,
      $q$Résistance à la température : -40 °C à 80 °C$q$,
      $q$Force de traction : supérieure à 260 N/5 cm$q$,
      $q$Allongement : 12 %$q$,
      $q$Adhésion par pelage : supérieure à 25 N/25 mm$q$,
      $q$Température d'application : au moins -5 °C$q$
    ],
    array[
      $q$Prise initiale immédiate, excellente adhérence au Tyvek® et aux plastiques$q$,
      $q$Colle même en conditions extrêmes (température basse, humidité élevée)$q$,
      $q$Rend étanche le pourtour des zones de pénétration$q$,
      $q$Répare les dommages sur les écrans de sous-toiture et pare-vapeur$q$,
      $q$Excellente résistance au vieillissement, à l'eau, l'humidité et aux produits chimiques$q$,
      $q$Application dès -5 °C sur surface sèche et propre$q$
    ],
    array[
      $q$Tyvek Tape Plus 2062B - largeur 60 mm$q$
    ],
    $q$https://www.tyvek.fr$q$, null
  ),

  -- 5. Tyvek FlexWrap EZ 2064FW (accessoire - solin extensible)
  (
    $q$tyvek-flexwrap-ez-2064fw$q$,
    $q$DuPont™ Tyvek® FlexWrap EZ 2064FW - Bande adhésive extensible$q$,
    $q$Adhésif haute performance souple et extensible, composé d'une couche de Tyvek® plissé laminée sur une bande adhésive butyle. Crée une étanchéité continue à l'air, au vent et à l'eau autour des zones de pénétration de toutes formes : jonctions de fenêtres, conduits, trous d'aération, câbles, coins. À utiliser en façade, revêtement de toit ou à l'intérieur.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$TYVEK DUPONT$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$tyvek$q$,$q$dupont$q$,$q$flexwrap$q$,$q$solin$q$,$q$bande adhésive$q$,$q$butyle$q$,$q$étanchéité$q$,$q$accessoire$q$],
    array[
      $q$Nom du style : 2064FW$q$,
      $q$Couleur : blanc (adhésif noir butyle)$q$,
      $q$Composition : couche de Tyvek® plissé laminée sur adhésif butyle$q$,
      $q$Écart de température : -30 °C à +80 °C (temporairement 100 °C)$q$,
      $q$Élongation : environ 130 % (2,3 x la longueur d'origine)$q$,
      $q$Température d'installation : supérieure à 0 °C$q$,
      $q$Résistance aux UV : 4 mois$q$,
      $q$Surface couverte : 0,6 m²$q$,
      $q$Rouleaux par boîte : 3$q$
    ],
    array[
      $q$Extrême extensibilité (environ 130 %) pour épouser les formes complexes$q$,
      $q$Adhésif puissant en butyle, sans asphalte ni bitume (évite coulures et taches)$q$,
      $q$Étanchéité continue à l'air, au vent et à l'eau autour des pénétrations$q$,
      $q$Pose environ 50 % plus rapide que les rubans standards$q$,
      $q$Excellente adhérence aux membranes Tyvek®, AirGuard® et à une large gamme de matériaux$q$,
      $q$Idéal menuiseries, pénétrations de toiture/mur et formes spéciales$q$
    ],
    array[
      $q$Tyvek FlexWrap EZ 2064FW - 3 rouleaux/boîte (0,6 m²)$q$
    ],
    $q$https://www.tyvek.fr$q$, null
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

-- Verification - expect 5 TYVEK DUPONT rows total after migrations 007 + 008
-- (Typrotec, UV Façade, AirGuard Sd23, Tape Plus, FlexWrap EZ) + the 2 seed ones
select slug, title, category_id,
       array_length(specs,1)     as n_specs,
       array_length(avantages,1) as n_avantages
from public.products
where brand = 'TYVEK DUPONT'
order by slug;
