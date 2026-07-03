import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import AlgimoussProductPage, { type AlgimoussProductContent } from "@/components/shop/algimouss/AlgimoussProductPage";

export const metadata: Metadata = {
  title: "ALGINET SOLAIRE - Nettoyant panneaux photovoltaïques | Comarden",
  description:
    "ALGINET SOLAIRE d'Algimouss : nettoyant pour panneaux solaires (photovoltaïques et thermiques) et fenêtres de toit. Optimise le rendement, action en 5 minutes sans rinçage, propriétés déperlantes. Distribué par Comarden.",
};

const content: AlgimoussProductContent = {
  breadcrumb: "Nettoyage",
  tagline: "Nettoyant panneaux photovoltaïques",
  intro:
    "ALGINET SOLAIRE nettoie toutes les salissures tenaces (déjections d'oiseaux, poussières, lichens, mousses, feuilles et pollution industrielle) sur les panneaux solaires et les fenêtres de toit. Il optimise le rendement des panneaux, agit en 5 minutes sans rinçage et limite les traces grâce à ses propriétés déperlantes.",
  caracteristiques: [
    "Nettoie les salissures tenaces (déjections, poussières, mousses...)",
    "Optimise le rendement des panneaux solaires",
    "Action rapide, sans rinçage",
    "Formule déperlante qui limite les traces",
    "Agit en 5 minutes",
    "N'agresse pas les matériaux, sans chlore",
  ],
  supports: [
    { label: "Supports compatibles", value: "Panneaux solaires (photovoltaïques et thermiques), fenêtres de toit..." },
  ],
  modeEmploi: [
    "Bien agiter le produit avant emploi.",
    "Appliquer le produit pur généreusement sur la surface à nettoyer, à l'aide d'un pulvérisateur ou d'une raclette avec mouilleur.",
    "Laisser agir 5 minutes.",
    "Enlever les salissures en passant une raclette sèche.",
    "Une deuxième application peut s'avérer nécessaire suivant l'état du support.",
    "Nettoyer les outils à l'eau après utilisation.",
  ],
  recommandations: [
    "Conditions d'application : entre 5 °C et 25 °C.",
    "Ne pas travailler en plein soleil.",
    "Protéger la végétation environnante.",
    "Stocker en local hors gel.",
    "Pour un rendement optimal de votre installation, utilisez ce produit une à deux fois par an.",
  ],
  docUrl: "https://algimouss.com/",
  docLabel: "En savoir plus sur algimouss.com",
};

export default async function AlginetSolairePage() {
  const product = await getProductBySlug("alginet-solaire");
  if (!product) notFound();
  return <AlgimoussProductPage product={product} content={content} />;
}
