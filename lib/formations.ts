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
  },
  {
    id: "toiture-zinc",
    title: "Toiture zinc (pliage & détails)",
    durationHours: 4,
    description: "Techniques avancées de façonnage et pose de couverture zinc. Maîtrise des pliages, raccords complexes et détails d'exécution.",
    tag: "Métallique",
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
];
