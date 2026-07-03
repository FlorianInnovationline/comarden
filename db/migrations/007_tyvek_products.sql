-- ============================================================================
-- Comarden - Migration 007: DuPont Tyvek products (2 new)
-- ----------------------------------------------------------------------------
-- Adds the first two of the Tyvek range (brand = 'TYVEK DUPONT'):
--   1. Tyvek Typrotec 2523B  -> écran de sous-toiture HPV   -> Toiture (001)
--   2. Tyvek UV Façade 2524B -> pare-pluie façade ventilée  -> Façade  (008)
-- Source: DuPont Tyvek flyer BE (fr, 2019) + Tyvek UV Façade datasheet (2015).
-- Custom rich pages live at /shop/produit/<slug> (TyvekProductPage component).
-- price_cents 0 (lead/quote), EUR, stock 0, is_active true, images '[]'.
-- Idempotent: ON CONFLICT (slug) DO UPDATE (images preserved). Dollar-quoted.
-- No em dashes - plain hyphens only.
-- ============================================================================

begin;

insert into public.products
  (slug, title, description, category_id, brand, price_cents, currency, sku, stock, is_active, images, tags, specs, avantages, variants, lien_produit, warning)
values
  -- 1. Tyvek Typrotec 2523B (écran de sous-toiture HPV)
  (
    $q$tyvek-typrotec-2523b$q$,
    $q$DuPont™ Tyvek® Typrotec 2523B - Écran de sous-toiture HPV$q$,
    $q$Écran de sous-toiture HPV (hautement perméable à la vapeur d'eau) de résistance supérieure. Étanche à l'eau et au vent, il se pose directement sur l'isolant thermique et assure une régulation optimale de l'humidité. Sa couche fonctionnelle est 6 à 8 fois plus épaisse que celle des écrans multicouches standard, pour une durabilité et une étanchéité prouvées dans le temps.$q$,
    $q$11111111-1111-1111-1111-000000000001$q$, $q$TYVEK DUPONT$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$tyvek$q$,$q$dupont$q$,$q$écran de sous-toiture$q$,$q$hpv$q$,$q$sous-toiture$q$,$q$membrane$q$,$q$typrotec$q$],
    array[
      $q$Référence : 2523B$q$,
      $q$Composition : Polyéthylène Haute Densité (PEHD) renforcé d'une couche de Polypropylène (PP)$q$,
      $q$Bande adhésive : avec ou sans bande adhésive intégrée$q$,
      $q$Dimensions : 1,50 m x 50 m$q$,
      $q$Masse par unité de surface : 165 g/m²$q$,
      $q$Épaisseur produit / couche fonctionnelle : 440 / 175 µm$q$,
      $q$Transmission de la vapeur d'eau (Sd) : 0,025 m$q$,
      $q$Poids du rouleau : 13 kg$q$,
      $q$Réaction au feu : E$q$,
      $q$Résistance aux intempéries : 4 mois$q$,
      $q$Conformité CE : EN 13859-1 et EN 13859-2$q$,
      $q$Agrément : ATG 2180$q$,
      $q$Garantie : 15 ans$q$
    ],
    array[
      $q$Couche fonctionnelle 6 à 8 fois plus épaisse que les écrans multicouches standard$q$,
      $q$Durabilité supérieure grâce à la technologie Flash Spun-bond$q$,
      $q$Étanchéité à l'eau prouvée : performant même après plus de 20 ans$q$,
      $q$Excellente résistance aux UV et à la chaleur (100 % PE stabilisé, jusqu'à 100 °C)$q$,
      $q$Régulation optimale de l'humidité, minimise le risque de condensation$q$,
      $q$Pose directe sur l'isolant thermique$q$,
      $q$Testé et certifié ATG (ATG 2180), garantie 15 ans$q$
    ],
    array[
      $q$Typrotec 2523B - 1,50 m x 50 m (sans bande adhésive)$q$,
      $q$Typrotec 2523B Tape - 1,50 m x 50 m (avec bande adhésive intégrée)$q$
    ],
    $q$https://www.dupontdenemours.be/content/dam/dupont/amer/us/en/performance-building-solutions/public/documents/fr/Tyvek_Pocket_flyer_BE_fr_september_2019.pdf$q$, null
  ),

  -- 2. Tyvek UV Façade 2524B (pare-pluie façade ventilée)
  (
    $q$tyvek-uv-facade-2524b$q$,
    $q$DuPont™ Tyvek® UV Façade 2524B - Pare-pluie façades ventilées$q$,
    $q$Pare-pluie haute performance pour façades à claire-voie et façades ventilées. Première membrane HPV certifiée CE pour une utilisation en façade à joints ouverts, avec une très haute résistance aux UV. Assure la pérennité de la structure et l'efficacité de l'isolation dans le temps, pour une ouverture entre lames de bardage jusqu'à 3 cm.$q$,
    $q$11111111-1111-1111-1111-000000000008$q$, $q$TYVEK DUPONT$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$tyvek$q$,$q$dupont$q$,$q$uv façade$q$,$q$pare-pluie$q$,$q$façade ventilée$q$,$q$claire-voie$q$,$q$bardage$q$,$q$membrane$q$],
    array[
      $q$Référence : 2524B$q$,
      $q$Norme : EN 13859-2 (façades avec joints ouverts)$q$,
      $q$Matériau : PE-HD et PP$q$,
      $q$Dimensions : 1,50 m x 50 m (15 kg) ou 3,00 m x 50 m (30 kg)$q$,
      $q$Masse par unité de surface : 195 g/m²$q$,
      $q$Épaisseur produit / couche fonctionnelle : 600 / 220 µm$q$,
      $q$Rectitude : inférieure à 30 mm$q$,
      $q$Réaction au feu : E$q$,
      $q$Étanchéité à l'eau : classe W1$q$,
      $q$Colonne d'eau (EN 20811) : 3 m$q$,
      $q$Force de traction MD / XD : 410 / 340 N par 50 mm$q$,
      $q$Allongement MD / XD : 14 % / 19 %$q$,
      $q$Résistance à la déchirure MD / XD : 300 / 340 N$q$,
      $q$Transmission de la vapeur d'eau (Sd) : 0,035 m$q$,
      $q$Résistance à la pénétration de l'air : inférieure à 0,1 m³/(m².h) à 50 Pa$q$,
      $q$Stabilité dimensionnelle : inférieure à 1 %$q$,
      $q$Flexibilité à basse température : -40 °C$q$,
      $q$Résistance à la température : -40 °C à +80 °C$q$,
      $q$Espace max. entre lames de bardage : 3 cm (largeur des lames B au moins égale à 2A)$q$,
      $q$Résistance aux intempéries (pare-pluie / écran) : 6 mois$q$,
      $q$Résistance aux intempéries (façade à claire-voie) : 4 mois$q$,
      $q$Vieillissement UV 5000 h - traction MD/XD : 85 % conservés$q$,
      $q$Vieillissement UV 5000 h - allongement MD/XD : 70 % conservés$q$,
      $q$Écran contre le vent : oui$q$
    ],
    array[
      $q$Très haute résistance aux UV : première membrane HPV certifiée CE pour façades à claire-voie$q$,
      $q$Non-tissé solide et de grande qualité (fibres PE-HD, couche de non-tissé PP résistant aux UV)$q$,
      $q$Convient à une ouverture entre lames de bardage jusqu'à 3 cm$q$,
      $q$Imperméable au vent et à l'eau, perméable à la vapeur d'eau$q$,
      $q$Convient aux bardages en bois, métal, pierre ou autres matériaux$q$,
      $q$Léger, souple et facile à installer$q$,
      $q$Résistance aux intempéries 4 mois pendant l'installation$q$,
      $q$Propriétés mécaniques maintenues après 5 000 h d'exposition UV$q$
    ],
    array[
      $q$Tyvek UV Façade - 1,50 m x 50 m (15 kg)$q$,
      $q$Tyvek UV Façade - 3,00 m x 50 m (30 kg)$q$
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

-- Verification - expect the 2 new rows (plus the 2 existing mastic/flexwrap = 4 total TYVEK DUPONT)
select slug, title, category_id,
       array_length(specs,1)     as n_specs,
       array_length(avantages,1) as n_avantages,
       array_length(variants,1)  as n_variants
from public.products
where brand = 'TYVEK DUPONT'
order by slug;
