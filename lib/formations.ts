import { Calendar, Clock, Users, Award, type LucideIcon } from "lucide-react";

// Legacy training interface (keeping for backwards compatibility)
export interface Training {
  id: string;
  title: string;
  description: string;
  date?: string;
  duration: string;
  participants: string;
  instructor?: string;
  location?: string;
  accredited?: boolean;
}

export const formationsConfig = {
  constructivAccredited: true,
  constructivDescription:
    "Formations reconnues par Constructiv, organisme paritaire pour la formation dans les secteurs de la construction.",
};

export const trainings: Training[] = [
  {
    id: "terreal",
    title: "Formation TERREAL",
    description:
      "Formation complète sur les tuiles en terre cuite TERREAL : pose, techniques, bonnes pratiques et normes. Formation pratique et théorique dispensée par des experts certifiés.",
    date: "15 mars 2025",
    duration: "1 jour",
    participants: "12 places",
    instructor: "Expert certifié TERREAL",
    location: "Bertrix",
    accredited: true,
  },
  {
    id: "zinc",
    title: "Formation couverture zinc",
    description:
      "Formation pratique sur les techniques de couverture en zinc : façonnage, pose, étanchéité. Formation dispensée par des couvreurs expérimentés avec démonstration pratique.",
    date: "28 mars 2025",
    duration: "2 jours",
    participants: "12 places",
    instructor: "Maître-couvreur certifié",
    location: "Bertrix",
    accredited: true,
  },
  {
    id: "isolation",
    title: "Isolation thermique et acoustique",
    description:
      "Formation sur les dernières techniques d'isolation thermique et acoustique, nouveaux matériaux et réglementation. Ateliers pratiques et études de cas.",
    date: "15 avril 2025",
    duration: "1 jour",
    participants: "15 places",
    instructor: "Conseiller technique",
    location: "Naninne",
    accredited: true,
  },
  {
    id: "charpente",
    title: "Charpente bois moderne",
    description:
      "Formation approfondie sur les techniques de charpente bois : conception, montage, traitement et bonnes pratiques. Visite de chantier incluse.",
    date: "À venir",
    duration: "2 jours",
    participants: "10 places",
    instructor: "Charpentier professionnel",
    location: "Bertrix",
    accredited: true,
  },
  {
    id: "epdm",
    title: "Étanchéité EPDM",
    description:
      "Formation spécialisée sur les membranes EPDM : installation, soudure, raccordements et maintenance. Formation pratique avec matériaux réels.",
    date: "À venir",
    duration: "1 jour",
    participants: "10 places",
    instructor: "Expert étanchéité",
    location: "Naninne",
    accredited: true,
  },
];

// New Day Builder types and data
export type FormationModuleDuration = 2 | 4 | 7;

export interface FormationModule {
  id: string;
  title: string;
  durationHours: FormationModuleDuration;
  description: string;
  tag?: string;
  brandName?: string;
  brandLogo?: string | null;
}

export const FORMATION_MODULES: FormationModule[] = [
  {
    id: "panneaux-solaires",
    title: "Panneaux solaires",
    durationHours: 2,
    description: "Installation et intégration des panneaux solaires photovoltaïques en toiture. Techniques de pose, raccordements et normes en vigueur.",
    tag: "Énergie",
  },
  {
    id: "isolation-normes",
    title: "Isolation & normes",
    durationHours: 2,
    description: "Maîtrise des normes d'isolation thermique et acoustique. Choix des matériaux, techniques de pose et conformité réglementaire.",
    tag: "Technique",
  },
  {
    id: "epdm-etancheite",
    title: "EPDM & étanchéité",
    durationHours: 4,
    description: "Formation complète sur les membranes EPDM : installation professionnelle, techniques de soudure, raccordements et maintenance préventive.",
    tag: "Étanchéité",
    brandName: "ELEVATE",
    brandLogo: "/images/logos/elevate-logo.png",
  },
  {
    id: "toiture-zinc",
    title: "Toiture zinc (pliage & détails)",
    durationHours: 4,
    description: "Techniques avancées de façonnage et pose de couverture zinc. Maîtrise des pliages, raccords complexes et détails d'exécution.",
    tag: "Métallique",
    brandName: "VM ZINC",
    brandLogo: null,
  },
  {
    id: "pose-tuiles-ardoises",
    title: "Pose tuiles & ardoises (journée complète)",
    durationHours: 7,
    description: "Formation intensive sur la pose professionnelle de tuiles et ardoises. Techniques traditionnelles et modernes, normes de mise en œuvre et bonnes pratiques.",
    tag: "Traditionnel",
  },
  {
    id: "ventilation-toiture",
    title: "Ventilation de toiture",
    durationHours: 2,
    description: "Systèmes de ventilation des toitures, évacuation de l'humidité et optimisation de la performance énergétique. Normes et solutions techniques.",
    tag: "Technique",
  },
  {
    id: "façonnage-metal",
    title: "Façonnage métallique avancé",
    durationHours: 4,
    description: "Techniques avancées de façonnage des tôles métalliques : découpes, pliages, assemblages et finitions professionnelles pour toiture et façade.",
    tag: "Métallique",
  },
  {
    id: "atg-ardoises",
    title: "ATG Ardoises : Comprendre pour mieux vendre et intervenir",
    durationHours: 4,
    description: "Défendre vos projets lors de la vente en utilisant les ATG / Assurer un suivi après-vente / Renforcer votre crédibilité technique.",
    tag: "Formations",
    brandName: "CAMPO & BANIA",
    brandLogo: null,
  },
  {
    id: "vertuoza",
    title: "VERTUOZA — Logiciel de gestion chantier",
    durationHours: 7,
    description: "Maîtrisez VERTUOZA pour vos devis, facturations, suivis de chantier et planning. Un outil complet pour la gestion de votre entreprise.",
    tag: "Formations",
    brandName: "VERTUOZA",
    brandLogo: null,
  },
  {
    id: "strato-grip",
    title: "STRATO GRIP — Formation nouvelles colles",
    durationHours: 4,
    description: "Découvrez les nouvelles colles STRATO GRIP : application, compatibilités et bonnes pratiques pour des chantiers réussis.",
    tag: "Formations",
    brandName: "STRATO GRIP",
    brandLogo: "/images/logos/strato-grip-logo.png",
  },
  {
    id: "tyvek",
    title: "TYVEK — Présentation gamme et conseils pratiques",
    durationHours: 4,
    description: "Tour d\u2019horizon de la gamme TYVEK : membranes, pare-vapeur et solutions d\u2019étanchéité à l\u2019air. Conseils pratiques de mise en œuvre.",
    tag: "Formations",
    brandName: "TYVEK",
    brandLogo: null,
  },
  {
    id: "toitures-vegetales",
    title: "Formation Toitures végétales",
    durationHours: 4,
    description: "Découvrez les solutions de toitures végétalisées Floratoit : systèmes Hydropack® et IDMAT®, techniques de pose, réglementation belge et avantages écologiques. Formation pratique avec les experts Floratoit.",
    tag: "Végétal",
    brandName: "FLORATOIT",
    brandLogo: null,
  },
];
