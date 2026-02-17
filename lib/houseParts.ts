import { LucideIcon, Triangle, Home, Sprout, Square, Droplets, Building2, Layers, Package } from "lucide-react";

export interface HousePart {
  id: string;
  label: string;
  subtitle?: string;
  description: string;
  icon: LucideIcon;
  productHref: string;
  quoteHref: string;
  coords: { xPct: number; yPct: number; align?: "left" | "right" | "center" };
  tag?: string;
}

export const HOUSE_PARTS: HousePart[] = [
  {
    id: "toiture-inclinee",
    label: "Toiture inclinée",
    description: "Solutions complètes pour toitures en pente : tuiles/ardoises, sous-toiture, accessoires et conseils techniques.",
    icon: Triangle,
    productHref: "/produits?categorie=toiture",
    quoteHref: "/contact?sujet=Devis%20Toiture%20inclinee",
    coords: { xPct: 48.0, yPct: 28.0, align: "right" },
    tag: "Toiture",
  },
  {
    id: "tuiles-ardoises",
    label: "Tuiles ou ardoises",
    description: "Large gamme, finitions, faîtage, ventilation et accessoires pour une toiture durable et esthétique.",
    icon: Package,
    productHref: "/produits?categorie=toiture",
    quoteHref: "/contact?sujet=Devis%20Tuiles%20Ardoises",
    coords: { xPct: 33.0, yPct: 57.0, align: "left" },
    tag: "Toiture",
  },
  {
    id: "fenetre-de-toit",
    label: "Fenêtre de toit",
    description: "Fenêtres de toit, raccords, étanchéité périphérique et accessoires de pose.",
    icon: Square,
    productHref: "/produits?categorie=toiture",
    quoteHref: "/contact?sujet=Devis%20Fenetre%20de%20toit",
    coords: { xPct: 41.5, yPct: 38.5, align: "center" },
    tag: "Toiture",
  },
  {
    id: "gouttieres",
    label: "Gouttières",
    description: "Zinguerie et évacuation des eaux : gouttières, crochets, naissances, descentes et accessoires.",
    icon: Droplets,
    productHref: "/produits?categorie=zinguerie",
    quoteHref: "/contact?sujet=Devis%20Gouttieres",
    coords: { xPct: 18.0, yPct: 62.8, align: "right" },
    tag: "Zinguerie",
  },
  {
    id: "toiture-plate",
    label: "Toiture plate",
    description: "Étanchéité, membranes, isolants, relevés et accessoires adaptés aux toitures plates.",
    icon: Home,
    productHref: "/produits?categorie=toiture",
    quoteHref: "/contact?sujet=Devis%20Toiture%20plate",
    coords: { xPct: 63.0, yPct: 52.7, align: "left" },
    tag: "Toiture",
  },
  {
    id: "toiture-vegetale",
    label: "Toiture végétale",
    description: "Couches techniques et systèmes pour toitures vertes : protection, drainage, substrat et finitions.",
    icon: Sprout,
    productHref: "/produits?categorie=toiture-vegetale",
    quoteHref: "/contact?sujet=Devis%20Toiture%20vegetale",
    coords: { xPct: 75.8, yPct: 42.1, align: "right" },
    tag: "Toiture",
  },
  {
    id: "facade",
    label: "Façade",
    description: "Solutions façade : bardage, panneaux, finitions, accessoires et conseils pour un rendu durable.",
    icon: Building2,
    productHref: "/produits?categorie=facade",
    quoteHref: "/contact?sujet=Devis%20Facade",
    coords: { xPct: 49.3, yPct: 67.3, align: "left" },
    tag: "Façade",
  },
  {
    id: "isolant-facade",
    label: "Isolant façade",
    description: "Isolation façade/ITE : panneaux, pare-pluie, fixations et systèmes complets pour performance énergétique.",
    icon: Layers,
    productHref: "/produits?categorie=isolation",
    quoteHref: "/contact?sujet=Devis%20Isolation%20Facade",
    coords: { xPct: 80.2, yPct: 55.8, align: "right" },
    tag: "Isolation",
  }
];