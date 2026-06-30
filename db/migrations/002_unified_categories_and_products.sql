-- ============================================================================
-- Comarden - Migration 002: unified categories + seed products
-- ----------------------------------------------------------------------------
-- Phase 2 data load. Populates public.categories with the 11 unified marketing
-- categories and public.products with the 37 catalogue products migrated from
-- lib/shop/seed.ts.
--
-- Run this ONCE in the Supabase SQL Editor. It is IDEMPOTENT (safe to re-run):
-- every INSERT uses ON CONFLICT (slug) DO UPDATE.
--
-- Notes / decisions baked in:
--   * Category UUIDs are HARD-CODED (stable) so product FKs are deterministic
--     and re-runs never duplicate. Assumes the categories table is empty or
--     already holds these exact ids for these slugs (verified: 0 rows pre-run).
--   * Category slug `toitures-plates` replaces the old `epdm` (display name
--     "Toitures plates"). The code-side rename is Phase-2 Task 4.
--   * image_url reuses the shop hero images (public/images/Magasin/*.jpg) for
--     the 5 categories that have a clear equivalent in magasinCategoryImages.ts;
--     the other 6 categories are left NULL (no mapping available).
--   * products.images is set to '[]' on INSERT only (NOT overwritten on re-run)
--     so the on-disk image merge - and any future admin-curated URLs - survive.
--     Galleries come from public/images/products/<slug>/ at read time.
--   * All products: price_cents = 0 (quote/lead model), currency EUR, stock 0,
--     is_active = true, sku NULL.
--
-- Category → product distribution (37 total):
--   isolation 4 | visserie 9 | colles-mastics 11 | toitures-plates 3 | facade 10
--   toiture / ardoises / charpente / toitures-vertes / toles-panneaux /
--   couvre-murs = 0 each.
-- ============================================================================

begin;

-- ---------------------------------------------------------------------------
-- 1. Categories (11 unified marketing categories, stable UUIDs)
-- ---------------------------------------------------------------------------
insert into public.categories (id, name, slug, description, image_url) values
  ('11111111-1111-1111-1111-000000000001', 'Toiture',          'toiture',          'Matériaux de couverture pour tous types de toitures',                              null),
  ('11111111-1111-1111-1111-000000000002', 'Ardoises',         'ardoises',         'Ardoises naturelles, CEDRAL et solutions de couverture',                           null),
  ('11111111-1111-1111-1111-000000000003', 'Charpente',        'charpente',        'Bois de charpente, structures et charpentes préfabriquées',                        null),
  ('11111111-1111-1111-1111-000000000004', 'Isolation',        'isolation',        'Solutions d''isolation thermique et acoustique',                                   '/images/Magasin/2.jpg'),
  ('11111111-1111-1111-1111-000000000005', 'Toitures vertes',  'toitures-vertes',  'Systèmes de toitures végétalisées',                                                null),
  ('11111111-1111-1111-1111-000000000006', 'Tôles & Panneaux', 'toles-panneaux',   'Tôles métalliques et panneaux sandwich pour toitures & façades',                   null),
  ('11111111-1111-1111-1111-000000000007', 'Toitures plates',  'toitures-plates',  'Membranes EPDM et solutions d''étanchéité pour toitures plates',                   '/images/Magasin/1.jpg'),
  ('11111111-1111-1111-1111-000000000008', 'Façade',           'facade',           'Bardages, panneaux et solutions de revêtement de façade',                          '/images/Magasin/5.jpg'),
  ('11111111-1111-1111-1111-000000000009', 'Visserie',         'visserie',         'Vis, fixations et accessoires pour toiture et bardage',                             '/images/Magasin/3.jpg'),
  ('11111111-1111-1111-1111-000000000010', 'Colles & Mastics', 'colles-mastics',   'Colles de contact STRATO GRIP, mastics TYVEK',                                     '/images/Magasin/6.jpg'),
  ('11111111-1111-1111-1111-000000000011', 'Couvre Murs',      'couvre-murs',      'Protection et design pour vos murets extérieurs, standard ou sur mesure',           null)
on conflict (slug) do update set
  name        = excluded.name,
  description = excluded.description,
  image_url   = excluded.image_url;

-- ---------------------------------------------------------------------------
-- 2. Products (37 catalogue products)
-- ---------------------------------------------------------------------------
-- Column order:
--   slug, title, description, category_id, brand, price_cents, currency, sku,
--   stock, is_active, images, tags, specs, avantages, variants, lien_produit, warning
-- ON CONFLICT (slug): refresh everything EXCEPT images (preserve disk/admin gallery).

insert into public.products
  (slug, title, description, category_id, brand, price_cents, currency, sku, stock, is_active, images, tags, specs, avantages, variants, lien_produit, warning)
values
  -- ===== Toitures plates (3) =====
  ('ancrage-photovoltaique-elevate',
   'Ancrage Photovoltaïque Toiture Plate - ELEVATE',
   'Système de toiture terrasse photovoltaïque durable. Membrane pare-vapeur + couche isolation + membrane d''étanchéité sur laquelle s''installent les panneaux solaires. Système avec fixation traversante - étanchéité parfaite autour des points de fixation.',
   '11111111-1111-1111-1111-000000000007', 'ELEVATE', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['étanchéité','photovoltaïque','elevate'], null,
   array['Solution toiture PV complète et durable','Composants haute qualité pour éviter dépose des panneaux','Compatible tous accessoires Elevate'],
   null, 'https://www.holcimelevate.com/benelux-fr/etancheite-de-toitures/applications/toitures-syst%C3%A8me-photovolta%C3%AFque', null),

  ('rubbergard-epdm-sa-elevate',
   'Elevate RubberGard EPDM SA - Membrane auto-adhésive',
   'Membrane EPDM auto-adhésive haute performance. Technologie Secure Bond - adhésif appliqué en usine. Installation rapide sans flamme. Durée de vie >50 ans. Résistance exceptionnelle UV, ozone, températures extrêmes. Pose possible jusqu''à -7°C. Sans solvants et inodore.',
   '11111111-1111-1111-1111-000000000007', 'ELEVATE', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['étanchéité','epdm','elevate'],
   array['Durée de vie : >50 ans','Pose jusqu''à : -7°C','Technologie : Secure Bond (adhésif en usine)','Application : toitures plates commerciales, industrielles, végétalisées, PV'],
   null, null, 'https://www.holcimelevate.com/benelux-fr/etancheite-de-toitures/epdm/rubbergard-epdm-sa', null),

  ('sopraguard-stick-epdm',
   'Sopraguard Stick - Membrane EPDM auto-adhésive SOPREMA',
   'Membrane EPDM auto-adhésive haute performance. Rouleaux de 30m, épaisseur 1,14mm. Pose propre et rapide sans adhésifs supplémentaires ni outillage complexe. Réduit le temps de mise en œuvre, améliore la productivité sur chantier.',
   '11111111-1111-1111-1111-000000000007', 'SOPREMA', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['étanchéité','epdm','soprema'],
   array['Format : rouleaux 30m','Épaisseur : 1,14mm','Application : toitures plates résidentielles, commerciales, industrielles'],
   null, null, 'https://sopraguard.com/en/products/sopraguard-stick', null),

  -- ===== Isolation (4) =====
  ('pilier-ite-h120',
   'Pilier ITE H120 Support Chevrons - FAYNOT',
   'Pilier Sarking en acier galvanisé à chaud Z275, breveté. Isolation toiture par l''extérieur sans dérangement intérieur. R = 5,7 m².K/W (200mm isolant total, λ35). Fixation sur tôle métallique ondulée en creux d''onde. Aucun pont thermique.',
   '11111111-1111-1111-1111-000000000004', 'FAYNOT', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['isolation','ite','faynot','sarking'],
   array['R thermique : 5,7 m².K/W','Isolant total : 200mm (λ35)','Matériau : acier galvanisé Z275','Fixation : tôle ondulée en creux d''onde'],
   array['Isolation par l''extérieur - préserve l''espace intérieur','Aucun pont thermique','Système breveté et calculé','Compatible tous isolants souples','Correction planéité jusqu''à 40mm','Pas de formation spécifique requise'],
   null, 'https://www.faynot.com/isolation-thermique-exterieur/ite-couverture/piliers-et-accessoires.html', null),

  ('pilier-ite-h80',
   'Pilier ITE H80 Support Chevrons - FAYNOT',
   'Pilier Sarking en acier galvanisé à chaud Z275, breveté. R = 4,5 m².K/W (160mm isolant total, λ35). Même principe que H120 pour épaisseur réduite. Fixation sur tôle métallique ondulée en creux d''onde.',
   '11111111-1111-1111-1111-000000000004', 'FAYNOT', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['isolation','ite','faynot'],
   array['R thermique : 4,5 m².K/W','Isolant total : 160mm (λ35)','Matériau : acier galvanisé Z275'],
   null, null, 'https://www.faynot.com/isolation-thermique-exterieur/ite-couverture/piliers-et-accessoires.html', null),

  ('kit-pilier-ite-h120-vis',
   'Kit ITE H120 + Vis Sarking - FAYNOT',
   'Kit complet : Pilier H120 + Vis tête fraisée Super Bois zinguée Ø8 pour bois (SARKING). R = 5,7 m².K/W. Solution tout-en-un pour chantier rapide.',
   '11111111-1111-1111-1111-000000000004', 'FAYNOT', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['isolation','kit','faynot'], null, null, null,
   'https://www.faynot.com/isolation-thermique-exterieur/ite-couverture/piliers-et-accessoires.html', null),

  ('kit-pilier-ite-h80-vis',
   'Kit ITE H80 + Vis Sarking - FAYNOT',
   'Kit complet : Pilier H80 + Vis tête fraisée Super Bois zinguée Ø8 pour bois (SARKING). R = 4,5 m².K/W. Solution tout-en-un.',
   '11111111-1111-1111-1111-000000000004', 'FAYNOT', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['isolation','kit','faynot'], null, null, null,
   'https://www.faynot.com/isolation-thermique-exterieur/ite-couverture/piliers-et-accessoires.html', null),

  -- ===== Visserie (9) =====
  ('vis-tete-rivet-p1-faynot',
   'Vis tête rivet autoperceuse P1 Ø6,3×18mm - FAYNOT',
   'Vis autoforeuses P1 Ø6,3×18mm pour fixation tôles et accessoires bardage. Tête Ø9,5mm empreinte Torx T20 - aspect discret comparable à un rivet. Par 100 pièces.',
   '11111111-1111-1111-1111-000000000009', 'FAYNOT', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['visserie','faynot','autoperceuse'],
   array['Diamètre : 6,3mm','Longueur : 18mm','Tête : Ø9,5mm Torx T20','Lot : 100 pièces','Épaisseur support : 0,63 à 1mm'],
   array['Autoperceuse - aucun pré-perçage','Capacité perçage : jusqu''à 4×0,75mm','Haute résistance arrachement profils minces','Résistance corrosion : inox A2 ou zingué TK12'],
   array['Sans laquage','RAL 1015','RAL 2001','RAL 5008','RAL 6011','RAL 7006','RAL 7015','RAL 7016','RAL 7022','RAL 7037','RAL 8012','RAL 8014','RAL 9002','RAL 9005','RAL 9006','RAL 9007','RAL 9010'],
   'https://www.faynot.com/vis-tr-p1.html', null),

  ('vis-super-bois-sarking-faynot',
   'Vis tête fraisée Super Bois zinguée Ø8 Sarking - FAYNOT',
   'Vis tête fraisée Super Bois zinguée diamètre 8 pour bois (SARKING). Spécialement conçue pour les systèmes ITE couverture.',
   '11111111-1111-1111-1111-000000000009', 'FAYNOT', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['visserie','faynot','sarking'], null, null, null,
   'https://www.faynot.com/isolation-thermique-exterieur/ite-couverture/piliers-et-accessoires.html', null),

  ('vis-sk-rb-28-20x70-etanco',
   'Vis Sapin SK-RB 28/20×70 - Fixation isolants ETANCO',
   'Cheville monobloc à visser en polyamide renforcé fibre de verre. Tête large Ø50mm empreinte carrée 6mm. Pour fixation isolants en rénovation toiture. Pas de pré-perçage, vissage direct dans le bitume.',
   '11111111-1111-1111-1111-000000000009', 'ETANCO', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['visserie','etanco','isolant'],
   array['Dimensions : 28/20×70','Tête : Ø50mm empreinte carrée 6mm','Matériau : polyamide renforcé fibre de verre'],
   array['Pas de pré-perçage','Aucune corrosion','Aucun pont thermique','Excellente tenue mécanique'],
   null, null, null),

  ('vis-sk-rb-28-40x90-etanco',
   'Vis Sapin SK-RB 28/40×90 - Fixation isolants ETANCO',
   'Cheville monobloc à visser en polyamide renforcé fibre de verre. Tête large Ø50mm empreinte carrée 6mm. Dimensions 28/40×90.',
   '11111111-1111-1111-1111-000000000009', 'ETANCO', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['visserie','etanco','isolant'],
   array['Dimensions : 28/40×90','Tête : Ø50mm empreinte carrée 6mm','Matériau : polyamide renforcé fibre de verre'],
   null, null, null, null),

  ('vis-sk-rb-28-60x110-etanco',
   'Vis Sapin SK-RB 28/60×110 - Fixation isolants ETANCO',
   'Cheville monobloc à visser en polyamide renforcé fibre de verre. Dimensions 28/60×110.',
   '11111111-1111-1111-1111-000000000009', 'ETANCO', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['visserie','etanco','isolant'],
   array['Dimensions : 28/60×110','Tête : Ø50mm empreinte carrée 6mm'],
   null, null, null, null),

  ('vis-sk-rb-28-120x175-etanco',
   'Vis Sapin SK-RB 28/120×175 - Fixation isolants ETANCO',
   'Cheville monobloc à visser en polyamide renforcé fibre de verre. Dimensions 28/120×175 pour isolants épais.',
   '11111111-1111-1111-1111-000000000009', 'ETANCO', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['visserie','etanco','isolant'],
   array['Dimensions : 28/120×175','Tête : Ø50mm empreinte carrée 6mm'],
   null, null, null, null),

  ('marcovis-fm-x3-etanco',
   'MARCOVIS FM-X3/PA + Vis TF/Zn - Cheville universelle ETANCO',
   'Cheville universelle nylon PA6 haute performance pour applications non structurelles. Tenue jusqu''à 2000kg à l''arrachement. Idéale façade, charpente, béton, brique, parpaing, pierre naturelle.',
   '11111111-1111-1111-1111-000000000009', 'ETANCO', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['visserie','etanco','cheville'],
   array['Matériau cheville : nylon PA6 extra-flexible','Tenue arrachement : jusqu''à 2000kg','Applications : béton, béton cellulaire, briques, parpaings, pierre'],
   null,
   array['TF/TX30/ZN 10-20/8X60','TF/TX30/ZN 30-40/8X80','TF/TX30/ZN 50-60/8X100','TF/TX30/ZN 70-80/8X120','TF/TX40/ZN 10/10X60','TF/TX40/ZN 10-30/10X80','TF/TX40/ZN 30-50/10X100','TF/TX40/ZN 50-70/10X120','TF/TX40/ZN 70-90/10X140','TF/TX40/ZN 90-110/10X160','TF/Tx40/ZN 110-150/10X200','TF/Tx40/ZN 140-180/10X230','TF/TX40/ZN 170-210/10X260','TF/TX40/ZN 200-200/10X290'],
   'https://www.etanco.fr/MARCOVIS-FM-X3-PA-%2BVis-TF-Zn/p-MA1634', null),

  ('dispositif-anti-pigeons',
   'Dispositif anti-faune / anti-pigeons',
   'Pics métalliques inox sur base polycarbonate. Empêche oiseaux et pigeons de se poser sur toitures, corniches, façades, gouttières, panneaux solaires.',
   '11111111-1111-1111-1111-000000000009', 'COMARDEN', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['visserie','anti-pigeons','accessoire'],
   array['Base : polycarbonate traité anti-UV','Tiges : inox AISI 302, Ø1,3mm','Modules : semelles 50cm','Densité : 64 pointes/ml','Largeur protection : 5 à 7cm'],
   null, null, null, null),

  ('grille-anti-rongeur-gar-simpson',
   'Grille anti-rongeur GAR - Simpson Strong-Tie',
   'Protection bardage ventilé contre rongeurs et insectes. Acier S250GD finition ZPRO - résistance équivalente inox A2. Rouleaux 25m, épaisseur 0,8mm. Conforme DTU 41.2.',
   '11111111-1111-1111-1111-000000000009', 'SIMPSON STRONG-TIE', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['visserie','simpson','grille'],
   array['Matériau : acier S250GD finition ZPRO','Épaisseur : 0,8mm','Longueur rouleau : 25m'],
   null,
   array['GAR27/40/25 : tasseau 27mm','GAR40/60/25 : double tasseau 30+30mm'],
   'https://www.simpson.fr/fr-FR/produits/grille-anti-rongeurs-gar', null),

  -- ===== Colles & Mastics (11) =====
  ('stratogrip-s110-22l',
   'STRATOGRIP S110 - Colle contact multi-matériaux 22L',
   'Colle de contact industrielle haute performance. HPL, aluminium, MDF, panneaux particules, contreplaqué. Adhésion instantanée, résistance chaleur 100°C, séchage 1-2 min. Double encollage pour collage permanent.',
   '11111111-1111-1111-1111-000000000010', 'STRATO GRIP', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['colle','stratogrip','multi-matériaux'],
   array['Format : 22L','Séchage : 1-2 min','Résistance température : 100°C','Temps ouvert : 40min','Rendement : 22L → 200m²','Température application : 15-27°C','Stockage : 18 mois'],
   null, null, 'https://stratogrip.com/wp-content/uploads/2025/09/Fiche-Technique-STRATOGRIP-S110.pdf',
   'Non recommandé : vinyles plastifiés, plastiques flexibles, polystyrène EPS/XPS, PE, PP, monochrome'),

  ('stratogrip-s163-22l',
   'STRATOGRIP S163 - Colle polyvalente bâtiment/isolation 22L',
   'Colle ultra high-tack sans chlore pour bâtiment et isolation. Compatible bois, MDF, plastiques rigides, métaux, XPS/EPS, isolants fibre, matériaux minéraux alu. Très long temps ouvert.',
   '11111111-1111-1111-1111-000000000010', 'STRATO GRIP', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['colle','stratogrip','isolation'],
   array['Format : 22L','Séchage : 1-2 min','Résistance température : 80°C','Sans chlore'],
   null, null, 'https://stratogrip.com/product/s163/', 'Non recommandé : vinyles plastifiés'),

  ('stratogrip-m300-22l',
   'STRATOGRIP M300 - Colle mousse et tissu 22L',
   'Colle industrielle pour cuir, tissus, mousses et revêtements décoratifs. Sellerie, tapisserie, ameublement. Résistance 110°C, séchage 1-2min.',
   '11111111-1111-1111-1111-000000000010', 'STRATO GRIP', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['colle','stratogrip','mousse'],
   array['Format : 22L','Séchage : 1-2 min','Résistance température : 110°C'],
   null, null, 'https://stratogrip.com/product/m300/',
   'Non recommandé : vinyles plastifiés, PE, PP, polystyrène, monochrome'),

  ('pistolet-stratogrip',
   'Pistolet d''application professionnel STRATOGRIP',
   'Pistolet professionnel pour bonbonnes STRATOGRIP. Jet réglable 2-25cm, pression 17 bars. Ergonomique et léger. Pas de nettoyage nécessaire. Compatible toutes bonbonnes STRATOGRIP.',
   '11111111-1111-1111-1111-000000000010', 'STRATO GRIP', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['colle','stratogrip','pistolet'], null, null, null,
   'https://stratogrip.com/product/pistolet-dapplication-professionnel/', null),

  ('raccord-flexible-stratogrip',
   'Raccord flexible caoutchouc 4m - STRATOGRIP',
   'Tuyau professionnel ultra souple 4m en caoutchouc haute qualité. Pour applications collage/pulvérisation. Léger, ergonomique, facile à nettoyer.',
   '11111111-1111-1111-1111-000000000010', 'STRATO GRIP', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['colle','stratogrip','accessoire'], null, null, null,
   'https://stratogrip.com/product/raccord-flexible/', null),

  ('mastic-airguard-tyvek',
   'Mastic AirGuard® - TYVEK DUPONT',
   'Mastic adhésif pour une liaison élastique permanente et étanche à l''air des joints et connexions structurelles. Connecte les pare-vapeur à des surfaces telles que la pierre. Excellente adhérence sur béton, plâtre, pierre, plaques de plâtre et bois.',
   '11111111-1111-1111-1111-000000000010', 'TYVEK DUPONT', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['étanchéité','mastic','tyvek'], null,
   array['Application par cartouche - installation facile','Recommandé pour l''étanchéité à l''air des couches pare-vapeur AirGuard','GEV-Emicode : très faibles émissions de COV','Efficacité énergétique améliorée','Installable à -5°C'],
   null, 'https://www.dupontdenemours.fr/products/mastic-airguard.html', null),

  ('bande-tyvek-flexwrap-nf',
   'Bande adhésive DuPont™ Tyvek® FlexWrap™ NF',
   'Bande auto-adhésive flexible haute performance pour joint étanche à l''air et à l''eau autour des portes, fenêtres, cheminées, entrées de tuyaux. Utilisable intérieur/extérieur. Pose 50% plus rapide que les bandes ordinaires, sans fixation supplémentaire.',
   '11111111-1111-1111-1111-000000000010', 'TYVEK DUPONT', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['étanchéité','bande','tyvek'], null,
   array['Meilleure étanchéité à l''air et à l''eau que les membranes standard','Bande extensible avec doublure séparée en deux - installation facile','Pose ~50% plus rapide','Résiste aux rayons UV','Excellente adhérence sur la plupart des membranes de construction'],
   null, 'https://www.dupontdenemours.be/fr/products/dupont-tyvek-flexwrap-flashing-tape.html', null),

  ('poudre-assechante-express',
   'Poudre asséchante toitures plates - EXPRESS (lot 6×1kg)',
   'Absorbe eau de pluie sur toitures plates avant travaux étanchéité bitumineuse. Granulés gonflent au contact de l''eau et forment un gel. Conditionnée en boîtes 1kg, vendue par lot de 6 pièces. Réf. 848.',
   '11111111-1111-1111-1111-000000000010', 'EXPRESS', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['entretien','séchage','toiture-plate'],
   array['Conditionnement : 1kg × 6 pièces','Référence : 848'],
   null, null, 'https://www.express.fr/produit/poudre-assechante-848/', null),

  ('rouleau-sechage-toiture',
   'Rouleau de séchage toiture plate',
   'Rouleau professionnel en mousse haute absorption pour séchage rapide toitures plates. Largeur 60cm, longueur 130cm, poids ±5,5kg. Eau récupérable par presse sur drain. Fabrication allemande.',
   '11111111-1111-1111-1111-000000000010', 'IMPORT ALLEMAGNE', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['entretien','séchage','toiture-plate'],
   array['Largeur : 60cm','Longueur : 130cm','Poids : ±5,5kg','Matériau : mousse haute absorption'],
   null, null, 'https://www.asphaltequipment.be/fr/rouleau-de-sechage/', null),

  ('algimouss-pro-5l',
   'ALGIMOUSS PRO - Traitement toiture/façade 5L',
   'Traitement professionnel prêt à l''emploi. Élimine algues, lichens et moisissures. Sans chlore, sans rinçage. Double biocide. Ardoises, tuiles, fibrociment, shingles, crépis, briques, bois, pierres.',
   '11111111-1111-1111-1111-000000000010', 'ALGIMOUSS', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['entretien','algimouss','traitement'],
   array['Contenance : 5L','Consommation : ~1L/5m²','Délai d''action : 3-9 mois','Température application : 5-25°C'],
   array['Élimine algues, lichens, moisissures','Action longue durée','Sans chlore et sans rinçage','Formule double biocide','Recommandé avant peinture'],
   null, 'https://algimouss.com/produit/anti-mousse-toiture-algimouss-pro/', null),

  ('algifuge-bois-5l',
   'ALGIFUGE BOIS - Hydrofuge protection bois 5L',
   'Hydrofuge haute performance phase aqueuse sans silicone. Protège bois contre eau, huiles, corps gras, UV, gel. Retarde grisaillement. Terrasses, bardages, palissades, caillebotis, menuiseries, volets, mobilier jardin.',
   '11111111-1111-1111-1111-000000000010', 'ALGIMOUSS', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['entretien','algimouss','bois'],
   array['Contenance : 5L','Consommation : ~1L/5m²','Séchage : min 12h','Température application : 5-25°C'],
   null, null, 'https://algimouss.com/produit/hydrofuge-bois-algifuge-bois/', null),

  -- ===== Façade (10 - Clips & Go 2.0) =====
  ('clips-go-rive-100mm-3m',
   'Clips & Go 2.0 - Rive 100mm × 3m Noir RAL 9005',
   'Système Roofing Clips - aluminium thermo-laqué. 2 pièces : profilé de base + bourrelet. Finition rives toiture bitumées. Trous oblongs pré-poinçonnés 6×16mm. Compatible revêtements bitumés 4-5mm.',
   '11111111-1111-1111-1111-000000000008', 'CLAERHOUT', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['accessoire','clips-go','rive'],
   array['Matériau : aluminium thermo-laqué','Largeur : 100mm','Longueur : 3m','Couleur : Noir RAL 9005','Compatibilité : bitume 4-5mm','Joint dilatation : 5mm profilé / 3mm bourrelet'],
   null, null, null, null),

  ('clips-go-rive-70mm-3m',
   'Clips & Go 2.0 - Rive 70mm × 3m Noir RAL 9005',
   'Même système que 100mm - version 70mm. Aluminium thermo-laqué, compatible bitume 4-5mm.',
   '11111111-1111-1111-1111-000000000008', 'CLAERHOUT', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['accessoire','clips-go','rive'],
   array['Largeur : 70mm','Longueur : 3m','Couleur : Noir RAL 9005'],
   null, null, null, null),

  ('clips-go-arret-100mm',
   'Clips & Go 2.0 - Arrêt 100mm Noir RAL 9005',
   'Accessoire Clips & Go 2.0 - Arrêt 100mm. Noir RAL 9005.',
   '11111111-1111-1111-1111-000000000008', 'CLAERHOUT', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['accessoire','clips-go'], null, null, null, null, null),

  ('clips-go-arret-70mm',
   'Clips & Go 2.0 - Arrêt 70mm Noir RAL 9005',
   'Accessoire Clips & Go 2.0 - Arrêt 70mm. Noir RAL 9005.',
   '11111111-1111-1111-1111-000000000008', 'CLAERHOUT', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['accessoire','clips-go'], null, null, null, null, null),

  ('clips-go-coin-interieur-100mm',
   'Clips & Go 2.0 - Coin intérieur 100mm 30×30 Noir RAL 9005',
   'Accessoire Clips & Go 2.0 - Coin intérieur COININT 100mm 30×30. Noir RAL 9005.',
   '11111111-1111-1111-1111-000000000008', 'CLAERHOUT', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['accessoire','clips-go','coin'], null, null, null, null, null),

  ('clips-go-coin-exterieur-100mm',
   'Clips & Go 2.0 - Coin extérieur 100mm 30×30 Noir RAL 9005',
   'Accessoire Clips & Go 2.0 - Coin extérieur COINEXT 100mm 30×30. Noir RAL 9005.',
   '11111111-1111-1111-1111-000000000008', 'CLAERHOUT', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['accessoire','clips-go','coin'], null, null, null, null, null),

  ('clips-go-raccord-100mm',
   'Clips & Go 2.0 - Raccord 100mm Noir RAL 9005',
   'Accessoire Clips & Go 2.0 - Raccord STRUC 100mm. Noir RAL 9005.',
   '11111111-1111-1111-1111-000000000008', 'CLAERHOUT', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['accessoire','clips-go'], null, null, null, null, null),

  ('clips-go-profil-base-3m',
   'Clips & Go 2.0 - Profil de base 3m BRUT',
   'Accessoire Clips & Go 2.0 - Profilé de base 3m. Couleur : BRUT (non laqué).',
   '11111111-1111-1111-1111-000000000008', 'CLAERHOUT', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['accessoire','clips-go','profil'], null, null, null, null, null),

  ('clips-go-couvre-joint-100mm',
   'Clips & Go 2.0 - Couvre-joint 100mm Noir RAL 9005',
   'Accessoire Clips & Go 2.0 - Couvre-joint 100mm. Noir RAL 9005.',
   '11111111-1111-1111-1111-000000000008', 'CLAERHOUT', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['accessoire','clips-go'], null, null, null, null, null),

  ('clips-go-easy-corner',
   'Clips & Go 2.0 - Easy Corner BRUT',
   'Accessoire Clips & Go 2.0 - Easy Corner coin. Couleur : BRUT.',
   '11111111-1111-1111-1111-000000000008', 'CLAERHOUT', 0, 'EUR', null, 0, true, '[]'::jsonb,
   array['accessoire','clips-go','corner'], null, null, null, null, null)

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
  -- NB: images intentionally NOT updated on conflict (preserve disk/admin gallery).

commit;

-- ===========================================================================
-- Verification (run after COMMIT; these are read-only SELECTs)
-- ===========================================================================
select count(*) as categories_count from public.categories;                  -- expect 11
select count(*) as products_count   from public.products;                    -- expect 37
select count(*) as orphan_products  from public.products where category_id is null;  -- expect 0

-- per-category breakdown (expect: isolation 4, visserie 9, colles-mastics 11,
-- toitures-plates 3, facade 10, the other 6 = 0/absent)
select c.slug, count(p.id) as products
from public.categories c
left join public.products p on p.category_id = c.id
group by c.slug
order by products desc, c.slug;
