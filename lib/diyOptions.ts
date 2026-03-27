import { 
  Home, 
  Building2, 
  Layers, 
  Droplets, 
  Square, 
  Sprout, 
  Triangle,
  Package,
  LucideIcon
} from "lucide-react";

export type ProjectType = {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
};

export type NeedOption = {
  id: string;
  label: string;
  description?: string;
  applicableTo: string[]; // project type IDs
  infoTooltip?: string;
};

export type DiyRequest = {
  projectTypes: string[];
  needs: string[];
  details: {
    areaM2: number;
    urgency: "Cette semaine" | "Ce mois-ci" | "Flexible";
    location: string;
    clientName?: string;
    clientEmail?: string;
    clientPhone?: string;
    clientAddress?: string;
    notes?: string;
  };
  pro: {
    requested: boolean;
    interventionType?: "Pose complète" | "Aide partielle" | "Visite & conseils sur place";
    desiredDate?: string;
    budgetRange?: "€" | "€€" | "€€€" | "Je ne sais pas";
  };
  meta: {
    createdAt: string;
    source: "do-it-yourself";
  };
};

export const LOCATION_OPTIONS = [
  "Liège",
  "Namur",
  "Brabant Wallon",
  "Bruxelles",
  "Luxembourg",
  "Autre",
] as const;

export function getDepotForLocation(location: string): { name: string; phone: string; phoneDisplay: string } {
  switch (location) {
    case "Liège":
    case "Luxembourg":
      return { name: "Bertrix", phone: "+3261412706", phoneDisplay: "061 41 27 06" };
    case "Namur":
    case "Brabant Wallon":
    case "Bruxelles":
    default:
      return { name: "Naninne", phone: "+3281401133", phoneDisplay: "081 40 11 33" };
  }
}

export const PROJECT_TYPES: ProjectType[] = [
  {
    id: "toiture-inclinee",
    label: "Toiture inclinée",
    icon: Triangle,
    description: "Tuiles, ardoises, accessoires",
  },
  {
    id: "toiture-plate",
    label: "Toiture plate",
    icon: Home,
    description: "Étanchéité, membranes, isolants",
  },
  {
    id: "toiture-vegetale",
    label: "Toiture végétale",
    icon: Sprout,
    description: "Systèmes verts, drainage",
  },
  {
    id: "facade-bardage",
    label: "Façade / Bardage",
    icon: Building2,
    description: "Panneaux, finitions, accessoires",
  },
  {
    id: "isolation",
    label: "Isolation",
    icon: Layers,
    description: "Toiture/façade, ITE",
  },
  {
    id: "gouttieres",
    label: "Gouttières / Zinguerie",
    icon: Droplets,
    description: "Évacuation, accessoires",
  },
  {
    id: "fenetres-toit",
    label: "Fenêtres de toit",
    icon: Square,
    description: "Pose, étanchéité",
  },
  {
    id: "autre",
    label: "Autre",
    icon: Package,
    description: "Projet personnalisé",
  },
];

export const NEED_OPTIONS: NeedOption[] = [
  {
    id: "materiaux-seulement",
    label: "Matériaux uniquement",
    description: "Achat de produits sans conseil",
    applicableTo: ["toiture-inclinee", "toiture-plate", "toiture-vegetale", "facade-bardage", "isolation", "gouttieres", "fenetres-toit", "autre"],
  },
  {
    id: "conseil-liste",
    label: "Conseil + liste d'achat",
    description: "Accompagnement personnalisé",
    applicableTo: ["toiture-inclinee", "toiture-plate", "toiture-vegetale", "facade-bardage", "isolation", "gouttieres", "fenetres-toit", "autre"],
    infoTooltip: "Nos experts vous guident dans vos choix",
  },
  {
    id: "decoupe-faconnage",
    label: "Découpe / façonnage sur mesure",
    description: "Service de découpe professionnelle",
    applicableTo: ["toiture-inclinee", "toiture-plate", "facade-bardage", "isolation", "gouttieres"],
    infoTooltip: "Découpe précise selon vos mesures",
  },
  {
    id: "livraison-camion",
    label: "Livraison camion-grue",
    description: "Livraison avec engin de levage",
    applicableTo: ["toiture-inclinee", "toiture-plate", "facade-bardage", "isolation"],
    infoTooltip: "Pour les gros volumes et accès difficiles",
  },
  {
    id: "etancheite-membranes",
    label: "Étanchéité / membranes",
    description: "Systèmes d'étanchéité complets",
    applicableTo: ["toiture-plate", "toiture-vegetale"],
  },
  {
    id: "accessoires-finitions",
    label: "Accessoires & finitions",
    description: "Tous les détails pour finaliser",
    applicableTo: ["toiture-inclinee", "toiture-plate", "facade-bardage", "gouttieres"],
  },
  {
    id: "diagnostic-recommandations",
    label: "Diagnostic / recommandations",
    description: "Analyse technique de votre projet",
    applicableTo: ["toiture-inclinee", "toiture-plate", "facade-bardage", "isolation", "autre"],
    infoTooltip: "Visite sur site possible",
  },
];

export const URGENCY_OPTIONS: ("Cette semaine" | "Ce mois-ci" | "Flexible")[] = [
  "Cette semaine",
  "Ce mois-ci",
  "Flexible",
];

export const INTERVENTION_TYPES: ("Pose complète" | "Aide partielle" | "Visite & conseils sur place")[] = [
  "Pose complète",
  "Aide partielle",
  "Visite & conseils sur place",
];

export const BUDGET_RANGES: ("€" | "€€" | "€€€" | "Je ne sais pas")[] = [
  "€",
  "€€",
  "€€€",
  "Je ne sais pas",
];
