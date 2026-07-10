import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import RockpanelProductPage, { type RockpanelContent } from "@/components/shop/rockpanel/RockpanelProductPage";

export const metadata: Metadata = {
  title: "ROCKPANEL® Chameleon 8 mm - Façade à effet irisé | Comarden",
  description:
    "ROCKPANEL® Chameleon 8 mm (3050 x 1200 mm) : façade en roche volcanique à finition irisée dont la couleur change selon l'angle et la lumière. Pour projets architecturaux haut de gamme. Distribué par Comarden.",
};

const content: RockpanelContent = {
  tagline: "Façade aux reflets changeants, effet irisé",
  applications: [
    { icon: "Sparkles", label: "Effet irisé" },
    { icon: "Building2", label: "Haut de gamme" },
    { icon: "Sun", label: "Reflets" },
    { icon: "Feather", label: "Léger" },
  ],
  utilisation:
    "Les panneaux ROCKPANEL® Chameleon 8 mm offrent un rendu architectural unique grâce à leur finition à effet irisé : selon l'angle de vue, la lumière et la position de l'observateur, la façade change subtilement de couleur. Fabriqués à partir de roche volcanique, ils sont parfaitement adaptés aux façades ventilées, aux bâtiments contemporains, aux projets haut de gamme et aux réalisations architecturales exigeantes.",
  colorMode: "none",
  formats: ["3050 x 1200 mm"],
};

export default async function RockpanelChameleon8mmPage() {
  const product = await getProductBySlug("rockpanel-chameleon-8mm");
  if (!product) notFound();
  return <RockpanelProductPage product={product} content={content} />;
}
