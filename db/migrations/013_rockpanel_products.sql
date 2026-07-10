-- ============================================================================
-- Comarden - Migration 013: ROCKPANEL products (9)
-- ----------------------------------------------------------------------------
-- NOTE: the brief asked for "006_rockpanel_products.sql" but 006 is already
-- taken (Solid John). Next free number: 013.
--
-- Adds the ROCKPANEL range (brand = 'ROCKPANEL'):
--   1. ROCKPANEL Standard 8 mm            RP-STD-8      -> facade (008)
--   2. Clous INOX 27 mm (boîte 200)       RP-CLOUS-27   -> visserie (009)
--   3. ROCKPANEL Natural 10 mm            RP-NAT-10     -> facade (008)
--   4. ROCKPANEL Uni 6 mm                 RP-UNI-6      -> facade (008)
--   5. Peinture chants & retouches 500 ml RP-PAINT-500  -> colles-mastics (010)
--   6. Vis INOX 35 mm (boîte 200)         RP-VIS-35     -> visserie (009)
--   7. ROCKPANEL Chameleon 8 mm           RP-CHAM-8     -> facade (008)
--   8. ROCKPANEL Lines2 S                 RP-LIN2S      -> facade (008)
--   9. ROCKPANEL Woods 8 mm (sur commande) RP-WOODS-8   -> facade (008)
--
-- Descriptions transcribed verbatim from the client PPTX (ROCKPANEL.pptx,
-- slides 3-11). Titles/variants/warning use plain hyphens (site rule: no em
-- dashes anywhere) - the brief's long dashes were converted to hyphens.
-- price_cents 0 (lead/quote), EUR, stock 0, is_active true, images '[]'.
-- Idempotent: ON CONFLICT (slug) DO UPDATE (images preserved). Dollar-quoted.
-- ============================================================================

begin;

insert into public.products
  (slug, title, description, category_id, brand, price_cents, currency, sku, stock, is_active, images, tags, specs, avantages, variants, lien_produit, warning)
values
  -- 1. ROCKPANEL Standard 8 mm
  (
    $q$rockpanel-standard-8mm$q$,
    $q$ROCKPANEL® Standard 8 mm - Panneau de façade haute performance$q$,
    $q$Le ROCKPANEL® Standard 8 mm (3050 x 1200 mm) est un panneau de façade en laine de roche compressée, conçu pour les projets de bardage ventilé résidentiels, tertiaires et industriels. Léger, durable, résistant aux intempéries et facile à mettre en œuvre, il offre une excellente stabilité et un entretien minimal. Comarden tient en stock les couleurs les plus demandées : RAL 7004, RAL 7016, RAL 7021, RAL 7039, RAL 9005 et RAL 9010, pour une livraison rapide en Wallonie, Bruxelles et Luxembourg.$q$,
    $q$11111111-1111-1111-1111-000000000008$q$, $q$ROCKPANEL$q$, 0, $q$EUR$q$, $q$RP-STD-8$q$, 0, true, '[]'::jsonb,
    array[$q$rockpanel$q$,$q$bardage ventilé$q$,$q$panneau façade$q$,$q$roche volcanique$q$,$q$laine de roche$q$],
    array[
      $q$Dimensions : 3050 x 1200 mm$q$,
      $q$Épaisseur : 8 mm$q$,
      $q$Matériau : laine de roche compressée (roche volcanique)$q$,
      $q$Application : bardage ventilé résidentiel, tertiaire et industriel$q$,
      $q$Résistance : intempéries, UV, humidité$q$,
      $q$Entretien : minimal$q$
    ],
    array[
      $q$Léger et facile à mettre en œuvre$q$,
      $q$Excellente stabilité dimensionnelle$q$,
      $q$Durable et résistant aux intempéries$q$,
      $q$Entretien minimal$q$,
      $q$Fabriqué à base de roche volcanique$q$,
      $q$Livraison rapide en Wallonie, Bruxelles et Luxembourg (stock Bertrix et Naninne)$q$
    ],
    array[
      $q$RAL 7004 - Gris signalisation$q$,
      $q$RAL 7016 - Gris anthracite$q$,
      $q$RAL 7021 - Gris noir$q$,
      $q$RAL 7039 - Gris quartz$q$,
      $q$RAL 9005 - Noir foncé$q$,
      $q$RAL 9010 - Blanc pur$q$
    ],
    $q$https://www.rockpanel.be/fr/$q$, null
  ),

  -- 2. Clous INOX 27 mm
  (
    $q$clous-inox-27mm-rockpanel$q$,
    $q$Clous INOX 27 mm pour ROCKPANEL® - Boîte de 200 pièces$q$,
    $q$Les clous INOX 27 mm pour panneaux ROCKPANEL® sont spécialement conçus pour la fixation des bardages ROCKPANEL® sur ossature bois. Fabriqués en acier inoxydable, ils offrent une excellente résistance à la corrosion et garantissent une fixation durable, fiable et esthétique, même en extérieur. Conditionnés en boîte de 200 pièces, ils sont parfaitement adaptés aux projets de bardage ventilé, de rénovation et de construction neuve.$q$,
    $q$11111111-1111-1111-1111-000000000009$q$, $q$ROCKPANEL$q$, 0, $q$EUR$q$, $q$RP-CLOUS-27$q$, 0, true, '[]'::jsonb,
    array[$q$clous inox$q$,$q$fixation rockpanel$q$,$q$bardage ventilé$q$,$q$ossature bois$q$],
    array[
      $q$Longueur : 27 mm$q$,
      $q$Matériau : acier inoxydable$q$,
      $q$Application : fixation ROCKPANEL® sur ossature bois$q$,
      $q$Conditionnement : boîte de 200 pièces$q$
    ],
    array[
      $q$Excellente résistance à la corrosion$q$,
      $q$Fixation durable, fiable et esthétique$q$,
      $q$Adaptés bardage ventilé, rénovation et construction neuve$q$,
      $q$En stock à Bertrix et Naninne$q$
    ],
    '{}'::text[],
    $q$https://www.rockpanel.be/fr/$q$, null
  ),

  -- 3. ROCKPANEL Natural 10 mm
  (
    $q$rockpanel-natural-10mm$q$,
    $q$ROCKPANEL® Natural 10 mm - Aspect pierre naturelle$q$,
    $q$Les panneaux ROCKPANEL® Natural 10 mm offrent un aspect authentique inspiré de la pierre naturelle. Fabriqués à partir de roche volcanique, ils évoluent naturellement sous l'effet des UV et des intempéries, développant au fil du temps une patine unique qui renforce leur caractère architectural. Idéals pour les façades ventilées, les habillages extérieurs et les projets de construction neuve ou de rénovation, les panneaux ROCKPANEL® Natural allient durabilité, stabilité dimensionnelle, facilité de mise en œuvre et faible entretien.$q$,
    $q$11111111-1111-1111-1111-000000000008$q$, $q$ROCKPANEL$q$, 0, $q$EUR$q$, $q$RP-NAT-10$q$, 0, true, '[]'::jsonb,
    array[$q$rockpanel natural$q$,$q$aspect pierre$q$,$q$façade ventilée$q$,$q$roche volcanique$q$,$q$patine naturelle$q$],
    array[
      $q$Épaisseur : 10 mm$q$,
      $q$Matériau : roche volcanique$q$,
      $q$Aspect : pierre naturelle, patine évolutive sous UV et intempéries$q$,
      $q$Application : façades ventilées, habillages extérieurs, neuf et rénovation$q$
    ],
    array[
      $q$Aspect authentique inspiré de la pierre naturelle$q$,
      $q$Développe une patine unique au fil du temps$q$,
      $q$Stabilité dimensionnelle et durabilité$q$,
      $q$Faible entretien$q$,
      $q$Léger et facile à mettre en œuvre$q$
    ],
    array[
      $q$2500 x 1200 mm$q$,
      $q$3050 x 1200 mm$q$
    ],
    $q$https://www.rockpanel.be/fr/$q$, null
  ),

  -- 4. ROCKPANEL Uni 6 mm
  (
    $q$rockpanel-uni-6mm$q$,
    $q$ROCKPANEL® Uni 6 mm - Panneau de façade bardage ventilé$q$,
    $q$Les panneaux ROCKPANEL® Uni 6 mm sont une solution fiable, économique et durable pour les projets de bardage ventilé. Fabriqués à partir de roche volcanique, ils offrent une excellente résistance aux intempéries, aux UV et à l'humidité, tout en étant légers et faciles à mettre en œuvre. Parfaits pour les façades résidentielles, tertiaires et industrielles, les panneaux ROCKPANEL® Uni assurent une finition sobre et moderne avec un entretien minimal.$q$,
    $q$11111111-1111-1111-1111-000000000008$q$, $q$ROCKPANEL$q$, 0, $q$EUR$q$, $q$RP-UNI-6$q$, 0, true, '[]'::jsonb,
    array[$q$rockpanel uni$q$,$q$bardage ventilé$q$,$q$panneau façade économique$q$,$q$roche volcanique$q$],
    array[
      $q$Épaisseur : 6 mm$q$,
      $q$Matériau : roche volcanique$q$,
      $q$Application : façades résidentielles, tertiaires et industrielles$q$,
      $q$Résistance : intempéries, UV, humidité$q$,
      $q$Entretien : minimal$q$
    ],
    array[
      $q$Solution fiable et économique$q$,
      $q$Finition sobre et moderne$q$,
      $q$Léger et facile à poser$q$,
      $q$Excellent rapport qualité/prix$q$,
      $q$Durabilité longue durée$q$
    ],
    array[
      $q$2500 x 1200 mm - RAL 7004 Gris signalisation$q$,
      $q$2500 x 1200 mm - RAL 7016 Gris anthracite$q$,
      $q$2500 x 1200 mm - RAL 7021 Gris noir$q$,
      $q$2500 x 1200 mm - RAL 7039 Gris quartz$q$,
      $q$2500 x 1200 mm - RAL 9005 Noir foncé$q$,
      $q$2500 x 1200 mm - RAL 9010 Blanc pur$q$,
      $q$3050 x 1200 mm - RAL 7004 Gris signalisation$q$,
      $q$3050 x 1200 mm - RAL 7016 Gris anthracite$q$,
      $q$3050 x 1200 mm - RAL 7021 Gris noir$q$,
      $q$3050 x 1200 mm - RAL 7039 Gris quartz$q$,
      $q$3050 x 1200 mm - RAL 9005 Noir foncé$q$,
      $q$3050 x 1200 mm - RAL 9010 Blanc pur$q$
    ],
    $q$https://www.rockpanel.be/fr/$q$, null
  ),

  -- 5. Peinture chants & retouches 500 ml
  (
    $q$peinture-chants-retouches-rockpanel$q$,
    $q$Peinture Chants & Retouches ROCKPANEL® - 500 ml$q$,
    $q$La peinture pour chants et retouches ROCKPANEL® est spécialement conçue pour protéger et harmoniser les découpes, chants et éventuelles retouches des panneaux de façade ROCKPANEL®. Elle garantit une finition soignée, homogène et durable, tout en préservant l'esthétique du bardage. Facile à appliquer, elle est indispensable lors de la pose des panneaux afin d'obtenir un résultat professionnel en construction neuve comme en rénovation.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$ROCKPANEL$q$, 0, $q$EUR$q$, $q$RP-PAINT-500$q$, 0, true, '[]'::jsonb,
    array[$q$peinture rockpanel$q$,$q$retouches façade$q$,$q$finition chants$q$,$q$accessoire rockpanel$q$],
    array[
      $q$Contenance : 500 ml$q$,
      $q$Application : chants, découpes et retouches de panneaux ROCKPANEL®$q$,
      $q$Utilisation : construction neuve et rénovation$q$
    ],
    array[
      $q$Finition soignée, homogène et durable$q$,
      $q$Préserve l'esthétique du bardage$q$,
      $q$Application facile$q$,
      $q$Indispensable lors de la pose des panneaux$q$
    ],
    array[
      $q$RAL 7004 - Gris signalisation$q$,
      $q$RAL 7016 - Gris anthracite$q$,
      $q$RAL 7021 - Gris noir$q$,
      $q$RAL 7039 - Gris quartz$q$,
      $q$RAL 9005 - Noir foncé$q$,
      $q$RAL 9010 - Blanc pur$q$
    ],
    $q$https://www.rockpanel.be/fr/$q$, null
  ),

  -- 6. Vis INOX 35 mm
  (
    $q$vis-inox-35mm-rockpanel$q$,
    $q$Vis INOX 35 mm pour ROCKPANEL® - Boîte de 200 pièces$q$,
    $q$Les vis INOX 35 mm pour panneaux ROCKPANEL® sont spécialement conçues pour la fixation des panneaux de façade ROCKPANEL® sur ossature métallique. Fabriquées en acier inoxydable, elles garantissent une excellente résistance à la corrosion, une fixation durable et une finition esthétique. Disponibles dans les teintes assorties aux gammes ROCKPANEL® (RAL 7004, RAL 7016, RAL 7021, RAL 7039, RAL 9005, RAL 9010, Metallics, Natural, Stones et Woods), elles permettent une intégration discrète et un rendu professionnel sur tous vos projets de bardage ventilé. Conditionnées en boîte de 200 pièces, elles conviennent aussi bien aux projets de construction neuve qu'aux rénovations.$q$,
    $q$11111111-1111-1111-1111-000000000009$q$, $q$ROCKPANEL$q$, 0, $q$EUR$q$, $q$RP-VIS-35$q$, 0, true, '[]'::jsonb,
    array[$q$vis inox$q$,$q$fixation rockpanel$q$,$q$bardage ventilé$q$,$q$ossature métallique$q$,$q$vis teintées$q$],
    array[
      $q$Longueur : 35 mm$q$,
      $q$Matériau : acier inoxydable$q$,
      $q$Application : fixation ROCKPANEL® sur ossature métallique$q$,
      $q$Conditionnement : boîte de 200 pièces$q$,
      $q$Teintes assorties aux gammes ROCKPANEL®$q$
    ],
    array[
      $q$Excellente résistance à la corrosion$q$,
      $q$Intégration discrète (teintes assorties)$q$,
      $q$Rendu professionnel$q$,
      $q$Adaptées neuf et rénovation$q$,
      $q$En stock à Bertrix et Naninne$q$
    ],
    array[
      $q$RAL 7004 - Gris signalisation$q$,
      $q$RAL 7016 - Gris anthracite$q$,
      $q$RAL 7021 - Gris noir$q$,
      $q$RAL 7039 - Gris quartz$q$,
      $q$RAL 9005 - Noir foncé$q$,
      $q$RAL 9010 - Blanc pur$q$,
      $q$Assorties gamme Metallics$q$,
      $q$Assorties gamme Natural$q$,
      $q$Assorties gamme Stones$q$,
      $q$Assorties gamme Woods$q$
    ],
    $q$https://www.rockpanel.be/fr/$q$, null
  ),

  -- 7. ROCKPANEL Chameleon 8 mm
  (
    $q$rockpanel-chameleon-8mm$q$,
    $q$ROCKPANEL® Chameleon 8 mm - Façade à effet irisé$q$,
    $q$Les panneaux ROCKPANEL® Chameleon 8 mm offrent un rendu architectural unique grâce à leur finition à effet irisé. Selon l'angle de vue, la lumière et la position de l'observateur, la façade change subtilement de couleur, créant un effet visuel dynamique et contemporain. Fabriqués à partir de roche volcanique, les panneaux ROCKPANEL® Chameleon sont légers, résistants aux intempéries, aux UV et faciles à mettre en œuvre. Ils sont parfaitement adaptés aux façades ventilées, aux bâtiments contemporains, aux projets haut de gamme et aux réalisations architecturales exigeantes.$q$,
    $q$11111111-1111-1111-1111-000000000008$q$, $q$ROCKPANEL$q$, 0, $q$EUR$q$, $q$RP-CHAM-8$q$, 0, true, '[]'::jsonb,
    array[$q$rockpanel chameleon$q$,$q$effet irisé$q$,$q$façade contemporaine$q$,$q$roche volcanique$q$,$q$haut de gamme$q$],
    array[
      $q$Dimensions : 3050 x 1200 mm$q$,
      $q$Épaisseur : 8 mm$q$,
      $q$Matériau : roche volcanique$q$,
      $q$Finition : effet irisé (couleur change selon angle et lumière)$q$,
      $q$Application : façades ventilées, projets architecturaux haut de gamme$q$
    ],
    array[
      $q$Rendu architectural unique et dynamique$q$,
      $q$Effet visuel changeant selon la lumière$q$,
      $q$Résistance intempéries, UV et humidité$q$,
      $q$Léger et facile à mettre en œuvre$q$,
      $q$Adapté aux réalisations exigeantes$q$
    ],
    '{}'::text[],
    $q$https://www.rockpanel.be/fr/$q$, null
  ),

  -- 8. ROCKPANEL Lines2 S
  (
    $q$rockpanel-lines-2-s$q$,
    $q$ROCKPANEL® Lines² S - Bardage à lames rainurées$q$,
    $q$Les ROCKPANEL® Lines² S apportent l'esthétique chaleureuse d'un bardage à lames avec les performances d'un panneau de façade moderne. Grâce à leur profil rainuré, ils créent un effet de lames élégant et contemporain, idéal pour les façades résidentielles, les extensions, les bâtiments tertiaires et les rénovations. Fabriqués à partir de roche volcanique, les panneaux ROCKPANEL® Lines² S sont légers, résistants aux intempéries, aux UV et nécessitent très peu d'entretien. Ils constituent une solution durable pour les façades ventilées.$q$,
    $q$11111111-1111-1111-1111-000000000008$q$, $q$ROCKPANEL$q$, 0, $q$EUR$q$, $q$RP-LIN2S$q$, 0, true, '[]'::jsonb,
    array[$q$rockpanel lines$q$,$q$bardage à lames$q$,$q$profil rainuré$q$,$q$façade contemporaine$q$],
    array[
      $q$Dimensions : 3050 x 164 mm$q$,
      $q$Largeur utile : 146 mm$q$,
      $q$Matériau : roche volcanique$q$,
      $q$Profil : lames rainurées$q$,
      $q$Application : façades résidentielles, extensions, tertiaire, rénovation$q$
    ],
    array[
      $q$Effet de lames élégant et contemporain$q$,
      $q$Solution durable pour façades ventilées$q$,
      $q$Résistance intempéries et UV$q$,
      $q$Très peu d'entretien$q$,
      $q$Légèreté d'un panneau ROCKPANEL®$q$
    ],
    array[
      $q$Primer (à peindre)$q$,
      $q$RAL 7004 - Gris signalisation$q$,
      $q$RAL 7016 - Gris anthracite$q$,
      $q$RAL 7021 - Gris noir$q$,
      $q$RAL 7039 - Gris quartz$q$,
      $q$RAL 9005 - Noir foncé$q$,
      $q$RAL 9010 - Blanc pur$q$
    ],
    $q$https://www.rockpanel.be/fr/$q$, null
  ),

  -- 9. ROCKPANEL Woods 8 mm (sur commande)
  (
    $q$rockpanel-woods-8mm$q$,
    $q$ROCKPANEL® Woods 8 mm - Aspect bois naturel (sur commande)$q$,
    $q$Les panneaux ROCKPANEL® Woods reproduisent fidèlement l'apparence et le charme du bois naturel tout en offrant les performances d'un panneau de façade moderne. Ils permettent de créer des façades chaleureuses et élégantes, sans les contraintes d'entretien, de traitement ou de vieillissement du bois traditionnel. Fabriqués à partir de roche volcanique, les panneaux ROCKPANEL® Woods 8 mm ne pourrissent pas, résistent aux intempéries, aux UV et à l'humidité, tout en nécessitant très peu d'entretien. Idéals pour les façades ventilées, les maisons contemporaines, les bâtiments publics et les projets de rénovation, ils allient la chaleur du bois à la durabilité de la pierre. Disponibles dans une large sélection de décors bois réalistes.$q$,
    $q$11111111-1111-1111-1111-000000000008$q$, $q$ROCKPANEL$q$, 0, $q$EUR$q$, $q$RP-WOODS-8$q$, 0, true, '[]'::jsonb,
    array[$q$rockpanel woods$q$,$q$aspect bois$q$,$q$décor bois$q$,$q$roche volcanique$q$,$q$sur commande$q$],
    array[
      $q$Épaisseur : 8 mm$q$,
      $q$Matériau : roche volcanique$q$,
      $q$Aspect : décors bois réalistes (large sélection)$q$,
      $q$Application : façades ventilées, extensions, rénovation$q$,
      $q$Sans pourriture - sans traitement - sans entretien du bois$q$
    ],
    array[
      $q$Toute l'élégance du bois naturel$q$,
      $q$Aucun entretien contrairement au bois véritable$q$,
      $q$Résistance intempéries, UV, humidité$q$,
      $q$Durabilité exceptionnelle$q$,
      $q$Large sélection de décors bois$q$
    ],
    array[
      $q$2500 x 1200 mm - sur commande$q$,
      $q$3050 x 1200 mm - sur commande$q$
    ],
    $q$https://www.rockpanel.be/fr/$q$,
    $q$Produit disponible uniquement sur commande - délai à confirmer avec Comarden au 061 41 27 06$q$
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

-- Verification - expect 9 ROCKPANEL rows
select slug, sku, title, category_id,
       array_length(specs,1)     as n_specs,
       array_length(avantages,1) as n_avantages,
       array_length(variants,1)  as n_variants,
       warning is not null        as has_warning
from public.products
where brand = 'ROCKPANEL'
order by sku;
