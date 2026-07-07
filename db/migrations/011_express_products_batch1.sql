-- ============================================================================
-- Comarden - Migration 011: EXPRESS (Guilbert Express) products - batch 1 (10)
-- ----------------------------------------------------------------------------
-- NOTE: the brief asked for "004_express_products_batch1.sql" but 004 is
-- already taken (SOPREMA). This is the next free number: 011.
--
-- Adds the Vulcane Express torch system + soldering fluxes (brand = 'EXPRESS'):
--   1. Vulcane Express Chalumeau Pro kit  (Réf. 470)   -> visserie (009)
--   2. Lance turbo 4714 Frigoriste (jaune)             -> visserie (009)
--   3. Lance turbo 4722 Plombier (rouge)               -> visserie (009)
--   4. Lance turbo 4728 Chauffagiste (verte)           -> visserie (009)
--   5. Lance turbo 4735 grande puissance (cyan)        -> visserie (009)
--   6. Lance air chaud 4750 (noire)                    -> visserie (009)
--   7. Tuyau d'extension Réf. 4770                     -> visserie (009)
--   8. Decap'Express 840 (flux zinc neuf)              -> colles-mastics (010)
--   9. Super Decap'Express 845 (flux zinc oxydé)       -> colles-mastics (010)
--  10. Flux universel Express 839                      -> colles-mastics (010)
--
-- Sources verified against the PDFs on disk:
--   - "EXPRESS-Tuyaux d'extension.pdf" = Fiche Technique 4714-4722-4728-4735-4750
--     (DTP13-E, indice J, 06/05/2024): all lance values + pièces détachées
--     (4701 gâchette+piezo, 4702 pied stabilisateur, 4770 tuyau d'extension).
--   - "EXPRESS-Super Decap Express 845 II.pdf": 845, 320 ml, U.E. 12,
--     EAN 3189640008458, "préconisé sur zinc oxydé", ISO 9001 (LRQA).
--   - "EXPRESS-DECAP EXPRESS 840-Comarden.pdf" / "...845.pdf" (same sheet,
--     "Métaux d'apport, flux et accessoires pour la couverture", DTP13E,
--     14/09/2021): fluxes 839/840/845 -> 320 ml, au pinceau,
--     Étain/Plomb 33 % ou 28 %, FDS N° 124 / 105 / 114.
--     Per its matrix, 839/840/845 also fonctionne sur cuivre et laiton;
--     839 = zinc neuf ET vieux; 840 = zinc neuf; 845 = zinc vieux.
--
-- !! Two values flagged (kept as given in the brief, review before running):
--   [1] Vulcane 470 "Puissance maximale : 3,5 kW (avec lance Ø 28)" comes from
--       the Vulcane brochure PDF, which is NOT on disk (only 4 of the 5 PDFs
--       arrived). The lances sheet gives 3,7 kW for the 4728. Left the brief's
--       3,5 kW verbatim - confirm which one the brochure states.
--   [2] Lance 4750: the brief says "Diamètre lance : 50 mm / Longueur : 35 mm".
--       The technical sheet's air-chaud table reads: gaine et pvc Ø 50 mm,
--       lance Ø 35 mm, L 0 mm. Kept the sheet's semantics below
--       (Ø gaine/PVC 50, Ø lance 35); the L column shows 0 so no
--       "Longueur" line is emitted. Confirm if you prefer the brief's reading.
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
  -- 1. Vulcane Express Chalumeau Pro kit (Réf. 470)
  (
    $q$vulcane-express-chalumeau-470$q$,
    $q$Vulcane Express - Chalumeau Pro (Kit complet)$q$,
    $q$Vulcane Express - le chalumeau professionnel de référence pour plombier, chauffagiste, frigoriste. Cartouche Réf. 2400, température de chauffe 2400 °C, puissance jusqu'à 3,5 kW (lance Ø 28). Flamme turbo enveloppante, rendement élevé, 400 g seulement pour une manipulation facilitée.$q$,
    $q$11111111-1111-1111-1111-000000000009$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$470$q$, 0, true, '[]'::jsonb,
    array[$q$chalumeau$q$,$q$outillage pro$q$,$q$express$q$,$q$plombier$q$,$q$chauffagiste$q$,$q$frigoriste$q$,$q$brasage$q$],
    array[
      $q$Température de chauffe : 2400 °C$q$,
      $q$Puissance maximale : 3,5 kW (avec lance Ø 28)$q$,
      $q$Poids : 400 g$q$,
      $q$Cartouche : Propylène Réf. 2400$q$,
      $q$Matériaux : Laiton, Inox, Zamak (résistance à l'oxydation)$q$,
      $q$Allumage : Piezo intégré$q$,
      $q$Gâchette : 2 modes (continu / intermittent)$q$,
      $q$Commande lance 3 positions : Montage/démontage, Verrouillage, Fonctionnement$q$,
      $q$Sécurité : blocage gâchette en position stockage$q$,
      $q$Utilisation multi-positions (retournement immédiat)$q$,
      $q$Pied stabilisateur amovible inclus$q$,
      $q$Auto-maintenance brevetée (Piezo et injecteur changeables sans outil)$q$
    ],
    array[
      $q$Flamme turbo enveloppante pour meilleure répartition de chaleur$q$,
      $q$Rendement élevé - jusqu'au dernier gramme de gaz$q$,
      $q$Ergonomie étudiée, poignée confort bi-matière$q$,
      $q$3 lances disponibles pour tous types de tubes cuivre$q$,
      $q$Utilisation à la carte grâce au pied stabilisateur$q$,
      $q$Fiabilité : matériaux haute qualité résistants à l'oxydation$q$,
      $q$Sécurité utilisateur renforcée$q$,
      $q$Auto-maintenance sans outil$q$
    ],
    array[
      $q$Kit complet livré avec : 1 chalumeau + lance 4722 (plombier) + cartouche Propylène Réf. 2400 + pied stabilisateur + notice, en boîte carton$q$
    ],
    $q$https://www.express.fr/$q$, null
  ),

  -- 2. Lance turbo 4714 Frigoriste (jaune)
  (
    $q$lance-vulcane-4714-frigoriste$q$,
    $q$Lance Turbo 4714 Frigoriste - Vulcane Express (Jaune)$q$,
    $q$Lance turbo Frigoriste (repère jaune) pour chalumeau Vulcane Express. Conçue pour le brasage sur tubes cuivre Ø 10 à 16 mm. Injecteur Réf. 47014.$q$,
    $q$11111111-1111-1111-1111-000000000009$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$4714$q$, 0, true, '[]'::jsonb,
    array[$q$lance chalumeau$q$,$q$vulcane$q$,$q$express$q$,$q$frigoriste$q$,$q$brasage cuivre$q$],
    array[
      $q$Repère couleur : Jaune$q$,
      $q$Compatible tubes cuivre : Ø 10 à 16 mm$q$,
      $q$Débit gaz (selon NF EN 521, à 1,4 bar / 20 psi) : 168 g/h$q$,
      $q$Puissance : 2,3 kW (7800 BTU/h)$q$,
      $q$Diamètre cuivre lance : 12 mm$q$,
      $q$Longueur : 85 mm$q$,
      $q$Type de flamme : Turbo$q$,
      $q$Cartouche compatible : Réf. 2400$q$,
      $q$Injecteur associé : Réf. 47014$q$
    ],
    array[
      $q$Flamme turbo pour un rendement optimal$q$,
      $q$Adaptée aux exigences des professionnels de la climatisation$q$,
      $q$Compatible chalumeau Vulcane Express Réf. 470$q$
    ],
    '{}'::text[],
    $q$https://www.express.fr/$q$, null
  ),

  -- 3. Lance turbo 4722 Plombier (rouge)
  (
    $q$lance-vulcane-4722-plombier$q$,
    $q$Lance Turbo 4722 Plombier - Vulcane Express (Rouge)$q$,
    $q$Lance turbo Plombier (repère rouge) pour chalumeau Vulcane Express. Conçue pour le brasage sur tubes cuivre Ø 16 à 22 mm. Injecteur Réf. 47022. Livrée en standard avec le kit Vulcane Réf. 470.$q$,
    $q$11111111-1111-1111-1111-000000000009$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$4722$q$, 0, true, '[]'::jsonb,
    array[$q$lance chalumeau$q$,$q$vulcane$q$,$q$express$q$,$q$plombier$q$,$q$brasage cuivre$q$],
    array[
      $q$Repère couleur : Rouge$q$,
      $q$Compatible tubes cuivre : Ø 16 à 22 mm$q$,
      $q$Débit gaz (selon NF EN 521, à 1,4 bar / 20 psi) : 214 g/h$q$,
      $q$Puissance : 2,9 kW (9900 BTU/h)$q$,
      $q$Diamètre cuivre lance : 18 mm$q$,
      $q$Longueur : 90 mm$q$,
      $q$Type de flamme : Turbo$q$,
      $q$Cartouche compatible : Réf. 2400$q$,
      $q$Injecteur associé : Réf. 47022$q$
    ],
    array[
      $q$Lance standard fournie avec le kit Vulcane Express$q$,
      $q$Flamme turbo enveloppante$q$,
      $q$Idéale pour la plomberie sanitaire$q$
    ],
    '{}'::text[],
    $q$https://www.express.fr/$q$, null
  ),

  -- 4. Lance turbo 4728 Chauffagiste (verte)
  (
    $q$lance-vulcane-4728-chauffagiste$q$,
    $q$Lance Turbo 4728 Chauffagiste - Vulcane Express (Verte)$q$,
    $q$Lance turbo Chauffagiste (repère vert) pour chalumeau Vulcane Express. Conçue pour le brasage sur tubes cuivre Ø 22 à 28 mm. Puissance maximale de la gamme turbo standard (3,7 kW). Injecteur Réf. 47028.$q$,
    $q$11111111-1111-1111-1111-000000000009$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$4728$q$, 0, true, '[]'::jsonb,
    array[$q$lance chalumeau$q$,$q$vulcane$q$,$q$express$q$,$q$chauffagiste$q$,$q$brasage cuivre$q$],
    array[
      $q$Repère couleur : Vert$q$,
      $q$Compatible tubes cuivre : Ø 22 à 28 mm$q$,
      $q$Débit gaz (selon NF EN 521, à 1,4 bar / 20 psi) : 272 g/h$q$,
      $q$Puissance : 3,7 kW (12600 BTU/h)$q$,
      $q$Diamètre cuivre lance : 22 mm$q$,
      $q$Longueur : 100 mm$q$,
      $q$Type de flamme : Turbo$q$,
      $q$Cartouche compatible : Réf. 2400$q$,
      $q$Injecteur associé : Réf. 47028$q$
    ],
    array[
      $q$Puissance maximale de la gamme turbo standard$q$,
      $q$Adaptée aux gros diamètres cuivre chauffage$q$,
      $q$Compatible chalumeau Vulcane Express$q$
    ],
    '{}'::text[],
    $q$https://www.express.fr/$q$, null
  ),

  -- 5. Lance turbo 4735 grande puissance (cyan)
  (
    $q$lance-vulcane-4735$q$,
    $q$Lance Turbo 4735 Grande Puissance - Vulcane Express (Cyan)$q$,
    $q$Lance turbo grande puissance (repère cyan) pour chalumeau Vulcane Express. Conçue pour tubes cuivre Ø 28 à 35 mm. Puissance 5,5 kW. Injecteur Réf. 47035.$q$,
    $q$11111111-1111-1111-1111-000000000009$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$4735$q$, 0, true, '[]'::jsonb,
    array[$q$lance chalumeau$q$,$q$vulcane$q$,$q$express$q$,$q$grande puissance$q$,$q$brasage cuivre$q$],
    array[
      $q$Repère couleur : Cyan$q$,
      $q$Compatible tubes cuivre : Ø 28 à 35 mm$q$,
      $q$Débit gaz (selon NF EN 521, à 1,4 bar / 20 psi) : 407 g/h$q$,
      $q$Puissance : 5,5 kW (18900 BTU/h)$q$,
      $q$Diamètre cuivre lance : 30 mm$q$,
      $q$Longueur : 210 mm$q$,
      $q$Type de flamme : Turbo$q$,
      $q$Cartouche compatible : Réf. 2400$q$,
      $q$Injecteur associé : Réf. 47035$q$
    ],
    array[
      $q$Puissance haut de gamme pour gros travaux$q$,
      $q$Grande longueur pour meilleure portée$q$,
      $q$Compatible chalumeau Vulcane Express$q$
    ],
    '{}'::text[],
    $q$https://www.express.fr/$q$, null
  ),

  -- 6. Lance air chaud 4750 (noire)
  -- [flag 2] fiche technique: gaine et pvc Ø 50 mm / Ø lance 35 mm / L 0 mm
  (
    $q$lance-vulcane-4750-air-chaud$q$,
    $q$Lance Air Chaud 4750 - Vulcane Express (Noire)$q$,
    $q$Lance à air chaud (repère noir) pour chalumeau Vulcane Express. Conçue pour les gaines thermorétractables et le travail sur PVC. Puissance 2,7 kW. Injecteur Réf. 47050.$q$,
    $q$11111111-1111-1111-1111-000000000009$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$4750$q$, 0, true, '[]'::jsonb,
    array[$q$lance chalumeau$q$,$q$vulcane$q$,$q$express$q$,$q$air chaud$q$,$q$gaine thermorétractable$q$,$q$pvc$q$],
    array[
      $q$Repère couleur : Noir$q$,
      $q$Application : gaines thermorétractables et PVC (Ø 50 mm)$q$,
      $q$Débit gaz (selon NF EN 521, à 1,4 bar / 20 psi) : 204 g/h$q$,
      $q$Puissance : 2,7 kW (9280 BTU/h)$q$,
      $q$Diamètre lance : 35 mm$q$,
      $q$Type de flamme : Air chaud$q$,
      $q$Cartouche compatible : Réf. 2400$q$,
      $q$Injecteur associé : Réf. 47050$q$
    ],
    array[
      $q$Application spécifique : gaines et PVC$q$,
      $q$Flamme air chaud (sans flamme directe)$q$,
      $q$Compatible chalumeau Vulcane Express$q$
    ],
    '{}'::text[],
    $q$https://www.express.fr/$q$, null
  ),

  -- 7. Tuyau d'extension Réf. 4770
  (
    $q$tuyau-extension-vulcane-4770$q$,
    $q$Tuyau d'Extension - Vulcane Express (Réf. 4770)$q$,
    $q$Tuyau d'extension pour chalumeau Vulcane Express. Permet d'éloigner la cartouche de la zone de travail ou d'accéder aux zones difficiles. Compatible avec toutes les lances Vulcane.$q$,
    $q$11111111-1111-1111-1111-000000000009$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$4770$q$, 0, true, '[]'::jsonb,
    array[$q$accessoire chalumeau$q$,$q$vulcane$q$,$q$express$q$,$q$tuyau extension$q$],
    array[
      $q$Compatible : chalumeau Vulcane Express Réf. 470$q$,
      $q$Compatible avec toutes lances Vulcane (4714, 4722, 4728, 4735, 4750)$q$,
      $q$Référence pièce détachée : 4770 (fiche technique DTP13-E)$q$
    ],
    array[
      $q$Accès facilité aux zones difficiles$q$,
      $q$Éloigne la cartouche de la zone de chauffe$q$,
      $q$Se monte/démonte facilement$q$
    ],
    '{}'::text[],
    $q$https://www.express.fr/$q$, null
  ),

  -- 8. Decap'Express 840 (flux zinc neuf)
  (
    $q$decap-express-840$q$,
    $q$Decap'Express 840 - Flux pour métaux de couverture (Zinc neuf)$q$,
    $q$Flux Decap'Express 840 pour le décapage et la préparation des métaux de couverture. Formulé spécifiquement pour le zinc naturel neuf. Application au pinceau.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$840$q$, 0, true, '[]'::jsonb,
    array[$q$flux$q$,$q$décapant$q$,$q$express$q$,$q$zinc$q$,$q$couverture$q$,$q$brasage tendre$q$],
    array[
      $q$Contenance : 320 ml$q$,
      $q$Mode d'application : au pinceau$q$,
      $q$Application : zinc naturel neuf$q$,
      $q$Fonctionne également sur : cuivre, laiton$q$,
      $q$Métal d'apport recommandé : Étain/Plomb 33 % ou 28 %$q$,
      $q$Fiche de données de sécurité : N° 105$q$
    ],
    array[
      $q$Formulation dédiée au zinc naturel neuf$q$,
      $q$Application au pinceau simple et propre$q$,
      $q$Compatible étain-plomb 33 % / 28 %$q$
    ],
    '{}'::text[],
    $q$https://www.express.fr/$q$, null
  ),

  -- 9. Super Decap'Express 845 (flux zinc oxydé)
  (
    $q$super-decap-express-845$q$,
    $q$Super Decap'Express 845 - Flux pour zinc oxydé$q$,
    $q$Flux Super Decap'Express 845, formulé spécifiquement pour le décapage du zinc naturel vieux/oxydé. Puissance de décapage renforcée pour les couvertures anciennes. Application au pinceau.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$845$q$, 0, true, '[]'::jsonb,
    array[$q$flux$q$,$q$décapant$q$,$q$express$q$,$q$zinc oxydé$q$,$q$couverture$q$,$q$brasage tendre$q$],
    array[
      $q$Contenance : 320 ml$q$,
      $q$Code EAN : 3189640008458$q$,
      $q$Unité d'emballage : carton de 12$q$,
      $q$Mode d'application : au pinceau$q$,
      $q$Application : zinc naturel vieux / oxydé$q$,
      $q$Fonctionne également sur : cuivre, laiton$q$,
      $q$Métal d'apport recommandé : Étain/Plomb 33 % ou 28 %$q$,
      $q$Fiche de données de sécurité : N° 114$q$
    ],
    array[
      $q$Préconisé sur zinc oxydé (couvertures anciennes)$q$,
      $q$Puissance de décapage renforcée$q$,
      $q$Fabriqué en France par Guilbert Express (certifié ISO 9001)$q$
    ],
    '{}'::text[],
    $q$https://www.express.fr/$q$, null
  ),

  -- 10. Flux universel Express 839
  (
    $q$flux-universel-express-839$q$,
    $q$Flux Universel 839 - Express (Zinc neuf, cuivre, laiton)$q$,
    $q$Flux universel Express Réf. 839 pour brasage tendre sur zinc naturel neuf, zinc naturel vieux, cuivre et laiton. Une formulation polyvalente qui remplace plusieurs fluxes spécifiques.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$EXPRESS$q$, 0, $q$EUR$q$, $q$839$q$, 0, true, '[]'::jsonb,
    array[$q$flux$q$,$q$décapant$q$,$q$express$q$,$q$universel$q$,$q$cuivre$q$,$q$laiton$q$,$q$zinc$q$,$q$brasage tendre$q$],
    array[
      $q$Contenance : 320 ml$q$,
      $q$Mode d'application : au pinceau$q$,
      $q$Applications : zinc naturel (neuf ET vieux), cuivre, laiton$q$,
      $q$Métal d'apport recommandé : Étain/Plomb 33 % ou 28 %$q$,
      $q$Fiche de données de sécurité : N° 124$q$
    ],
    array[
      $q$Polyvalent : 4 métaux couverts$q$,
      $q$Remplace plusieurs fluxes spécifiques$q$,
      $q$Application au pinceau simple$q$
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

-- Verification - expect 10 EXPRESS rows
select slug, sku, title, category_id,
       array_length(specs,1)     as n_specs,
       array_length(avantages,1) as n_avantages
from public.products
where brand = 'EXPRESS'
order by sku;
