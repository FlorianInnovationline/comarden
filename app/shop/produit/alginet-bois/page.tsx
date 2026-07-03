import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import AlgimoussProductPage, { type AlgimoussProductContent } from "@/components/shop/algimouss/AlgimoussProductPage";

export const metadata: Metadata = {
  title: "ALGINET BOIS - Nettoyant bardage et terrasses bois | Comarden",
  description:
    "ALGINET BOIS d'Algimouss : nettoyant bois gélifié qui redonne un aspect naturel au bois brut ou exotique. Efficace contre noircissements et verdissures, sans chlore. Distribué par Comarden.",
};

const content: AlgimoussProductContent = {
  breadcrumb: "Nettoyage",
  tagline: "Nettoyant bardage et terrasses bois",
  intro:
    "ALGINET BOIS est un nettoyant bois gélifié qui nettoie les salissures tenaces et redonne un aspect naturel au bois brut ou exotique. Efficace contre les noircissements et les verdissures, sa formule gélifiée est facile à appliquer, efficace en 30 minutes et sans chlore.",
  caracteristiques: [
    "Redonne un aspect naturel au bois brut ou exotique",
    "Convient aux bois intérieurs ou extérieurs",
    "Efficace contre noircissements et verdissures",
    "Formule gélifiée facile à appliquer",
    "Efficace en 30 minutes",
    "Sans chlore, respecte le support",
  ],
  supports: [
    {
      label: "Toutes surfaces en bois",
      value: "Terrasse bois, bardage bois, palissades, caillebotis, menuiseries, volets, mobilier de jardin...",
    },
  ],
  modeEmploi: [
    "Humidifier le bois à l'eau douce.",
    "Appliquer le produit pur à la brosse ou au pinceau.",
    "Laisser agir de 10 à 30 minutes, selon le degré d'encrassement.",
    "Utiliser une brosse tendre pour rincer soigneusement à l'eau claire, dans le sens des nervures.",
    "Recommencer plusieurs fois l'opération si nécessaire.",
    "Nettoyer les outils à l'eau après application.",
    "Après séchage, le support peut être recouvert de vernis, peinture ou lasure.",
  ],
  recommandations: [
    "Conditions d'application : entre 5 °C et 25 °C.",
    "Protéger les surfaces métalliques et la végétation environnante.",
    "En cas de projections accidentelles, nettoyer immédiatement avec de l'eau.",
    "Stocker en local hors gel.",
  ],
  docUrl: "https://algimouss.com/",
  docLabel: "En savoir plus sur algimouss.com",
};

export default async function AlginetBoisPage() {
  const product = await getProductBySlug("alginet-bois");
  if (!product) notFound();
  return <AlgimoussProductPage product={product} content={content} />;
}
