import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import RockpanelProductPage, { type RockpanelContent } from "@/components/shop/rockpanel/RockpanelProductPage";

export const metadata: Metadata = {
  title: "ROCKPANEL® Standard 8 mm - Panneau de façade | Comarden",
  description:
    "ROCKPANEL® Standard 8 mm (3050 x 1200 mm) : panneau de façade en laine de roche compressée pour bardage ventilé. 6 coloris RAL en stock à Namur et Bertrix. Distribué par Comarden.",
};

const content: RockpanelContent = {
  tagline: "Panneau de façade haute performance pour bardage ventilé",
  applications: [
    { icon: "Building2", label: "Façade" },
    { icon: "Layers", label: "Bardage ventilé" },
    { icon: "ShieldCheck", label: "Durable" },
    { icon: "Feather", label: "Léger" },
  ],
  utilisation:
    "Le ROCKPANEL® Standard 8 mm est conçu pour les projets de bardage ventilé résidentiels, tertiaires et industriels. Léger et facile à travailler, il se découpe sur chantier et se pose sur ossature bois ou métallique, aussi bien en construction neuve qu'en rénovation. Sa laine de roche compressée lui confère une excellente stabilité dimensionnelle et un entretien minimal.",
  colorMode: "ral",
  formats: ["3050 x 1200 mm"],
};

export default async function RockpanelStandard8mmPage() {
  const product = await getProductBySlug("rockpanel-standard-8mm");
  if (!product) notFound();
  return <RockpanelProductPage product={product} content={content} />;
}
