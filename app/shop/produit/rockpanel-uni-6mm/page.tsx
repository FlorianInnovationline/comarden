import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import RockpanelProductPage, { type RockpanelContent } from "@/components/shop/rockpanel/RockpanelProductPage";

export const metadata: Metadata = {
  title: "ROCKPANEL® Uni 6 mm - Panneau de façade bardage ventilé | Comarden",
  description:
    "ROCKPANEL® Uni 6 mm : solution fiable et économique pour bardage ventilé, en roche volcanique. 6 coloris RAL, formats 2500 et 3050 x 1200 mm. En stock à Namur et Bertrix. Distribué par Comarden.",
};

const content: RockpanelContent = {
  tagline: "La solution fiable et économique pour bardage ventilé",
  applications: [
    { icon: "Building2", label: "Façade" },
    { icon: "Wallet", label: "Économique" },
    { icon: "Layers", label: "Bardage ventilé" },
    { icon: "Feather", label: "Léger" },
  ],
  utilisation:
    "Parfaits pour les façades résidentielles, tertiaires et industrielles, les panneaux ROCKPANEL® Uni 6 mm assurent une finition sobre et moderne avec un entretien minimal. Fabriqués à partir de roche volcanique, ils offrent une excellente résistance aux intempéries, aux UV et à l'humidité, tout en restant légers et faciles à mettre en œuvre pour un excellent rapport qualité/prix.",
  colorMode: "ral",
  formats: ["2500 x 1200 mm", "3050 x 1200 mm"],
};

export default async function RockpanelUni6mmPage() {
  const product = await getProductBySlug("rockpanel-uni-6mm");
  if (!product) notFound();
  return <RockpanelProductPage product={product} content={content} />;
}
