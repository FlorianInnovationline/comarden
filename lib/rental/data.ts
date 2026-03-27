export type PriceUnit = "jour" | "heure" | "an";

export interface RentalProduct {
  id: string;
  name: string;
  ref?: string;
  category: string;
  description: string;
  features?: string[];
  applications?: string[];
  variants?: string[];
  priceCents: number;
  priceUnit: PriceUnit;
  image?: string;
}

export const RENTAL_CATEGORIES = [
  "Tous",
  "Cloueurs à gaz",
  "Cloueurs pneumatiques",
  "Machines ardoises",
  "Fraisage aluminium",
  "Fraisage multifonction",
  "Accessoires de guidage",
  "Transport & Levage",
  "Étanchéité & collage",
  "Thermosoudage & décapage",
  "Outillage plomberie & zinguerie",
  "Découpe métallique",
] as const;

export const RENTAL_PRODUCTS: RentalProduct[] = [
  {
    id: "loc-01",
    name: "Cloueur PASLODE IM90Xi",
    ref: "LOCIM90B",
    category: "Cloueurs à gaz",
    description:
      "Cloueur autonome à gaz pour clous en bande papier inclinés à 34° de 50 à 90 mm | Bois sur bois. La cloueuse autonome la plus fiable, la plus confortable et la plus performante pour de multiples applications.",
    features: [
      "Batterie longue durée (jusqu'à 5 toits)",
      "Ergonomie parfaite",
      "Multifonctionnel",
      "Fonctionne de -15°C à +49°C",
      "Compatible gauchers et droitiers",
    ],
    applications: [
      "Liteaux",
      "Charpente bois / Ossature bois",
      "Bardage",
      "Pose de montants",
      "Voliges",
      "Toiture",
      "Lames de planchers",
      "Panneaux de couverture",
      "Coffrage",
      "Terrasse bois",
      "Emballage",
      "Panneaux",
    ],
    priceCents: 2500,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop",
  },
  {
    id: "loc-02",
    name: "Cloueur PASLODE IM65A",
    ref: "PN0120",
    category: "Cloueurs à gaz",
    description:
      "Cloueur de finition à gaz premium, avec technologie au lithium et magasin incliné.",
    features: [
      "Léger et équilibré",
      "Ligne de visée optimale",
      "Batterie lithium charge rapide (jusqu'à 10.000 fixations)",
      "Palpeur anti-marque",
      "Réglage d'enfoncement sans outil",
    ],
    applications: [
      "Encadrements décoratifs",
      "Plinthes",
      "Lambris (rainure et languette)",
      "Revêtement sous corniches",
    ],
    priceCents: 2500,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop",
  },
  {
    id: "loc-03",
    name: "Cloueur PASLODE IM350",
    ref: "PN0024",
    category: "Cloueurs à gaz",
    description:
      "Le cloueur à gaz IM350+, une technologie fiable et éprouvée depuis plus de 30 ans.",
    features: [
      "Batterie lithium charge rapide (jusqu'à 9.000 tirs)",
      "Poignée antidérapante",
      "Double crochet de ceinture",
      "Réglage facile de la profondeur",
    ],
    applications: [
      "Liteaux",
      "Assemblage de fermettes",
      "Ossature en bois",
      "Bardage",
      "Pose de montants",
      "Solives",
      "Voliges",
      "Toiture terrasse",
      "Panneaux de couverture",
      "Lames de planchers",
      "Coffrage",
      "Terrasse bois",
      "Emballage",
    ],
    priceCents: 2500,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop",
  },
  {
    id: "loc-04",
    name: "Cloueur PASLODE IM90Ci",
    category: "Cloueurs à gaz",
    description:
      "Cloueur autonome à gaz bois sur bois. Clous de 50 à 90 mm, lisses ou crantés. Système Start & Go, batterie lithium. Puissance 105 J, autonomie batterie 7500 tirs, autonomie cartouche 1250 tirs, poids 3,8 kg.",
    priceCents: 2500,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop",
  },
  {
    id: "loc-05",
    name: "Cloueur d'ancrage PASLODE PPN50Ci",
    category: "Cloueurs à gaz",
    description:
      "Cloueur d'ancrage sans fil pour la fixation de connecteurs métalliques de charpente (sabots, équerres, plaques perforées, étriers de poutre). Sans compresseur ni tuyau, technologie gaz + batterie lithium.",
    features: [
      "Autonomie 13.000 fixations (batterie) + 1.250 (gaz)",
      "Clous Hard n'Safe Ø4mm (40 et 50mm)",
      "Cadence 2-3 clous/seconde",
      "Fonctionne de -15°C à +49°C",
      "Poids 4kg",
    ],
    applications: [
      "Fixation de connecteurs métalliques de charpente",
      "Équerres",
      "Plaques perforées",
      "Sabots de solive",
      "Étriers de poutre",
      "Ancrages de chevron",
    ],
    priceCents: 2500,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop",
  },
  {
    id: "loc-06",
    name: "Cloueur pneumatique PASLODE FNS1850",
    ref: "LOCFN18N",
    category: "Cloueurs pneumatiques",
    description: "Combi cloueur & agrafeuse léger et compact.",
    features: [
      "Profondeur d'enfoncement réglable sans outil",
      "Palpeur fin",
      "Désenrayement rapide sans outil",
      "Poignée ergonomique grip caoutchouc",
      "Échappement d'air ajustable 360°",
    ],
    applications: [
      "Plinthes",
      "Travaux d'ébénisterie",
      "Finitions de meubles",
      "Parclose",
      "Exposition et affichage",
    ],
    priceCents: 2500,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop",
  },
  {
    id: "loc-07",
    name: "Machine ardoises — Coin coupé",
    category: "Machines ardoises",
    description: "Machine à tailler les ardoises — coin coupé.",
    variants: ["20 cm", "22 cm"],
    priceCents: 2000,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=400&h=400&fit=crop",
  },
  {
    id: "loc-08",
    name: "Machine ardoises — Coquette",
    category: "Machines ardoises",
    description: "Machine à tailler les ardoises — coquette.",
    variants: ["15 cm", "22 cm N°1", "22 cm N°2", "25 cm"],
    priceCents: 3000,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=400&h=400&fit=crop",
  },
  {
    id: "loc-09",
    name: "Camion grue avec opérateur",
    category: "Transport & Levage",
    description:
      "Location d'un camion grue avec opérateur inclus pour livraison et manutention sur chantier.",
    priceCents: 9000,
    priceUnit: "heure",
    image: "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=400&h=400&fit=crop",
  },
  {
    id: "loc-10",
    name: "Évaseur professionnel",
    category: "Outillage plomberie & zinguerie",
    description:
      "Outil d'évasement professionnel pour tuyaux cuivre, inox, zinc et aluminium. Soudage laser, fabriqué en aluminium, laiton et acier trempé. Vitesse 150-500 tr/min.",
    variants: ["Diam 80mm", "Diam 100mm"],
    priceCents: 2000,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&h=400&fit=crop",
  },
  {
    id: "loc-11",
    name: "Grignoteuse HITACHI CN16SA",
    category: "Découpe métallique",
    description:
      "Grignoteuse électrique filaire haute précision 400W pour découpe acier allié & aluminium. Base fixe, poids 1,6 kg, alimentation secteur pour autonomie illimitée. Découpe nette sans déformation.",
    priceCents: 2500,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop",
  },
  {
    id: "loc-12",
    name: "Fraise à plaques aluminium MF-AF 135",
    category: "Fraisage aluminium",
    description:
      "Outil de fraisage de précision pour alliages d'aluminium. Rainure en V à 135°, profondeur de fraisage jusqu'à 8mm. Livré avec 2 positionneurs de coupe + 1 déflecteur. Poids 1,25 kg.",
    priceCents: 2500,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop",
  },
  {
    id: "loc-13",
    name: "Multi-fraiseuse MAFELL MF 26 cc AF-MAX — Coffret T-MAX",
    category: "Fraisage multifonction",
    description:
      "Fraiseuse multifonction professionnelle 1400W pour aluminium, bois et dérivés. Profondeur de fraisage 0-26mm réglable au 1/10ème mm, vitesse 3600-6250 tr/min. Coffret T-MAX inclus. Poids 5 kg.",
    applications: [
      "Rainures longitudinales/transversales",
      "Rainures en V",
      "Fraisage plaques aluminium",
      "Sciage bois/MDF/placoplâtre/panneaux composites",
    ],
    priceCents: 10000,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop",
  },
  {
    id: "loc-14a",
    name: "Règle de guidage MAFELL F110 (1,1m)",
    category: "Accessoires de guidage",
    description:
      "Rail de guidage professionnel 1,1m pour scie circulaire et fraiseuse. Surface oxydée électrolytiquement, pare-éclats caoutchouc antidéchirure, semelles antidérapantes. Rallongeable.",
    priceCents: 1000,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop",
  },
  {
    id: "loc-14b",
    name: "Règle de guidage MAFELL F160 (1,6m)",
    category: "Accessoires de guidage",
    description:
      "Rail de guidage professionnel 1,6m pour scie circulaire et fraiseuse. Surface oxydée électrolytiquement, pare-éclats caoutchouc antidéchirure, semelles antidérapantes. Rallongeable.",
    priceCents: 1000,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop",
  },
  {
    id: "loc-14c",
    name: "Règle de guidage MAFELL F310 (3,1m)",
    category: "Accessoires de guidage",
    description:
      "Rail de guidage professionnel 3,1m pour scie circulaire et fraiseuse. Surface oxydée électrolytiquement, pare-éclats caoutchouc antidéchirure, semelles antidérapantes. Rallongeable.",
    priceCents: 1500,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop",
  },
  {
    id: "loc-15",
    name: "Système de levage VELUX ZZZ 237 (la paire)",
    category: "Transport & Levage",
    description:
      "Solution professionnelle pour transporter les fenêtres de toit VELUX jusqu'aux combles via grue. Charge max 120 kg. Livré en paire. Compatible toutes fenêtres VELUX courantes.",
    priceCents: 2500,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=400&h=400&fit=crop",
  },
  {
    id: "loc-16",
    name: "Pince pour plaque de toit (panneaux UNILIN & UNIDEK)",
    category: "Transport & Levage",
    description: "Pince de levage pour panneaux de toiture type UNILIN & UNIDEK.",
    priceCents: 5000,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=400&h=400&fit=crop",
  },
  {
    id: "loc-17",
    name: "Pistolet DERBITECH Powered Applicator",
    category: "Étanchéité & collage",
    description:
      "Pistolet applicateur de colle sans fil professionnel pour toiture. Batterie rechargeable 14,4V, application en position debout, compatible colles haute viscosité.",
    applications: [
      "Collage membranes bitumineuses",
      "Isolants",
      "Revêtements d'étanchéité",
      "Toiture terrasse et pente",
    ],
    priceCents: 2000,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&h=400&fit=crop",
  },
  {
    id: "loc-18",
    name: "Pistolet à air chaud SIEVERT DW 3000 (2000W)",
    category: "Thermosoudage & décapage",
    description:
      "Thermosouffleur professionnel 2000W, moteur brushless, plage 100-600°C, débit d'air 3 niveaux réglables. Affichage LED température + tension, câble 3m, poids 810g. Livré en mallette.",
    applications: [
      "Pose membranes étanchéité PVC",
      "Décapage peinture/vernis",
      "Gaines thermorétractables",
      "Thermosoudage",
      "Dégivrage",
      "Toiture terrasse",
    ],
    priceCents: 4000,
    priceUnit: "jour",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&h=400&fit=crop",
  },
  {
    id: "loc-19",
    name: "Dérouleur EPDM",
    category: "Étanchéité & collage",
    description: "Dérouleur professionnel pour membranes EPDM.",
    priceCents: 25000,
    priceUnit: "an",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&h=400&fit=crop",
  },
];

export function formatRentalPrice(cents: number, unit: PriceUnit): string {
  const euros = (cents / 100).toFixed(cents % 100 === 0 ? 0 : 2);
  const unitLabel = unit === "jour" ? "/jour" : unit === "heure" ? "/h" : "/an";
  return `${euros}€ HTVA ${unitLabel}`;
}
