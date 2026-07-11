-- ============================================================================
-- Comarden - Migration 014: AMIANTE products (7)
-- ----------------------------------------------------------------------------
-- NOTE: the brief asked for "007_amiante_products.sql" but 007 is already taken
-- (Tyvek). Next free number: 014.
--
-- SAFETY-CRITICAL DOMAIN: asbestos-handling products. All content transcribed
-- verbatim from the client PPTX (AMIANTE.pptx). Every row has a populated
-- `warning`. The full "Points d'attention" and "Utilisation" text lives on the
-- custom product pages (app/shop/produit/<slug>).
--
-- Products (brand = 'AMIANTE'):
--   1. AMISEAL-FIX 11 (fixateur)           AMISEAL-FIX-11
--   2. Demi-masque BLS 4000 NEXT           BLS-4000-NEXT
--   3. Filtres BLS 202 P3 R (paire)        BLS-202-P3R
--   4. Couvercle filtre BLS 200 P3 (paire) BLS-200-P3-COVER
--   5. Combinaison SMS Cat III Type 5/6    SMS-CAT3-TYPE56
--   6. Big Bag OK 90x90x110 SWL 1500 kg    BIGBAG-OK-90-1500
--   7. Gants OXXA Nitri-Tech 14-690 t10    OXXA-14-690-T10
--
-- ⚠️ CATEGORY: all 7 parked in colles-mastics (010) TEMPORARILY. A dedicated
--    "securite-amiante" / "securite-epi" category should be created in a future
--    migration and these rows re-categorized in one shot.
--
-- ⚠️ DEFERRED (no full description in the PPTX - add once content is provided):
--    - Fixateur Amiante Coloré
--    - Masques jetables
--    - Pulvérisateur / Arroseur Pression 5 L (slide 11: title only)
--
-- Titles use plain hyphens (site rule: no em dashes anywhere).
-- price_cents 0 (lead/quote), EUR, stock 0, is_active true, images '[]'.
-- Idempotent: ON CONFLICT (slug) DO UPDATE (images preserved). Dollar-quoted.
-- ============================================================================

begin;

insert into public.products
  (slug, title, description, category_id, brand, price_cents, currency, sku, stock, is_active, images, tags, specs, avantages, variants, lien_produit, warning)
values
  -- 1. AMISEAL-FIX 11
  (
    $q$amiseal-fix-11$q$,
    $q$AMISEAL-FIX 11 - Fixateur pour fibres d'amiante$q$,
    $q$AMISEAL-FIX 11 est une émulsion fixatrice à haut pouvoir de pénétration, spécialement conçue pour fixer, stabiliser et sceller les fibres d'amiante présentes en surface. Grâce à sa formulation à base de micro-polymères et d'additifs spécifiques, le produit pénètre en profondeur dans les supports contenant de l'amiante afin de limiter le risque de libération de fibres lors des interventions, manipulations ou travaux préparatoires. AMISEAL-FIX 11 est particulièrement adapté aux professionnels de la toiture, de la rénovation, du désamiantage et de la maintenance de bâtiments. Il peut être utilisé sur différents supports amiantés tels que les plaques ondulées, matériaux d'isolation, enduits, revêtements, peintures, cimentages et autres matériaux susceptibles de contenir de l'amiante.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$AMIANTE$q$, 0, $q$EUR$q$, $q$AMISEAL-FIX-11$q$, 0, true, '[]'::jsonb,
    array[$q$fixateur amiante$q$,$q$amiseal$q$,$q$désamiantage$q$,$q$traitement surface$q$,$q$sans solvant$q$,$q$sans cov$q$],
    array[
      $q$Formulation : émulsion à base de micro-polymères et additifs spécifiques$q$,
      $q$Sans solvants ni COV$q$,
      $q$Application : pulvérisateur basse pression, rouleau ou brosse$q$,
      $q$Consommation indicative : jusqu'à 12 m² par litre (selon porosité du support)$q$,
      $q$Température d'application : entre +5 °C et +35 °C$q$,
      $q$Température ambiante après application : positive pendant au moins 24 heures$q$,
      $q$Temps de séchage : 1 à 12 heures (selon consommation, température, humidité)$q$,
      $q$Nettoyage du matériel : à l'eau après application$q$,
      $q$Utilisation : intérieur et extérieur$q$,
      $q$Durée de conservation : 12 mois (emballage d'origine non ouvert)$q$,
      $q$Stockage : +5 °C à +20 °C, endroit sec et ventilé, à l'abri du soleil$q$
    ],
    array[
      $q$Fixe les fibres d'amiante mobiles en surface$q$,
      $q$Imprègne les supports en profondeur$q$,
      $q$Renforce et consolide les matériaux contenant de l'amiante$q$,
      $q$Application simple, rapide et efficace$q$,
      $q$Convient pour usage intérieur et extérieur$q$,
      $q$Nettoyage du matériel à l'eau$q$,
      $q$Produit sans solvants ni COV$q$
    ],
    array[
      $q$Conditionnement selon fournisseur : bidon, vaporisateur ou formats professionnels - nous consulter$q$
    ],
    null,
    $q$Le port des EPI adaptés (masque P3, combinaison, gants) est obligatoire. AMISEAL-FIX 11 ne remplace pas une analyse ou une procédure officielle de désamiantage. Respect strict de la réglementation amiante en vigueur.$q$
  ),

  -- 2. Demi-masque BLS 4000 NEXT
  (
    $q$demi-masque-bls-4000-next$q$,
    $q$Demi-masque BLS 4000 NEXT - Protection respiratoire amiante$q$,
    $q$Le masque BLS 4000 NEXT est un demi-masque respiratoire réutilisable conçu pour offrir une protection respiratoire confortable lors de travaux exposant aux poussières dangereuses, notamment les interventions sur matériaux contenant de l'amiante, à condition d'être utilisé avec des filtres adaptés de classe P3. Léger, ergonomique et disponible en plusieurs tailles, le BLS 4000 NEXT assure une bonne étanchéité au visage tout en offrant un large champ de vision. Son système de connexion à baïonnette B-Lock permet une fixation rapide et sécurisée des filtres compatibles BLS 200 / 201. Le masque est démontable facilement, ce qui simplifie le nettoyage, l'entretien et la décontamination après utilisation.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$AMIANTE$q$, 0, $q$EUR$q$, $q$BLS-4000-NEXT$q$, 0, true, '[]'::jsonb,
    array[$q$demi-masque$q$,$q$bls 4000$q$,$q$protection respiratoire$q$,$q$epi amiante$q$,$q$b-lock$q$,$q$réutilisable$q$],
    array[
      $q$Type : demi-masque respiratoire réutilisable$q$,
      $q$Système de connexion : baïonnette B-Lock$q$,
      $q$Filtres compatibles : BLS 200 / 201$q$,
      $q$Tailles disponibles : plusieurs (à préciser)$q$,
      $q$Démontable : oui - nettoyage et décontamination facilités$q$,
      $q$Poids : léger et ergonomique$q$,
      $q$Champ de vision : large$q$
    ],
    array[
      $q$Confortable pour usage prolongé$q$,
      $q$Fixation rapide et sécurisée des filtres (B-Lock)$q$,
      $q$Démontable pour nettoyage facile$q$,
      $q$Bonne étanchéité au visage$q$,
      $q$Large champ de vision$q$,
      $q$Compatible filtres BLS 200/201$q$
    ],
    '{}'::text[],
    null,
    $q$Le masque seul NE PROTÈGE PAS contre les fibres d'amiante. Il DOIT être équipé de filtres P3 adaptés. Vérifier étanchéité avant chaque intervention. Respecter les procédures légales pour travaux amiante.$q$
  ),

  -- 3. Filtres BLS 202 P3 R (paire)
  (
    $q$filtres-bls-202-p3r$q$,
    $q$Filtres BLS 202 P3 R - Classe P3 pour amiante (paire)$q$,
    $q$Le filtre BLS 202 P3 R est un filtre à particules haute performance conçu pour la protection respiratoire contre les poussières fines, fibres, fumées, brouillards et particules toxiques. Utilisé avec un masque compatible BLS 4000 NEXT ou BLS 5000 à connexion baïonnette B-Lock, il convient aux interventions professionnelles sur matériaux contenant de l'amiante. Grâce à sa classe de filtration P3 R, le filtre BLS 202 offre une protection adaptée aux travaux de rénovation, toiture, maintenance, désamiantage et manipulation de matériaux susceptibles de libérer des fibres dangereuses. Sa connexion baïonnette permet une fixation rapide, sécurisée et intuitive sur le masque.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$AMIANTE$q$, 0, $q$EUR$q$, $q$BLS-202-P3R$q$, 0, true, '[]'::jsonb,
    array[$q$filtre p3$q$,$q$bls 202$q$,$q$amiante$q$,$q$protection respiratoire$q$,$q$b-lock$q$,$q$réutilisable$q$],
    array[
      $q$Classe de filtration : P3 R (réutilisable)$q$,
      $q$Application : particules fines, fibres, fumées, brouillards, particules toxiques$q$,
      $q$Système de connexion : baïonnette B-Lock$q$,
      $q$Masques compatibles : BLS 4000 NEXT, BLS 5000$q$,
      $q$Conditionnement : paire (2 filtres)$q$,
      $q$Utilisation : par paire sur masque compatible$q$
    ],
    array[
      $q$Classe P3 R adaptée à l'amiante$q$,
      $q$Filtration haute performance (fibres, poussières, particules toxiques)$q$,
      $q$Fixation rapide et sécurisée (B-Lock)$q$,
      $q$Compatible masques BLS 4000 NEXT et BLS 5000$q$,
      $q$Réutilisable selon conditions d'utilisation$q$
    ],
    '{}'::text[],
    null,
    $q$TOUJOURS utiliser par paire avec un masque compatible BLS 4000 NEXT ou BLS 5000. Vérifier l'étanchéité. Ne pas utiliser si filtre endommagé, saturé ou humide. Remplacer selon durée d'exposition et recommandations fabricant.$q$
  ),

  -- 4. Couvercle filtre BLS série 200 P3 (paire)
  (
    $q$couvercle-filtre-bls-200-p3$q$,
    $q$Couvercle filtre BLS série 200 P3 - Accessoire préfiltre (paire)$q$,
    $q$Le couvercle filtre BLS série 200 modèle P3 est un accessoire indispensable pour maintenir et protéger le préfiltre P3 sur les filtres compatibles de la gamme BLS 200. Il permet de sécuriser l'ensemble du système de filtration et de garantir une bonne tenue du préfiltre lors des travaux exposant aux poussières fines, fibres et particules dangereuses. Utilisé avec un masque BLS compatible et des filtres adaptés, ce couvercle contribue à une protection respiratoire efficace pour les travaux de toiture, rénovation, maintenance et interventions sur matériaux contenant de l'amiante.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$AMIANTE$q$, 0, $q$EUR$q$, $q$BLS-200-P3-COVER$q$, 0, true, '[]'::jsonb,
    array[$q$couvercle filtre$q$,$q$bls 200$q$,$q$préfiltre p3$q$,$q$accessoire masque amiante$q$],
    array[
      $q$Compatibilité : filtres BLS série 200$q$,
      $q$Application : maintenir le préfiltre P3 en position$q$,
      $q$Conditionnement : paire (2 couvercles)$q$,
      $q$Utilisation : à clipser sur le filtre$q$
    ],
    array[
      $q$Protège le filtre contre salissures et projections$q$,
      $q$Maintient correctement le préfiltre P3$q$,
      $q$Complète l'équipement respiratoire BLS pour chantier amiante$q$,
      $q$Fixation simple par clipsage$q$
    ],
    '{}'::text[],
    null,
    $q$Le couvercle SEUL ne protège pas contre l'amiante. Doit être utilisé avec masque + filtres P3 adaptés. Ne pas utiliser si fissuré ou déformé. Vérifier la bonne compatibilité avec les filtres BLS série 200.$q$
  ),

  -- 5. Combinaison SMS Cat III Type 5/6
  (
    $q$combinaison-sms-cat3-type5-6$q$,
    $q$Combinaison SMS blanche Cat. III Type 5/6 - Protection amiante (jetable)$q$,
    $q$La combinaison SMS blanche Catégorie III Type 5/6 est une combinaison de protection jetable conçue pour les professionnels exposés aux poussières dangereuses, fibres et légères projections de liquides. Elle est particulièrement adaptée aux travaux de toiture, rénovation, maintenance et interventions sur matériaux susceptibles de contenir de l'amiante. Fabriquée en matière SMS respirante, elle offre un bon compromis entre protection, confort et liberté de mouvement. Sa conception jetable permet de limiter les risques de contamination croisée après intervention sur chantier amiante.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$AMIANTE$q$, 0, $q$EUR$q$, $q$SMS-CAT3-TYPE56$q$, 0, true, '[]'::jsonb,
    array[$q$combinaison jetable$q$,$q$cat 3 type 5/6$q$,$q$sms$q$,$q$epi amiante$q$,$q$salopette blanche$q$,$q$usage unique$q$],
    array[
      $q$Catégorie : III (protection contre risques mortels)$q$,
      $q$Type 5 : protection contre particules solides et poussières dangereuses$q$,
      $q$Type 6 : protection limitée contre éclaboussures légères de liquides$q$,
      $q$Matière : SMS respirante$q$,
      $q$Couleur : blanche$q$,
      $q$Usage : à usage unique / jetable$q$,
      $q$Éléments : capuche, poignets, chevilles ajustables$q$,
      $q$Fermeture : tirette$q$
    ],
    array[
      $q$Protection Cat III Type 5/6 pour chantier amiante$q$,
      $q$Matière SMS respirante - bon compromis protection/confort$q$,
      $q$Liberté de mouvement$q$,
      $q$Usage unique - limite les contaminations croisées$q$,
      $q$Ajustements capuche, poignets, chevilles$q$
    ],
    array[
      $q$Tailles disponibles : nous consulter$q$
    ],
    null,
    $q$EPI à USAGE UNIQUE. Après intervention amiante, à traiter comme déchet contaminé selon la réglementation. Ne remplace pas une procédure officielle de désamiantage. Ne pas réutiliser une combinaison contaminée, déchirée ou endommagée.$q$
  ),

  -- 6. Big Bag OK 90x90x110 SWL 1500 kg
  (
    $q$big-bag-ok-90-1500kg$q$,
    $q$Big Bag OK 90 x 90 x 110 cm avec liner - SWL 1500 kg (déchets amiante)$q$,
    $q$Le Big Bag OK 90 x 90 x 110 cm avec impression et liner intérieur est conçu pour le conditionnement, le stockage et le transport sécurisé de déchets de chantier, notamment les déchets contenant ou susceptibles de contenir de l'amiante. Avec ses dimensions de 90 x 90 x 110 cm, sa capacité d'environ 1 m³ et sa charge maximale d'utilisation SWL 1500 kg, ce big bag est adapté aux professionnels de la toiture, de la rénovation, du désamiantage et de la maintenance de bâtiments. Son liner intérieur permet de mieux contenir les poussières, fibres et particules fines lors de la manipulation des déchets.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$AMIANTE$q$, 0, $q$EUR$q$, $q$BIGBAG-OK-90-1500$q$, 0, true, '[]'::jsonb,
    array[$q$big bag$q$,$q$déchets amiante$q$,$q$conditionnement$q$,$q$liner$q$,$q$swl 1500 kg$q$,$q$amiante-ciment$q$],
    array[
      $q$Dimensions : 90 x 90 x 110 cm$q$,
      $q$Capacité : environ 1 m³$q$,
      $q$Charge maximale d'utilisation (SWL) : 1500 kg$q$,
      $q$Liner intérieur : oui (contient poussières, fibres, particules fines)$q$,
      $q$Impression : oui (marquage amiante)$q$,
      $q$Fermeture : renforcée$q$,
      $q$Manutention : par engin adapté uniquement$q$
    ],
    array[
      $q$Capacité 1 m³ / 1500 kg - adapté aux gros chantiers$q$,
      $q$Liner intérieur pour limiter la dispersion des fibres$q$,
      $q$Impression avec marquage amiante conforme$q$,
      $q$Coutures et sangles renforcées$q$,
      $q$Adapté aux plaques ondulées amiante-ciment et fragments$q$
    ],
    '{}'::text[],
    null,
    $q$Respecter SWL 1500 kg. Ne jamais traîner au sol. Déplacer uniquement avec engin adapté. Déchets amiantés à confier à une filière autorisée. Étiquetage, transport et élimination selon la réglementation. Ne pas mélanger avec déchets classiques.$q$
  ),

  -- 7. Gants OXXA Nitri-Tech 14-690 t10 (144 paires/carton)
  (
    $q$gants-oxxa-nitri-tech-14-690$q$,
    $q$Gants OXXA Nitri-Tech 14-690 taille 10 - Boîte de 144 paires$q$,
    $q$Les gants OXXA Nitri-Tech 14-690 sont des gants de protection professionnels avec enduction mousse nitrile sur la paume et les doigts. Ils offrent une excellente prise en main sur supports secs, gras ou légèrement huileux, tout en conservant une bonne souplesse et une grande précision de travail. Grâce à leur support nylon/spandex 15 gauge, leur conception sans couture et leur dos respirant, ces gants assurent confort, flexibilité et dextérité lors des travaux de toiture, rénovation, maintenance, manutention et préparation de chantier. Leur couleur foncée est idéale pour les environnements salissants.$q$,
    $q$11111111-1111-1111-1111-000000000010$q$, $q$AMIANTE$q$, 0, $q$EUR$q$, $q$OXXA-14-690-T10$q$, 0, true, '[]'::jsonb,
    array[$q$gants protection$q$,$q$oxxa$q$,$q$nitri-tech$q$,$q$nitrile$q$,$q$manutention$q$,$q$epi complément amiante$q$],
    array[
      $q$Marque : OXXA$q$,
      $q$Modèle : Nitri-Tech 14-690$q$,
      $q$Taille : 10 (XL)$q$,
      $q$Support : nylon/spandex 15 gauge$q$,
      $q$Enduction : mousse nitrile sur paume et doigts$q$,
      $q$Conception : sans couture$q$,
      $q$Dos : respirant$q$,
      $q$Couleur : foncée (adaptée environnements salissants)$q$,
      $q$Conditionnement : boîte de 144 paires$q$
    ],
    array[
      $q$Excellente prise en main (sec, gras, légèrement huileux)$q$,
      $q$Bonne dextérité et précision$q$,
      $q$Sans couture - confort prolongé$q$,
      $q$Dos respirant$q$,
      $q$Boîte de 144 paires - usage professionnel intensif$q$,
      $q$Résistance mécanique légère à modérée$q$
    ],
    array[
      $q$Taille 10 (XL) - 144 paires par carton$q$
    ],
    null,
    $q$Gants de protection MÉCANIQUE - NE SONT PAS des gants spécifiques désamiantage. En présence d'amiante, à utiliser en complément des autres EPI (masque P3, combinaison, lunettes) selon procédure de décontamination. Remplacer après contamination, coupure ou usure.$q$
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

-- Verification - expect 7 AMIANTE rows, all with a warning
select slug, sku, title,
       array_length(specs,1)     as n_specs,
       array_length(avantages,1) as n_avantages,
       warning is not null        as has_warning
from public.products
where brand = 'AMIANTE'
order by sku;
