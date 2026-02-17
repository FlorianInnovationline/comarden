import { Scissors, Truck, Package, MessageCircle, LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  href: string;
}

export const services: Service[] = [
  {
    icon: Scissors,
    title: "Façonnage sur mesure",
    description: "Nous transformons vos matériaux aux dimensions exactes de votre chantier.",
    features: ["Pliage zinc et acier", "Découpe bois de précision", "EPDM découpé à la mesure"],
    href: "/services/faconnage",
  },
  {
    icon: Truck,
    title: "Transport & Livraison",
    description: "Une logistique fiable pour livrer vos matériaux en toute sécurité.",
    features: ["Livraison sur chantier", "Camion-grue disponible", "Manutention sécurisée"],
    href: "/services/transport",
  },
  {
    icon: Package,
    title: "Préparation & Stock",
    description: "Vos commandes préparées avec soin et disponibles rapidement.",
    features: ["Stock permanent", "Préparation soignée", "Disponibilité rapide"],
    href: "/services/preparation",
  },
  {
    icon: MessageCircle,
    title: "Conseil technique",
    description: "Nos experts vous accompagnent dans le choix de vos matériaux.",
    features: ["Accompagnement projet", "Recommandations techniques", "Solutions adaptées"],
    href: "/services/conseil",
  },
];
