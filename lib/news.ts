export interface NewsPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  featured?: boolean;
  content?: string[]; // Array of paragraphs
}

export const categories = ["Tous", "Produits", "Formations", "Actualités"] as const;

export const newsPosts: NewsPost[] = [
  {
    slug: "panneaux-isolants-haute-performance",
    title: "Nouvelle gamme de panneaux isolants haute performance",
    excerpt:
      "Découvrez notre nouvelle gamme de panneaux isolants PIR offrant une résistance thermique exceptionnelle et une performance énergétique optimale pour vos projets.",
    date: "2025-01-15",
    category: "Produits",
    featured: true,
    content: [
      "Comarden est fier d'annoncer l'arrivée de sa nouvelle gamme de panneaux isolants haute performance. Ces panneaux PIR (Polyisocyanurate) offrent une résistance thermique exceptionnelle avec des valeurs R jusqu'à 50% supérieures aux isolants traditionnels.",
      "Développés pour répondre aux nouvelles normes énergétiques en vigueur, ces panneaux permettent d'atteindre une performance thermique optimale avec des épaisseurs réduites, maximisant ainsi l'espace habitable.",
      "Disponibles en différentes épaisseurs (40mm à 160mm) et en formats sur mesure, nos panneaux PIR s'adaptent à tous vos projets de toiture plate, isolation de murs et planchers. La pose est simplifiée grâce à un système de languette et rainure qui assure une étanchéité à l'air parfaite.",
      "Nos experts techniques sont à votre disposition pour vous conseiller sur le choix de l'épaisseur adaptée à votre projet et vous accompagner dans la mise en œuvre. N'hésitez pas à nous contacter pour un devis personnalisé.",
    ],
  },
  {
    slug: "formation-couverture-zinc",
    title: "Formation couverture zinc : prochaines dates",
    excerpt:
      "Inscrivez-vous à nos formations pratiques dispensées par des couvreurs expérimentés. Formation Constructiv reconnue avec ateliers pratiques.",
    date: "2025-01-08",
    category: "Formations",
    featured: true,
    content: [
      "Comarden organise plusieurs sessions de formation spécialisées sur la couverture zinc, ouvertes à tous les professionnels du bâtiment. Ces formations sont reconnues par Constructiv et permettent de bénéficier d'aides financières pour les entreprises.",
      "Animées par des couvreurs expérimentés avec plus de 20 ans d'expérience, nos sessions couvrent les techniques de façonnage, de pose, de raccordements et de finitions. La formation allie théorie et pratique avec des ateliers sur maquette grandeur nature.",
      "Au programme : découverte des différents types de zinc (titane, prépatiné), techniques de pliage et façonnage, pose sur support bois ou bac acier, gestion des raccordements complexes, entretien et maintenance. Chaque participant repart avec un certificat de formation et des supports de cours détaillés.",
      "Les prochaines sessions se déroulent à Bertrix les 15 et 22 mars 2025. Places limitées à 12 participants pour garantir un suivi personnalisé. Inscription obligatoire au moins 15 jours avant la date.",
    ],
  },
  {
    slug: "nouvelle-flotte-livraison",
    title: "Comarden renforce sa flotte de livraison",
    excerpt:
      "Deux nouveaux camions-grues rejoignent notre flotte pour une meilleure couverture de la Wallonie et des délais de livraison optimisés.",
    date: "2024-12-28",
    category: "Actualités",
    featured: true,
    content: [
      "Comarden poursuit son développement avec l'acquisition de deux nouveaux camions-grues, renforçant ainsi sa capacité de livraison et de manutention sur toute la Wallonie et Bruxelles.",
      "Ces véhicules de dernière génération, équipés de grues télescopiques d'une capacité de levage jusqu'à 8 tonnes, permettent une manipulation sécurisée et précise de vos matériaux directement sur chantier. Grâce à leurs dimensions optimisées, ils peuvent accéder aux sites les plus exigus.",
      "Cette extension de flotte nous permet de réduire significativement nos délais de livraison. Vous pouvez désormais compter sur des livraisons sous 24-48h sur la plupart de nos références, avec une flexibilité accrue pour vos urgences chantier.",
      "Nos chauffeurs-gruteurs, tous formés et certifiés, maîtrisent parfaitement les techniques de manutention pour tous types de matériaux : panneaux sandwich, tôles profilées, charpente bois, isolants. La sécurité et la protection de vos matériaux restent nos priorités absolues.",
    ],
  },
  {
    slug: "nouveaux-produits-isolation",
    title: "Nouveaux produits d'isolation écologique",
    excerpt:
      "Découvrez notre sélection de matériaux d'isolation respectueux de l'environnement : laine de roche, laine de verre et matériaux biosourcés.",
    date: "2024-12-15",
    category: "Produits",
    content: [
      "Comarden étoffe sa gamme avec une sélection de matériaux d'isolation écologiques, répondant aux attentes croissantes des professionnels pour des solutions durables et performantes.",
      "Notre nouvelle gamme comprend des isolants en laine de roche d'origine naturelle, des laines de verre à forte teneur en matières recyclées, ainsi que des matériaux biosourcés innovants comme la fibre de bois et le liège expansé. Tous ces produits sont certifiés et respectent les normes les plus strictes en matière d'émissions et de performances thermiques.",
      "Ces isolants écologiques offrent des performances comparables, voire supérieures, aux isolants traditionnels tout en ayant un impact environnemental réduit. Ils contribuent à améliorer la qualité de l'air intérieur et offrent une excellente régulation hygrométrique.",
      "Disponibles en vrac, en panneaux ou en rouleaux selon vos besoins, ces produits s'adaptent à tous types d'applications : isolation de toitures, murs, planchers, combles. Nos experts vous conseillent sur le choix optimal en fonction de votre projet.",
    ],
  },
  {
    slug: "conges-ete-2024",
    title: "Congé d'été 2024 - Horaires d'ouverture",
    excerpt:
      "Comarden sera fermé du 29 juillet au 5 août 2024 inclus. Nos équipes seront de retour le 6 août pour répondre à vos besoins. Pensez à planifier vos commandes à l'avance.",
    date: "2024-07-20",
    category: "Actualités",
    content: [
      "Comarden ferme ses deux sites (Bertrix et Naninne) pour la période estivale du lundi 29 juillet au lundi 5 août 2024 inclus. Nos équipes seront de retour le mardi 6 août pour reprendre le service normal.",
      "Afin d'éviter toute interruption sur vos chantiers, nous vous recommandons vivement de planifier vos commandes à l'avance. Les commandes passées avant le 24 juillet à 12h00 pourront être livrées avant la fermeture. Au-delà de cette date, les livraisons reprendront à partir du 6 août selon nos délais habituels.",
      "Pour les urgences pendant cette période, notre service client reste joignable par email (info@comarden.be). Les messages seront traités en priorité dès la reprise. Nous remercions par avance tous nos clients pour leur compréhension.",
      "Nous profitons de cette période pour réaliser des travaux d'entretien et d'amélioration de nos installations afin de mieux vous servir à la rentrée. Toute l'équipe Comarden vous souhaite un excellent été !",
    ],
  },
  {
    slug: "formation-terreal-mars",
    title: "Formation TERREAL : session de mars 2025",
    excerpt:
      "Formation complète sur les tuiles en terre cuite TERREAL : pose, techniques et bonnes pratiques. Session pratique avec démonstration sur chantier.",
    date: "2024-12-10",
    category: "Formations",
    content: [
      "En partenariat avec TERREAL, leader européen des tuiles en terre cuite, Comarden organise une formation complète sur les techniques de pose et les spécificités de cette gamme de produits. Cette formation est accréditée Constructiv.",
      "La session du 15 mars 2025 se déroule sur une journée complète (8h-17h) à notre site de Bertrix. Elle est animée par un expert TERREAL et un couvreur expérimenté de notre équipe. Au programme : présentation de la gamme TERREAL, caractéristiques techniques et normatives, techniques de pose selon les différents modèles, gestion des raccordements et finitions, entretien et garanties.",
      "L'après-midi est consacré à la pratique avec démonstration sur maquette et exercices de pose. Chaque participant aura l'occasion de manipuler les différents types de tuiles et d'appréhender les techniques spécifiques. Les supports de cours et certificats de participation sont fournis.",
      "Nombre de places limité à 12 participants pour garantir un suivi optimal. Tarif : 150€ HT par personne (prise en charge possible par les fonds sectoriels). Inscription obligatoire avant le 1er mars 2025. Contactez notre service formations pour réserver votre place.",
    ],
  },
  {
    slug: "nouveau-showroom-naninne",
    title: "Nouveau showroom à Naninne",
    excerpt:
      "Visitez notre nouveau showroom à Naninne pour découvrir nos gammes de produits et bénéficier de conseils d'experts sur vos projets.",
    date: "2024-11-25",
    category: "Actualités",
    content: [
      "Comarden inaugure son nouveau showroom à Naninne, offrant un espace moderne et convivial de 200m² dédié à la présentation de nos gammes de produits. Cet espace vous permet de découvrir, toucher et comparer les différents matériaux dans des conditions proches de la réalité.",
      "Le showroom présente nos principales gammes : tuiles en terre cuite (TERREAL, Koramic), ardoises naturelles, tôles métalliques, panneaux sandwich, systèmes d'isolation et accessoires. Chaque famille de produits est présentée avec ses caractéristiques techniques, ses avantages et des exemples de mise en œuvre.",
      "Nos experts techniques sont présents pour vous accompagner dans le choix de vos matériaux, vous conseiller sur les performances, les normes et vous aider à optimiser vos projets. Le showroom est accessible du lundi au vendredi de 7h30 à 17h00, et le samedi de 8h00 à 12h00.",
      "Des visites guidées sur rendez-vous sont possibles pour les groupes (entreprises, écoles, professionnels). Contactez notre site de Naninne pour organiser votre visite. Nous serons ravis de vous faire découvrir nos produits et notre expertise.",
    ],
  },
  {
    slug: "tuiles-terreal-collection",
    title: "Nouvelle collection TERREAL 2025",
    excerpt:
      "Découvrez la nouvelle collection de tuiles TERREAL 2025 avec des finitions innovantes et des garanties étendues. Disponible dans nos deux dépôts.",
    date: "2024-11-10",
    category: "Produits",
    content: [
      "TERREAL dévoile sa nouvelle collection 2025 de tuiles en terre cuite, marquant une nouvelle étape dans l'innovation technique et esthétique. Comarden est fier d'être partenaire privilégié pour distribuer cette gamme exclusive en Wallonie.",
      "La collection 2025 se distingue par de nouvelles finitions de surface, des formats optimisés pour une pose plus rapide, et une palette de couleurs enrichie avec 8 nouvelles teintes. Les performances techniques sont également améliorées avec une meilleure résistance au gel et une étanchéité renforcée.",
      "Particularité notable : la garantie constructiv est étendue à 40 ans sur l'ensemble de la gamme (contre 30 ans auparavant), témoignant de la confiance du fabricant en la durabilité de ses produits. Cette garantie couvre les défauts de fabrication, la tenue des couleurs et la résistance aux intempéries.",
      "Les tuiles sont disponibles dès maintenant dans nos deux dépôts (Bertrix et Naninne) avec des stocks importants pour garantir une disponibilité immédiate. Nos équipes sont formées aux spécificités de pose de cette nouvelle collection. N'hésitez pas à nous contacter pour découvrir les échantillons et obtenir un devis personnalisé.",
    ],
  },
  {
    slug: "formation-etancheite-epdm",
    title: "Formation étanchéité EPDM - Nouvelles dates",
    excerpt:
      "Formation spécialisée sur les membranes EPDM : installation, soudure, raccordements et maintenance. Formation pratique avec matériaux réels.",
    date: "2024-10-30",
    category: "Formations",
    content: [
      "Comarden organise de nouvelles sessions de formation spécialisées sur l'étanchéité avec membranes EPDM, répondant à une forte demande des professionnels. Ces formations sont reconnues par Constructiv et permettent d'obtenir une certification.",
      "La formation d'une journée (8h-17h) couvre l'ensemble des aspects techniques de l'étanchéité EPDM : présentation des différents types de membranes et leurs caractéristiques, préparation des supports, techniques de pose (collage, fixation mécanique), soudure à l'air chaud et raccordements complexes, traitement des points singuliers (relevés, sorties, joints), maintenance et réparation.",
      "L'accent est mis sur la pratique avec des exercices réels sur maquette : chaque participant réalise des soudures, pose des membranes sur différents supports, et traite des détails complexes. Les techniques de contrôle qualité et de détection de fuites sont également abordées.",
      "Prochaines sessions : 20 février et 10 avril 2025 à Bertrix. Tarif : 180€ HT (prise en charge possible). Nombre de places limité à 8 participants pour garantir une formation personnalisée. Inscription obligatoire au moins 20 jours avant. Contactez notre service formations pour plus d'informations.",
    ],
  },
];

export function getNewsBySlug(slug: string): NewsPost | undefined {
  return newsPosts.find((post) => post.slug === slug);
}

export function getFeaturedNews(limit: number = 3): NewsPost[] {
  return newsPosts.filter((post) => post.featured).slice(0, limit);
}

export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3
): NewsPost[] {
  const currentPost = getNewsBySlug(currentSlug);
  if (!currentPost) return [];

  return newsPosts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => {
      // Prefer same category
      if (a.category === currentPost.category && b.category !== currentPost.category) return -1;
      if (b.category === currentPost.category && a.category !== currentPost.category) return 1;
      // Then by date (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, limit);
}
