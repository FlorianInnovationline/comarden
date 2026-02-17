export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface Commitment {
  title: string;
  description: string;
  icon: string;
}

export const timelineItems: TimelineItem[] = [
  {
    year: "1977",
    title: "Fondation",
    description:
      "Création de Comarden le 13 mai 1977 à Bertrix par Serge Fernandez et Robert Golinvaux. Début de l'importation et distribution d'ardoises naturelles espagnoles sur le Benelux.",
    icon: "Building2",
  },
  {
    year: "1980s",
    title: "Expansion métallique",
    description:
      "Développement de l'activité avec les tôles profilées en acier, installation d'une cisaille et d'un atelier de façonnage. Introduction des panneaux sandwich métalliques.",
    icon: "Factory",
  },
  {
    year: "1990s",
    title: "Ouverture Naninne",
    description:
      "Olivier ouvre la succursale de Naninne dans la région de Namur, permettant une meilleure couverture de la Wallonie et un développement de l'activité toiture plate.",
    icon: "MapPin",
  },
  {
    year: "Aujourd'hui",
    title: "Expertise reconnue",
    description:
      "Deux sites opérationnels (Bertrix et Naninne), livraison en Wallonie et Bruxelles. Expertise reconnue en matériaux de construction, façonnage sur mesure et conseil technique.",
    icon: "Award",
  },
];

export const commitments: Commitment[] = [
  {
    title: "Qualité",
    description:
      "Sélection rigoureuse de nos fournisseurs et matériaux pour garantir la meilleure qualité.",
    icon: "CheckCircle",
  },
  {
    title: "Service",
    description:
      "Accompagnement personnalisé et conseils d'experts pour chaque projet.",
    icon: "Users",
  },
  {
    title: "Fiabilité",
    description:
      "Délais respectés, préparation soignée et livraison sécurisée sur vos chantiers.",
    icon: "Shield",
  },
  {
    title: "Innovation",
    description:
      "Veille constante sur les nouveaux matériaux et techniques de construction.",
    icon: "Lightbulb",
  },
];
