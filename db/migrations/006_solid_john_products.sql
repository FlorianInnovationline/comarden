-- ============================================================================
-- Comarden - Migration 006: Solid John products (3)
-- ----------------------------------------------------------------------------
-- Adds the Solid John range (brand = 'SOLID JOHN').
-- Source: solidjohn.com (descriptions/avantages) + Solid John documentation
--         (technical specs, already captured in the brand config specGroups).
-- Categories: betonplex -> toitures-plates (007); polymère -> colles-mastics (010);
--             vis rive de toit -> visserie (009).
-- price_cents 0 (lead/quote), EUR, stock 0, is_active true, images '[]'.
-- Idempotent: ON CONFLICT (slug) DO UPDATE (images preserved). Dollar-quoted.
-- No em dashes - plain hyphens only.
-- ============================================================================

begin;

insert into public.products
  (slug, title, description, category_id, brand, price_cents, currency, sku, stock, is_active, images, tags, specs, avantages, variants, lien_produit, warning)
values
  -- 1. Bétonplex (contreplaqué béton garanti résistant à l'humidité)
  (
    $q$betonplex-solid-john$q$,
    $q$Bétonplex Solid John - Contreplaqué béton garanti résistant à l'humidité$q$,
    $q$Le Bétonplex garanti Solid John est un contreplaqué en béton conçu pour durer en conditions humides. La base parfaite pour les constructions de toiture et le revêtement de façade : pontage des cavités sur toits plats, rive de toit, façade et crépi. Sélection rigoureuse des bois et encollage Classe 3 (WBP), avec une garantie 10 ans transparente.$q$,
    $q$11111111-1111-1111-1111-000000000007$q$, $q$SOLID JOHN$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$solid john$q$,$q$bétonplex$q$,$q$contreplaqué$q$,$q$toiture plate$q$,$q$rive de toit$q$,$q$humidité$q$],
    array[
      $q$Dimensions : 122 cm × 244 cm$q$,
      $q$Épaisseur : 15 mm ou 21 mm$q$,
      $q$Encollage : Classe 3 / WBP garanti (résiste à l'ébullition)$q$,
      $q$Norme : EN 636-3$q$,
      $q$Densité : 550-650 kg/m³$q$,
      $q$Réaction au feu : D-s2,d0$q$,
      $q$Garantie : 10 ans (gonflement, putréfaction, décollement)$q$
    ],
    array[
      $q$Garantie 10 ans contre gonflement, putréfaction et décollement$q$,
      $q$100% adapté aux conditions humides$q$,
      $q$Conforme aux normes européennes$q$,
      $q$Apprécié par les couvreurs$q$,
      $q$Bois issu de forêts gérées durablement$q$
    ],
    array[
      $q$Épaisseur 15 mm - 122 × 244 cm$q$,
      $q$Épaisseur 21 mm - 122 × 244 cm$q$
    ],
    $q$https://solidjohn.com/fr/betonplex-garantie/roof/$q$, null
  ),

  -- 2. Polymère hybride (colle d'étanchéité élastique)
  (
    $q$polymere-hybride-solid-john$q$,
    $q$Polymère hybride Solid John - Colle d'étanchéité élastique$q$,
    $q$Colle polymère hybride professionnelle pour l'encollage en conditions humides, dans les mêmes conditions que le bétonplex Solid John. Fixe très rapidement les panneaux de rive et forme un joint élastique amortissant les vibrations, tensions et rafales de vent.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$SOLID JOHN$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$solid john$q$,$q$colle$q$,$q$polymère hybride$q$,$q$ms polymère$q$,$q$étanchéité$q$,$q$humidité$q$],
    array[
      $q$Type : polymère MS hybride$q$,
      $q$Température d'application : -5 °C à +40 °C$q$,
      $q$Coloris : RAL 9005 (noir)$q$,
      $q$Conditionnement : cartouche 290 ml ou saucisse 600 ml$q$
    ],
    array[
      $q$Application sur maçonnerie creuse$q$,
      $q$Application sur surface humide$q$,
      $q$Installation rapide$q$,
      $q$Colle élastique et extensible$q$,
      $q$100% adapté aux conditions humides$q$,
      $q$Disponible en version manchon (saucisse) et cartouche$q$
    ],
    array[
      $q$Cartouche 290 ml - RAL 9005$q$,
      $q$Saucisse 600 ml - RAL 9005$q$
    ],
    $q$https://solidjohn.com/fr/polymere/$q$, null
  ),

  -- 3. Vis rive de toit (fixation rive toiture plate)
  (
    $q$vis-rive-de-toit-solid-john$q$,
    $q$Vis rive de toit Solid John - Fixation rive toiture plate$q$,
    $q$Vis conçue pour fixer solidement l'avant-toit (rive) de votre toiture plate au bétonplex Solid John. Tête plate pour préserver l'étanchéité de la toiture, adaptée aux rives en zinc et en aluminium ainsi qu'aux supports bois et acier.$q$,
    $q$11111111-1111-1111-1111-000000000009$q$, $q$SOLID JOHN$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$solid john$q$,$q$vis$q$,$q$rive de toit$q$,$q$visserie$q$,$q$toiture plate$q$,$q$inox$q$],
    array[
      $q$Matériau : acier galvanisé / inoxydable$q$,
      $q$Diamètre : Ø 4,2 mm$q$,
      $q$Tête : plate, empreinte PH12$q$,
      $q$Versions : 16 mm et 25 mm$q$,
      $q$Conditionnement : 500 pièces / boîte$q$
    ],
    array[
      $q$Tête plate - préserve l'étanchéité du toit$q$,
      $q$100% adapté aux conditions humides$q$,
      $q$Compatible rives en zinc et aluminium$q$,
      $q$Adaptée aux supports bois et acier$q$
    ],
    array[
      $q$Longueur 16 mm - 500 pièces/boîte$q$,
      $q$Longueur 25 mm - 500 pièces/boîte$q$
    ],
    $q$https://solidjohn.com/fr/vis-rive-de-toit/$q$, null
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

-- Verification - expect 3 SOLID JOHN rows
select slug, title, brand, category_id,
       array_length(specs,1) as n_specs,
       array_length(avantages,1) as n_avantages,
       array_length(variants,1) as n_variants
from public.products
where brand = 'SOLID JOHN'
order by slug;
