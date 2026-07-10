import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import RockpanelProductPage, { type RockpanelContent } from "@/components/shop/rockpanel/RockpanelProductPage";

export const metadata: Metadata = {
  title: "ROCKPANEL® Lines² S - Bardage à lames rainurées | Comarden",
  description:
    "ROCKPANEL® Lines² S (3050 x 164 mm, 146 mm utile) : bardage à lames rainurées en roche volcanique, effet de lames contemporain. Primer à peindre ou 6 coloris RAL. Distribué par Comarden.",
};

const content: RockpanelContent = {
  tagline: "L'élégance d'un bardage à lames, la durabilité d'un panneau",
  applications: [
    { icon: "AlignJustify", label: "Lames rainurées" },
    { icon: "Building2", label: "Façade" },
    { icon: "ShieldCheck", label: "Durable" },
    { icon: "Feather", label: "Léger" },
  ],
  utilisation:
    "Les ROCKPANEL® Lines² S apportent l'esthétique chaleureuse d'un bardage à lames avec les performances d'un panneau de façade moderne. Grâce à leur profil rainuré, ils créent un effet de lames élégant et contemporain, idéal pour les façades résidentielles, les extensions, les bâtiments tertiaires et les rénovations. Disponibles en version Primer (à peindre dans le coloris de votre choix) ou en coloris RAL, ils constituent une solution durable pour les façades ventilées.",
  colorMode: "ral",
  primer: true,
  formats: ["3050 x 164 mm (146 mm utile)"],
};

export default async function RockpanelLines2SPage() {
  const product = await getProductBySlug("rockpanel-lines-2-s");
  if (!product) notFound();
  return <RockpanelProductPage product={product} content={content} />;
}
