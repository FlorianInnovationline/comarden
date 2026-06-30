-- ============================================================================
-- Comarden - Migration 004: SOPREMA products (10)
-- ----------------------------------------------------------------------------
-- Adds the SOPREMA range to public.products (brand = 'SOPREMA').
-- Source: the soprema.be product pages (data fetched + transcribed).
-- Categories: membranes/résines/EPDM → toitures-plates (…007);
--             isolants fibre de bois / PIR → isolation (…004).
-- price_cents 0 (lead/quote), EUR, stock 0, is_active true, images '[]'.
-- Idempotent: ON CONFLICT (slug) DO UPDATE (images preserved). Dollar-quoted.
--
-- ⚠️ NOTES (confirm before running):
--   * SOPREMA pages do NOT publish EAN codes - variants use the SOPREMA
--     "code produit" (réf) instead. No EANs were invented.
--   * Avantages are left NULL where the page had no benefits section.
--   * Product 10 (SOPRAGUARD STICK) re-uses the EXISTING row
--     `sopraguard-stick-epdm` → this UPDATE overwrites its data with the
--     official soprema.be values (10 m × 1,5 m, ép. 1,1/1,5 mm) which DIFFER
--     from the old marketing data (30 m, 1,14 mm). Remove that row here if you
--     want to keep the old values.
--   * SOPRATHERM ALU R: per-thickness codes published as ranges on the site;
--     variants list the 3 formats + code ranges.
--   * ALSAN FLASHING QUADRO: the site shows the same base réf 00154244 for all
--     RAL colours (suffix differentiates).
-- ============================================================================

begin;

insert into public.products
  (slug, title, description, category_id, brand, price_cents, currency, sku, stock, is_active, images, tags, specs, avantages, variants, lien_produit, warning)
values
  -- 1. SOPRAVAP 3/1 - résine primaire / pare-vapeur / colle (toitures plates)
  (
    $q$sopravap-3-1$q$,
    $q$SOPRAVAP 3/1 - Résine primaire, pare-vapeur et colle$q$,
    $q$Résine liquide bicomposant à base de PU qui assure, après séchage et réticulation, les fonctions de primaire, pare-vapeur et colle. Utilisée pour coller des panneaux isolants sur un support en béton.$q$,
    $q$11111111-1111-1111-1111-000000000007$q$, $q$SOPREMA$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$soprema$q$,$q$pare-vapeur$q$,$q$colle$q$,$q$résine$q$,$q$primaire$q$,$q$toiture plate$q$],
    array[
      $q$Type : résine liquide bicomposant PU$q$,
      $q$Fonctions : primaire, pare-vapeur et colle$q$,
      $q$Température d'application : +5 / +35 °C$q$,
      $q$Poids : 25 kg (bidon 20 kg + 5 kg)$q$,
      $q$Unités par palette : 20$q$
    ],
    null,
    array[$q$Bidon 20 kg + 5 kg (25 kg) - réf 00033947 - 20/palette$q$],
    $q$https://www.soprema.be/fr/produits/sopravap-3/1$q$, null
  ),

  -- 2. MONOGUM 4 TF - membrane APP de finition (toitures plates)
  (
    $q$monogum-4-tf$q$,
    $q$MONOGUM 4 TF - Membrane bitumineuse APP de finition$q$,
    $q$Membrane composée de bitume plastomère (APP) et d'une armature composite polyester, utilisée comme couche de finition dans les revêtements d'étanchéité de toiture mono ou multicouche. Surface protégée par des paillettes d'ardoise.$q$,
    $q$11111111-1111-1111-1111-000000000007$q$, $q$SOPREMA$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$soprema$q$,$q$membrane bitumineuse$q$,$q$app$q$,$q$toiture plate$q$,$q$étanchéité$q$,$q$finition$q$],
    array[
      $q$Type : membrane APP (bitume plastomère)$q$,
      $q$Armature : polyester composite$q$,
      $q$Épaisseur : 4 mm$q$,
      $q$Finition supérieure : paillettes d'ardoise (sablé)$q$,
      $q$Finition inférieure : film thermofusible$q$,
      $q$Norme : CE$q$
    ],
    null,
    array[$q$10 m × 1 m (10 m²) - réf 00030798 - 23/palette$q$],
    $q$https://www.soprema.be/fr/produits/monogum-4-tf$q$, null
  ),

  -- 3. SOPRASTICK VENTI FF - sous-couche autoadhésive (toitures plates)
  (
    $q$soprastick-venti-ff$q$,
    $q$SOPRASTICK VENTI FF - Membrane sous-couche autoadhésive$q$,
    $q$Membrane autoadhésive à diffusion de la vapeur d'eau, utilisée comme sous-couche d'un système d'étanchéité de toiture multicouche sur des supports où une adhérence par semi-indépendance est requise.$q$,
    $q$11111111-1111-1111-1111-000000000007$q$, $q$SOPREMA$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$soprema$q$,$q$membrane bitumineuse$q$,$q$sbs$q$,$q$autoadhésive$q$,$q$sous-couche$q$,$q$toiture plate$q$],
    array[
      $q$Type : SBS (bitume élastomère)$q$,
      $q$Armature : polyester composite$q$,
      $q$Épaisseur : 2,6 mm$q$,
      $q$Poids : 4 kg/m²$q$,
      $q$Finition supérieure : film thermofusible$q$,
      $q$Finition inférieure : film siliconé pelable$q$
    ],
    array[
      $q$Autoadhésive - pose rapide$q$,
      $q$Diffusion de la vapeur d'eau$q$,
      $q$Adhérence par semi-indépendance$q$
    ],
    array[$q$10 m × 1 m - réf 00100976 - 40 kg/rouleau - 18/palette$q$],
    $q$https://www.soprema.be/fr/produits/soprastick-venti-ff$q$, null
  ),

  -- 4. SOPRAGUM OPTIMA 4 TmF C1 FR - membrane APP de finition ignifuge (toitures plates)
  (
    $q$sopragum-optima-4-tmf-c1-fr$q$,
    $q$SOPRAGUM OPTIMA 4 TmF C1 FR - Membrane APP de finition ignifuge$q$,
    $q$Membrane APP composée de bitume plastomère, d'agents ignifuges et d'une armature composite polyester. Utilisée comme finition dans les étanchéités de toiture devant être ignifuges.$q$,
    $q$11111111-1111-1111-1111-000000000007$q$, $q$SOPREMA$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$soprema$q$,$q$membrane bitumineuse$q$,$q$app$q$,$q$ignifuge$q$,$q$toiture plate$q$,$q$finition$q$],
    array[
      $q$Type : membrane APP (bitume plastomère)$q$,
      $q$Armature : polyester composite$q$,
      $q$Épaisseur : 4 mm$q$,
      $q$Finition supérieure : sablé$q$,
      $q$Finition inférieure : film thermofusible$q$,
      $q$Réaction au feu : C1 FR$q$,
      $q$Normes : CE, ATG, Broof(t1)$q$
    ],
    array[
      $q$Agents ignifuges intégrés$q$,
      $q$Compatible toitures devant être ignifuges$q$
    ],
    array[$q$10 m × 1 m - réf 00053432 - 23/palette$q$],
    $q$https://www.soprema.be/fr/produits/sopragum-optima-4-tmf-c1-fr$q$, null
  ),

  -- 5. SOPRAGUM GARDEN 4 TF C1 FR - membrane anti-racines (toitures plates / végétalisées)
  (
    $q$sopragum-garden-4-tf-c1-fr$q$,
    $q$SOPRAGUM GARDEN 4 TF C1 FR - Membrane anti-racines toiture végétalisée$q$,
    $q$Membrane composée de bitume plastomère incluant des agents anti-racines et ignifuges et d'une armature polyester composite. Adaptée aux toitures végétalisées et aux ouvrages enterrés.$q$,
    $q$11111111-1111-1111-1111-000000000007$q$, $q$SOPREMA$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$soprema$q$,$q$membrane bitumineuse$q$,$q$anti-racines$q$,$q$toiture végétalisée$q$,$q$ignifuge$q$,$q$étanchéité$q$],
    array[
      $q$Type : membrane APP (bitume plastomère)$q$,
      $q$Armature : polyester composite$q$,
      $q$Épaisseur : 4 mm$q$,
      $q$Agents anti-racines intégrés$q$,
      $q$Agents ignifuges$q$,
      $q$Couverture : 10 m² (10 m × 1 m)$q$
    ],
    array[
      $q$Protection anti-racines intégrée$q$,
      $q$Agents ignifuges$q$,
      $q$Adaptée aux toitures végétalisées et ouvrages enterrés$q$
    ],
    array[$q$10 m × 1 m - réf 00321653 - 23/palette$q$],
    $q$https://www.soprema.be/fr/produits/sopragum-garden-4-tf-c1-fr$q$, null
  ),

  -- 6. ISOLAIR MULTI - panneau pare-pluie fibre de bois (isolation)
  (
    $q$isolair-multi$q$,
    $q$ISOLAIR MULTI - Panneau pare-pluie en fibre de bois$q$,
    $q$Panneau isolant en fibre de bois pare-pluie pour toitures inclinées et façades ventilées.$q$,
    $q$11111111-1111-1111-1111-000000000004$q$, $q$SOPREMA$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$soprema$q$,$q$isolation$q$,$q$fibre de bois$q$,$q$pare-pluie$q$,$q$toiture inclinée$q$,$q$façade ventilée$q$],
    array[
      $q$Matériau : fibre de bois$q$,
      $q$Conductivité thermique λd : 0,041-0,044 W/m·K$q$,
      $q$Résistance à la compression : 100-200 kPa$q$,
      $q$Rainurage : rainé-bouveté$q$,
      $q$Dimensions panneau : 1880 × 610 mm$q$,
      $q$Épaisseurs : 30 à 200 mm$q$,
      $q$Certifications : biosourcé, PEFC 70%, CE, NaturePlus$q$
    ],
    array[
      $q$Pare-pluie$q$,
      $q$Exposition aux intempéries jusqu'à 3 mois$q$,
      $q$Déphasage thermique important$q$,
      $q$Perméable à la vapeur, étanche à l'air$q$,
      $q$Enduit possible dès 40 mm$q$,
      $q$Surface antidérapante$q$
    ],
    array[
      $q$Ép. 30 mm - Rd 0,65 m²·K/W - réf 00230822 - 74/palette$q$,
      $q$Ép. 35 mm - Rd 0,75 m²·K/W - réf 00230827 - 64/palette$q$,
      $q$Ép. 40 mm - Rd 0,90 m²·K/W - réf 00230833 - 56/palette$q$,
      $q$Ép. 60 mm - Rd 1,35 m²·K/W - réf 00230845 - 36/palette$q$,
      $q$Ép. 80 mm - Rd 1,85 m²·K/W - réf 00230854 - 28/palette$q$,
      $q$Ép. 100 mm - Rd 2,40 m²·K/W - réf 00230857 - 22/palette$q$,
      $q$Ép. 120 mm - Rd 2,90 m²·K/W - réf 00230860 - 18/palette$q$,
      $q$Ép. 140 mm - Rd 3,40 m²·K/W - réf 00230861 - 16/palette$q$,
      $q$Ép. 160 mm - Rd 3,90 m²·K/W - réf 00230862 - 14/palette$q$,
      $q$Ép. 180 mm - Rd 4,35 m²·K/W - réf 00230864 - 12/palette$q$,
      $q$Ép. 200 mm - Rd 4,85 m²·K/W - réf 00230870 - 10/palette$q$
    ],
    $q$https://www.soprema.be/fr/produits/isolair-multi$q$, null
  ),

  -- 7. PAVAFLEX CONFORT 36 - panneau flexible fibre de bois (isolation)
  (
    $q$pavaflex-confort-36$q$,
    $q$PAVAFLEX CONFORT 36 - Panneau isolant flexible en fibre de bois$q$,
    $q$Panneau d'isolation thermique naturel et écologique à base de fibre de bois, semi-rigide. Bois sourcé à environ 90 km du site de production, 80% issu de France.$q$,
    $q$11111111-1111-1111-1111-000000000004$q$, $q$SOPREMA$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$soprema$q$,$q$isolation$q$,$q$fibre de bois$q$,$q$semi-rigide$q$,$q$acoustique$q$,$q$biosourcé$q$],
    array[
      $q$Matériau : fibre de bois semi-rigide$q$,
      $q$Conductivité thermique λd : 0,036 W/m·K$q$,
      $q$Dimensions : 1220 × 575 mm$q$,
      $q$Épaisseurs : 30 à 240 mm$q$,
      $q$Bord : droit$q$,
      $q$Certifications : biosourcé, PEFC, CE, NaturePlus$q$
    ],
    array[
      $q$Excellentes performances acoustiques$q$,
      $q$Effet de serrage supérieur, pose simple$q$,
      $q$S'adapte aux entraxes standards$q$,
      $q$Protection naturelle + traitement ignifuge$q$,
      $q$Déphasage, inertie et confort d'été$q$
    ],
    array[
      $q$Ép. 30 mm - Rd 0,80 m²·K/W - réf 00307678 - 156/palette$q$,
      $q$Ép. 40 mm - Rd 1,10 m²·K/W - réf 00285733 - 120/palette$q$,
      $q$Ép. 50 mm - Rd 1,35 m²·K/W - réf 00118267 - 90/palette$q$,
      $q$Ép. 60 mm - Rd 1,65 m²·K/W - réf 00118268 - 80/palette$q$,
      $q$Ép. 80 mm - Rd 2,20 m²·K/W - réf 00118269 - 60/palette$q$,
      $q$Ép. 100 mm - Rd 2,75 m²·K/W - réf 00118270 - 48/palette$q$,
      $q$Ép. 120 mm - Rd 3,30 m²·K/W - réf 00118271 - 40/palette$q$,
      $q$Ép. 140 mm - Rd 3,85 m²·K/W - réf 00118272 - 32/palette$q$,
      $q$Ép. 145 mm - Rd 4,00 m²·K/W - réf 00118273 - 32/palette$q$,
      $q$Ép. 160 mm - Rd 4,40 m²·K/W - réf 00118274 - 30/palette$q$,
      $q$Ép. 180 mm - Rd 5,00 m²·K/W - réf 00118275 - 24/palette$q$,
      $q$Ép. 200 mm - Rd 5,55 m²·K/W - réf 00118276 - 24/palette$q$,
      $q$Ép. 220 mm - Rd 6,10 m²·K/W - réf 00118277 - 20/palette$q$,
      $q$Ép. 240 mm - Rd 6,65 m²·K/W - réf 00118278 - 20/palette$q$
    ],
    $q$https://www.soprema.be/fr/produits/pavaflex-confort-36$q$, null
  ),

  -- 8. ALSAN FLASHING QUADRO - résine PU monocomposante (toitures plates / détails)
  (
    $q$alsan-flashing-quadro$q$,
    $q$ALSAN FLASHING QUADRO - Résine d'étanchéité polyuréthane monocomposante$q$,
    $q$Résine polyuréthane monocomposante résistante aux racines, pour l'étanchéité des surfaces horizontales avec relevés, rives de toit et tous les détails de toiture.$q$,
    $q$11111111-1111-1111-1111-000000000007$q$, $q$SOPREMA$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$soprema$q$,$q$alsan$q$,$q$résine$q$,$q$étanchéité liquide$q$,$q$polyuréthane$q$,$q$détails toiture$q$],
    array[
      $q$Type : résine polyuréthane monocomposante$q$,
      $q$Résistante aux racines$q$,
      $q$Température d'application : +5 / +35 °C$q$,
      $q$Conditionnement : seau 5 kg$q$,
      $q$Unités par palette : 70$q$,
      $q$Coloris : RAL 7012, 7040, 9002, 9011$q$
    ],
    array[
      $q$Monocomposante - prête à l'emploi$q$,
      $q$Résistante aux racines$q$,
      $q$Idéale pour relevés, rives et détails de toiture$q$
    ],
    array[
      $q$Seau 5 kg - RAL 7012 (gris basalte) - réf 00154244$q$,
      $q$Seau 5 kg - RAL 7040 (gris fenêtre) - réf 00154244$q$,
      $q$Seau 5 kg - RAL 9002 (blanc gris) - réf 00154244$q$,
      $q$Seau 5 kg - RAL 9011 (noir graphite) - réf 00154244$q$
    ],
    $q$https://www.soprema.be/fr/produits/alsan-flashing-quadro$q$, null
  ),

  -- 9. SOPRATHERM ALU R - panneau isolant PIR parement alu (isolation)
  (
    $q$sopratherm-alu-r$q$,
    $q$SOPRATHERM ALU R - Panneau isolant PIR parement aluminium$q$,
    $q$Isolant thermique en mousse rigide de polyuréthane (PIR/PUR), revêtu sur ses deux faces d'un complexe aluminisé multicouche étanche au gaz. Principalement destiné à l'isolation des toitures plates (fixation mécanique, collé ou posé en indépendance sous système lesté).$q$,
    $q$11111111-1111-1111-1111-000000000004$q$, $q$SOPREMA$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$soprema$q$,$q$isolation$q$,$q$pir$q$,$q$pur$q$,$q$toiture plate$q$,$q$parement aluminium$q$],
    array[
      $q$Matériau : mousse rigide PIR/PUR$q$,
      $q$Conductivité thermique λd : 0,022 W/m·K$q$,
      $q$Parement : complexe aluminium (2 faces)$q$,
      $q$Résistance à la compression : 150 kPa$q$,
      $q$Bords : droits$q$,
      $q$Épaisseurs : 30 à 160 mm$q$,
      $q$Dimensions : 1200 × 600, 1200 × 1000, 2400 × 1200 mm$q$,
      $q$Certifications : CE, ATG$q$
    ],
    array[
      $q$Parement aluminium à faible émissivité$q$,
      $q$Bords droits$q$,
      $q$Marquages facilitant la découpe$q$,
      $q$Pose possible en deux couches$q$
    ],
    array[
      $q$1200 × 600 mm - ép. 30 à 160 mm - réf 00271111-00271135$q$,
      $q$1200 × 1000 mm - ép. 30 à 160 mm - réf 00275265-00275278$q$,
      $q$2400 × 1200 mm - ép. 80 mm - réf 00274722$q$
    ],
    $q$https://www.soprema.be/fr/produits/sopratherm-alu-r$q$, null
  ),

  -- 10. SOPRAGUARD STICK - membrane EPDM auto-adhésive (UPDATES existing row)
  (
    $q$sopraguard-stick-epdm$q$,
    $q$SOPRAGUARD STICK - Membrane EPDM auto-adhésive$q$,
    $q$Membrane EPDM auto-adhésive, idéale pour les applications où une efficacité et une rapidité maximales en matière d'étanchéité sont requises.$q$,
    $q$11111111-1111-1111-1111-000000000007$q$, $q$SOPREMA$q$, 0, $q$EUR$q$, null, 0, true, '[]'::jsonb,
    array[$q$soprema$q$,$q$epdm$q$,$q$membrane$q$,$q$autoadhésive$q$,$q$étanchéité$q$,$q$toiture plate$q$],
    array[
      $q$Matériau : EPDM$q$,
      $q$Épaisseurs : 1,1 mm ou 1,5 mm$q$,
      $q$Dimensions rouleau : 10 m × 1,5 m$q$,
      $q$Auto-adhésive$q$,
      $q$Type : couche de finition (étanchéité synthétique)$q$
    ],
    null,
    array[
      $q$10 m × 1,5 m - ép. 1,1 mm - réf 00295212 - 36/palette$q$,
      $q$10 m × 1,5 m - ép. 1,5 mm - réf 00295213 - 36/palette$q$
    ],
    $q$https://www.soprema.be/fr/produits/sopraguard-stick$q$, null
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
-- Verification - expect 10 SOPREMA rows (9 new + sopraguard-stick-epdm updated)
-- ===========================================================================
select slug, title, brand, category_id,
       array_length(specs,1)     as n_specs,
       array_length(avantages,1) as n_avantages,
       array_length(variants,1)  as n_variants
from public.products
where brand = 'SOPREMA'
order by slug;
