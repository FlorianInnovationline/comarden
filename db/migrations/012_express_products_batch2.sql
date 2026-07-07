-- ============================================================================
-- Comarden - Migration 012: EXPRESS (Guilbert Express) products - batch 2 (10)
-- ----------------------------------------------------------------------------
-- NOTE: the brief asked for "005_express_products_batch2.sql" but 005 is
-- already taken (normalize dashes). This is the next free number: 012.
--
-- Adds the couverture soldering consumables (brand = 'EXPRESS'), all in
-- Colles & Mastics (010), next to the batch-1 fluxes:
--   1. Flux Express 847 (1 L, zinc neuf)                     sku 847
--   2. Flux Express 850 (Zinc-Quartz / Zinc-Prépatiné)       sku 850
--   3. Baguette demi-ronde 33 % Étain                        sku 1933
--   4. Fil coupé Sn90 Zn10 sans plomb (2 baguettes)          sku 1934
--   5. Baguette triangulaire 33 % Étain                      sku 1935
--   6. Fil coupé Sn90 Zn10 sans plomb (vrac 3,2 kg)          sku 1936
--   7. Targette 33 % Étain                                   sku 1937
--   8. Pâte à étamer 100 g                                   sku 852
--   9. Pierre ammoniacale x 3 (pack)                         sku 9642
--  10. Pierre ammoniacale x 1 (recharge platine 9640)        sku 9641
-- Platines 9640/9645 and pinceaux 9643/9644 deferred to batch 3.
--
-- Source verified against "Métaux d'apport, flux et accessoires pour la
-- couverture" (DTP13E, indice D, modifiée 14/09/2021), on disk as
-- "EXPRESS-DECAP EXPRESS 840-Comarden.pdf":
--   847 -> 1 L, pinceau, Étain/Plomb 33 % ou 28 %, FDS N° 115, zinc neuf
--          (la matrice coche aussi cuivre, laiton et acier zingué - ajouté)
--   850 -> 250 ml, pinceau 2 passages, avec ou sans plomb, FDS N° 116,
--          zinc vieux / pré-patiné / quartz
--   1933 -> 2 baguettes, FDS N° 315 ; 1934/1936 -> Sn90 Zn10 Ø 8,0 mm
--          440 mm max (± 10 mm), FDS N° 318 ; 1935/1937 -> carton 25 kg,
--          FDS N° 316 ; 852 -> 100 g, étiquetage CE n° 1272/2008 ;
--   9642 -> pack de 3, 60 x 40 x 45 mm, 150 g/pierre, FDS N° 109 ;
--   9641 -> 80 x 50 x 20 mm, 100 g, recharge support Réf. 9640, FDS N° 109.
--
-- Note (no action needed): for 1935/1937 the PDF cells read "250 g environ
-- par targettes" and "800 g environ par baguette" - the words targette/
-- baguette are visibly swapped in the PDF. Kept the brief's sensible
-- reading: 1935 baguette 250 g, 1937 targette 800 g.
--
-- Titles use plain hyphens (site rule: no em dashes anywhere).
-- price_cents 0 (lead/quote), EUR, stock 0, is_active true, images '[]'.
-- sku = raw EXPRESS reference number (searchable in admin).
-- Idempotent: ON CONFLICT (slug) DO UPDATE (images preserved). Dollar-quoted.
-- ============================================================================

begin;

insert into public.products
  (slug, title, description, category_id, brand, price_cents, currency, sku, stock, is_active, images, tags, specs, avantages, variants, lien_produit, warning)
values
  -- 1. Flux Express 847 (1 L, zinc neuf grand format)
  (
    $q$flux-express-847$q$,
    $q$Flux Express 847 - Flux pour métaux de couverture 1 L (Zinc neuf)$q$,
    $q$Flux Express Réf. 847 pour métaux de couverture - format grande contenance 1 L. Formulé pour le zinc naturel neuf. Application au pinceau. Idéal pour les chantiers importants.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$847$q$, 0, true, '[]'::jsonb,
    array[$q$flux$q$,$q$décapant$q$,$q$express$q$,$q$zinc$q$,$q$couverture$q$,$q$grand format$q$,$q$brasage tendre$q$],
    array[
      $q$Contenance : 1 L (grand format)$q$,
      $q$Mode d'application : au pinceau$q$,
      $q$Application : zinc naturel neuf$q$,
      $q$Fonctionne également sur : cuivre, laiton, acier zingué$q$,
      $q$Métal d'apport recommandé : Étain/Plomb 33 % ou 28 %$q$,
      $q$Fiche de données de sécurité : N° 115$q$
    ],
    array[
      $q$Grand format 1 L pour chantiers importants$q$,
      $q$Formulation dédiée zinc naturel neuf$q$,
      $q$Rendement optimal$q$
    ],
    '{}'::text[],
    $q$https://www.express.fr/$q$, null
  ),

  -- 2. Flux Express 850 (Zinc-Quartz / Zinc-Prépatiné)
  (
    $q$flux-express-850$q$,
    $q$Flux Express 850 - Zinc-Quartz et Zinc-Prépatiné$q$,
    $q$Flux Express Réf. 850 formulé spécifiquement pour les zincs modernes : Zinc-Quartz et Zinc-Prépatiné. Nécessite 2 passages pour un décapage optimal. Compatible avec métaux d'apport avec ou sans plomb.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$850$q$, 0, true, '[]'::jsonb,
    array[$q$flux$q$,$q$décapant$q$,$q$express$q$,$q$zinc-quartz$q$,$q$zinc-prépatiné$q$,$q$sans plomb$q$,$q$brasage tendre$q$],
    array[
      $q$Contenance : 250 ml$q$,
      $q$Mode d'application : au pinceau (2 passages sur Zinc-Quartz et Zinc-Prépatiné)$q$,
      $q$Applications : Zinc naturel vieux, Zinc-Quartz, Zinc-Prépatiné$q$,
      $q$Métal d'apport recommandé : Étain/Plomb 33 % ou 28 %, OU sans plomb$q$,
      $q$Fiche de données de sécurité : N° 116$q$
    ],
    array[
      $q$Compatible zincs modernes (Quartz, Prépatiné)$q$,
      $q$Compatible métaux d'apport sans plomb$q$,
      $q$Formulation professionnelle Guilbert Express$q$
    ],
    '{}'::text[],
    $q$https://www.express.fr/$q$, null
  ),

  -- 3. Baguette demi-ronde 33 % Étain (Réf. 1933)
  (
    $q$baguette-demi-ronde-etain-1933$q$,
    $q$Baguette Demi-Ronde 33 % Étain - Express (Réf. 1933)$q$,
    $q$Métal d'apport pour brasage tendre des métaux, format baguette demi-ronde 33 % étain. Préconisé pour le brasage tendre au fer à souder sur zinc naturel neuf et cuivre.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$1933$q$, 0, true, '[]'::jsonb,
    array[$q$métal d'apport$q$,$q$étain$q$,$q$brasage tendre$q$,$q$express$q$,$q$baguette$q$,$q$zinc$q$,$q$cuivre$q$],
    array[
      $q$Composition : 33 % Étain$q$,
      $q$Format : baguette demi-ronde$q$,
      $q$Conditionnement : 2 baguettes par unité$q$,
      $q$Utilité : métal d'apport pour brasage tendre des métaux$q$,
      $q$Mode opératoire : brasage tendre au fer à souder$q$,
      $q$Applications : Zinc naturel neuf (préconisé), Cuivre (fonctionne)$q$,
      $q$Fiche de données de sécurité : N° 315$q$
    ],
    array[
      $q$Format demi-rond ergonomique$q$,
      $q$33 % d'étain pour un excellent mouillage$q$,
      $q$Adapté au brasage tendre sur toitures zinc$q$
    ],
    '{}'::text[],
    $q$https://www.express.fr/$q$, null
  ),

  -- 4. Fil coupé Sn90 Zn10 sans plomb - 2 baguettes (Réf. 1934)
  (
    $q$fil-coupe-sn90-zn10-1934$q$,
    $q$Fil Coupé Sn90 Zn10 Sans Plomb - 2 baguettes (Réf. 1934)$q$,
    $q$Métal d'apport sans plomb pour brasage tendre : fil plein Sn90 Zn10 en baguettes coupées. Alternative écologique aux métaux d'apport plombés.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$1934$q$, 0, true, '[]'::jsonb,
    array[$q$métal d'apport$q$,$q$sans plomb$q$,$q$brasage tendre$q$,$q$express$q$,$q$fil coupé$q$,$q$zinc$q$],
    array[
      $q$Composition : Sn90 Zn10 (Fil plein, sans plomb)$q$,
      $q$Diamètre : Ø 8,0 mm$q$,
      $q$Longueur : 440 mm max (± 10 mm)$q$,
      $q$Conditionnement : 2 baguettes par unité$q$,
      $q$Utilité : métal d'apport pour brasage tendre sans plomb$q$,
      $q$Mode opératoire : brasage tendre au fer à souder$q$,
      $q$Fiche de données de sécurité : N° 318$q$
    ],
    array[
      $q$Formulation sans plomb - respect environnement$q$,
      $q$Fil plein pour un dosage précis$q$,
      $q$Conditionnement pratique en 2 baguettes$q$
    ],
    '{}'::text[],
    $q$https://www.express.fr/$q$, null
  ),

  -- 5. Baguette triangulaire 33 % Étain (Réf. 1935)
  (
    $q$baguette-triangulaire-etain-1935$q$,
    $q$Baguette Triangulaire 33 % Étain - Express (Réf. 1935)$q$,
    $q$Métal d'apport pour brasage tendre des métaux, format baguette triangulaire 33 % étain. Format grand rendement - 250 g environ par baguette, carton de 25 kg.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$1935$q$, 0, true, '[]'::jsonb,
    array[$q$métal d'apport$q$,$q$étain$q$,$q$brasage tendre$q$,$q$express$q$,$q$baguette$q$,$q$grand format$q$],
    array[
      $q$Composition : 33 % Étain$q$,
      $q$Format : baguette triangulaire$q$,
      $q$Poids par baguette : 250 g environ$q$,
      $q$Conditionnement : carton de 25 kg$q$,
      $q$Utilité : métal d'apport pour brasage tendre des métaux$q$,
      $q$Mode opératoire : brasage tendre au fer à souder$q$,
      $q$Fiche de données de sécurité : N° 316$q$
    ],
    array[
      $q$Format professionnel grand rendement (25 kg)$q$,
      $q$Baguette triangulaire pour préhension facilitée$q$,
      $q$33 % d'étain - excellent mouillage$q$
    ],
    '{}'::text[],
    $q$https://www.express.fr/$q$, null
  ),

  -- 6. Fil coupé Sn90 Zn10 sans plomb - vrac 3,2 kg (Réf. 1936)
  (
    $q$fil-coupe-sn90-zn10-vrac-1936$q$,
    $q$Fil Coupé Sn90 Zn10 Sans Plomb - Vrac 3,2 kg (Réf. 1936)$q$,
    $q$Métal d'apport sans plomb pour brasage tendre : fil plein Sn90 Zn10 en baguettes coupées, format vrac 3,2 kg. Format professionnel pour chantiers importants.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$1936$q$, 0, true, '[]'::jsonb,
    array[$q$métal d'apport$q$,$q$sans plomb$q$,$q$brasage tendre$q$,$q$express$q$,$q$fil coupé$q$,$q$vrac$q$,$q$grand format$q$],
    array[
      $q$Composition : Sn90 Zn10 (Fil plein, sans plomb)$q$,
      $q$Diamètre : Ø 8,0 mm$q$,
      $q$Longueur : 440 mm max (± 10 mm)$q$,
      $q$Conditionnement : 3,2 kg en vrac$q$,
      $q$Utilité : métal d'apport pour brasage tendre sans plomb$q$,
      $q$Mode opératoire : brasage tendre au fer à souder$q$,
      $q$Fiche de données de sécurité : N° 318$q$
    ],
    array[
      $q$Format vrac 3,2 kg - chantiers importants$q$,
      $q$Formulation sans plomb$q$,
      $q$Excellent rapport quantité/prix$q$
    ],
    '{}'::text[],
    $q$https://www.express.fr/$q$, null
  ),

  -- 7. Targette 33 % Étain (Réf. 1937)
  (
    $q$targette-etain-1937$q$,
    $q$Targette 33 % Étain - Express (Réf. 1937)$q$,
    $q$Métal d'apport pour brasage tendre des métaux, format targette 33 % étain. Format grand rendement - 800 g environ par targette, carton de 25 kg.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$1937$q$, 0, true, '[]'::jsonb,
    array[$q$métal d'apport$q$,$q$étain$q$,$q$brasage tendre$q$,$q$express$q$,$q$targette$q$,$q$grand format$q$],
    array[
      $q$Composition : 33 % Étain$q$,
      $q$Format : targette$q$,
      $q$Poids par targette : 800 g environ$q$,
      $q$Conditionnement : carton de 25 kg$q$,
      $q$Utilité : métal d'apport pour brasage tendre des métaux$q$,
      $q$Mode opératoire : brasage tendre au fer à souder$q$,
      $q$Fiche de données de sécurité : N° 316$q$
    ],
    array[
      $q$Format targette 800 g - usage professionnel intensif$q$,
      $q$Carton 25 kg pour chantiers longue durée$q$,
      $q$33 % d'étain - mouillage optimal$q$
    ],
    '{}'::text[],
    $q$https://www.express.fr/$q$, null
  ),

  -- 8. Pâte à étamer 100 g (Réf. 852)
  (
    $q$pate-a-etamer-852$q$,
    $q$Pâte à Étamer 100 g - Express (Réf. 852)$q$,
    $q$Pâte à étamer Express - permet le décapage et l'étamage de la panne du fer à souder simultanément. Pour l'obtention de cordons de soudures très propres.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$852$q$, 0, true, '[]'::jsonb,
    array[$q$pâte à étamer$q$,$q$express$q$,$q$fer à souder$q$,$q$décapage$q$,$q$brasage tendre$q$],
    array[
      $q$Contenance : 100 g$q$,
      $q$Utilité : décapage + étamage simultané de la panne$q$,
      $q$Mode opératoire : faire chauffer le fer et frotter la panne contre la pâte. Une fois ramollie, elle décape et étame la panne$q$,
      $q$Étiquetage : selon règlement (CE) n° 1272/2008$q$
    ],
    array[
      $q$Double action : décape et étame en une opération$q$,
      $q$Cordons de soudure très propres$q$,
      $q$Format compact 100 g pratique$q$
    ],
    '{}'::text[],
    $q$https://www.express.fr/$q$, null
  ),

  -- 9. Pierre ammoniacale x 3 - pack (Réf. 9642)
  (
    $q$pierre-ammoniacale-pack-9642$q$,
    $q$Pierre Ammoniacale - Pack de 3 (Réf. 9642)$q$,
    $q$Pack de 3 pierres ammoniacales pour décaper et nettoyer les pannes de fers à souder. Permet un décapage parfait et homogène des surfaces pour une qualité de soudure supérieure.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$9642$q$, 0, true, '[]'::jsonb,
    array[$q$pierre ammoniacale$q$,$q$express$q$,$q$fer à souder$q$,$q$décapage$q$,$q$nettoyage panne$q$],
    array[
      $q$Conditionnement : pack de 3 pierres$q$,
      $q$Dimensions par pierre : 60 x 40 x 45 mm$q$,
      $q$Poids par pierre : 150 g$q$,
      $q$Utilité : décaper et nettoyer les pannes de fers à souder$q$,
      $q$Mode opératoire : faire chauffer le fer, frotter la panne contre la pierre. La pierre décape la panne - puis étamer à l'étain-plomb (une goutte de métal d'apport pendant le décapage améliore le contact pierre/panne et accélère l'opération)$q$,
      $q$Fiche de données de sécurité : N° 109$q$
    ],
    array[
      $q$Décapage parfait et homogène$q$,
      $q$Qualité de soudure supérieure$q$,
      $q$Format économique pack de 3$q$
    ],
    '{}'::text[],
    $q$https://www.express.fr/$q$, null
  ),

  -- 10. Pierre ammoniacale x 1 - recharge (Réf. 9641)
  (
    $q$pierre-ammoniacale-recharge-9641$q$,
    $q$Pierre Ammoniacale 100 g - Recharge pour Platine 9640 (Réf. 9641)$q$,
    $q$Pierre ammoniacale 100 g conçue comme recharge pour la platine Express Réf. 9640. Permet un décapage parfait des pannes de fer à souder.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$9641$q$, 0, true, '[]'::jsonb,
    array[$q$pierre ammoniacale$q$,$q$express$q$,$q$recharge$q$,$q$platine 9640$q$,$q$fer à souder$q$],
    array[
      $q$Conditionnement : 1 pierre$q$,
      $q$Dimensions : 80 x 50 x 20 mm$q$,
      $q$Poids : 100 g$q$,
      $q$Utilité : recharge pour platine Réf. 9640$q$,
      $q$Fiche de données de sécurité : N° 109$q$
    ],
    array[
      $q$Recharge dédiée pour platine 9640$q$,
      $q$Format optimisé pour la platine$q$,
      $q$Décapage parfait$q$
    ],
    '{}'::text[],
    $q$https://www.express.fr/$q$, null
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

-- Verification - expect 20 EXPRESS rows total (10 from batch 1 + these 10)
select slug, sku, title, category_id,
       array_length(specs,1)     as n_specs,
       array_length(avantages,1) as n_avantages
from public.products
where brand = 'EXPRESS'
order by sku;
