import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import RockpanelProductPage, { type RockpanelContent } from "@/components/shop/rockpanel/RockpanelProductPage";

export const metadata: Metadata = {
  title: "ROCKPANEL® Woods 8 mm - Aspect bois naturel (sur commande) | Comarden",
  description:
    "ROCKPANEL® Woods 8 mm : l'aspect du bois naturel en roche volcanique, sans pourriture ni entretien. Large sélection de décors bois. Formats 2500 et 3050 x 1200 mm, sur commande. Distribué par Comarden.",
};

const content: RockpanelContent = {
  tagline: "Toute la beauté du bois, sans les contraintes",
  applications: [
    { icon: "Trees", label: "Aspect bois" },
    { icon: "Building2", label: "Façade ventilée" },
    { icon: "ShieldCheck", label: "Sans entretien" },
    { icon: "Feather", label: "Léger" },
  ],
  utilisation:
    "Les panneaux ROCKPANEL® Woods 8 mm reproduisent fidèlement l'apparence du bois naturel tout en offrant les performances d'un panneau de façade moderne. Fabriqués à partir de roche volcanique, ils ne pourrissent pas, résistent aux intempéries, aux UV et à l'humidité et ne nécessitent que très peu d'entretien. Idéals pour les façades ventilées, les maisons contemporaines, les bâtiments publics et les projets de rénovation, ils allient la chaleur du bois à la durabilité de la pierre.",
  colorMode: "woods",
  formats: ["2500 x 1200 mm", "3050 x 1200 mm"],
  surCommande: true,
};

export default async function RockpanelWoods8mmPage() {
  const product = await getProductBySlug("rockpanel-woods-8mm");
  if (!product) notFound();
  return <RockpanelProductPage product={product} content={content} />;
}
