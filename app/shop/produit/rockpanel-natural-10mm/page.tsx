import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import RockpanelProductPage, { type RockpanelContent } from "@/components/shop/rockpanel/RockpanelProductPage";

export const metadata: Metadata = {
  title: "ROCKPANEL® Natural 10 mm - Aspect pierre naturelle | Comarden",
  description:
    "ROCKPANEL® Natural 10 mm : panneau de façade en roche volcanique à l'aspect pierre naturelle, développant une patine unique. Formats 2500 et 3050 x 1200 mm. Distribué par Comarden.",
};

const content: RockpanelContent = {
  tagline: "Aspect pierre naturelle, patine évolutive",
  applications: [
    { icon: "Mountain", label: "Aspect pierre" },
    { icon: "Building2", label: "Façade ventilée" },
    { icon: "Sparkles", label: "Patine unique" },
    { icon: "Feather", label: "Léger" },
  ],
  utilisation:
    "Les panneaux ROCKPANEL® Natural 10 mm sont idéals pour les façades ventilées, les habillages extérieurs et les projets de construction neuve ou de rénovation. Fabriqués à partir de roche volcanique, ils évoluent naturellement sous l'effet des UV et des intempéries et développent au fil du temps une patine unique qui renforce leur caractère architectural, tout en conservant durabilité, stabilité dimensionnelle et faible entretien.",
  colorMode: "none",
  formats: ["2500 x 1200 mm", "3050 x 1200 mm"],
};

export default async function RockpanelNatural10mmPage() {
  const product = await getProductBySlug("rockpanel-natural-10mm");
  if (!product) notFound();
  return <RockpanelProductPage product={product} content={content} />;
}
