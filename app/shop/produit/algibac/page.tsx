import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import AlgimoussProductPage, { type AlgimoussProductContent } from "@/components/shop/algimouss/AlgimoussProductPage";

export const metadata: Metadata = {
  title: "ALGIBAC - Nettoyant bac acier | Comarden",
  description:
    "ALGIBAC d'Algimouss : nettoyant pour toitures et bardages en bac acier. Élimine les salissures tenaces (pollution, verdissures, fientes d'oiseaux), efficace en 10 minutes, sans chlore, ni soude caustique, ni acide. Distribué par Comarden.",
};

const content: AlgimoussProductContent = {
  breadcrumb: "Nettoyage",
  tagline: "Nettoyant bac acier",
  intro:
    "ALGIBAC est un nettoyant spécifique pour les toitures et bardages en bac acier. Il nettoie les salissures tenaces (traces de pollution, verdissures et fientes d'oiseaux), supprime le film statique sur les bardages et redonne un aspect propre. Efficace en 10 minutes, sa composition est sans chlore, ni soude caustique, ni acide, et n'altère pas les matériaux.",
  caracteristiques: [
    "Nettoie les salissures tenaces (pollution, verdissures, fientes)",
    "Supprime le film statique des bardages",
    "Efficace en 10 minutes",
    "N'altère pas les matériaux",
    "Sans chlore, ni soude caustique, ni acide",
    "Utilisable par faible pluie",
  ],
  supports: [
    { label: "Supports compatibles", value: "Toiture en bac acier, bardage acier et aluminium laqué ou prélaqué, PVC." },
  ],
  supportsWarning: "Ne jamais appliquer sur des bardages repeints.",
  modeEmploi: [
    "Mouiller préalablement le support en cas de température supérieure à 20 °C.",
    "Pulvériser le produit pur par petites surfaces (bandes successives).",
    "Laisser agir de 5 à 10 minutes en ne laissant jamais sécher le produit sur le support.",
    "Rincer au nettoyeur haute pression (pression adaptée).",
    "Une deuxième application peut s'avérer nécessaire.",
    "Nettoyer les outils à l'eau après utilisation.",
  ],
  recommandations: [
    "Conditions d'application : entre 5 °C et 25 °C.",
    "Protéger la végétation environnante.",
    "En cas de récupération des eaux de pluie, effectuer une dérivation pendant l'application.",
    "Lors d'une pulvérisation depuis un échafaudage, garder la lance du nettoyeur haute pression à portée de main afin de rincer sous 5 à 10 minutes, avant tout séchage du produit.",
    "Rincer immédiatement en cas de projections accidentelles.",
    "Stocker en local hors gel.",
  ],
  docUrl: "https://algimouss.com/",
  docLabel: "En savoir plus sur algimouss.com",
};

export default async function AlgibacPage() {
  const product = await getProductBySlug("algibac");
  if (!product) notFound();
  return <AlgimoussProductPage product={product} content={content} />;
}
