import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import AlgimoussProductPage, { type AlgimoussProductContent } from "@/components/shop/algimouss/AlgimoussProductPage";

export const metadata: Metadata = {
  title: "ALGINET TOITURES - Nettoyant toitures | Comarden",
  description:
    "ALGINET TOITURES d'Algimouss : nettoyant qui élimine micro-organismes (algues, lichens), salissures, pollution et graisses sur les toitures. Sans chlore, ni soude caustique, ni acide. Conseillé avant tout traitement. Distribué par Comarden.",
};

const content: AlgimoussProductContent = {
  breadcrumb: "Nettoyage",
  tagline: "Nettoyant toitures",
  intro:
    "ALGINET TOITURES nettoie les micro-organismes (algues, lichens), les salissures et les traces de pollution sur les toitures, et se montre également efficace contre les graisses (sorties de VMC). Il ne modifie pas l'aspect ni la structure des supports, ne contient ni chlore, ni soude caustique, ni acide, et est conseillé en première application sur les supports encrassés avant tout traitement.",
  caracteristiques: [
    "Élimine micro-organismes, salissures et pollution",
    "Efficace aussi contre les graisses (VMC...)",
    "Ne modifie pas l'aspect ni la structure",
    "Ni chlore, ni soude caustique, ni acide",
    "Conseillé avant tout traitement",
    "Nouvelle formule à temps de contact plus long",
  ],
  supports: [
    {
      label: "Tous matériaux de toitures",
      value: "Tuiles (terre cuite et béton), ardoises naturelles et fibres-ciment, shingles...",
    },
  ],
  supportsWarning: "Ne pas appliquer sur des bacs aciers et tous supports métalliques.",
  modeEmploi: [
    "Humidifier le support avant application.",
    "Appliquer le produit pur au pulvérisateur en prenant soin d'éviter les projections sur la végétation environnante.",
    "Laisser agir 60 minutes à 2 heures.",
    "Réhumidifier le support afin de réactiver le produit s'il a séché.",
    "Rincer au nettoyeur haute pression (pression adaptée).",
    "Nettoyer les outils à l'eau après l'utilisation.",
  ],
  recommandations: [
    "Conditions d'application : entre 5 °C et 25 °C.",
    "Protéger la végétation environnante.",
    "Dans le cas de récupération des eaux de pluie, effectuer une dérivation pendant l'application.",
    "En cas de projections accidentelles, rincer immédiatement avec de l'eau.",
    "Stocker en local hors gel.",
  ],
  docUrl: "https://algimouss.com/",
  docLabel: "En savoir plus sur algimouss.com",
};

export default async function AlginetToituresPage() {
  const product = await getProductBySlug("alginet-toitures");
  if (!product) notFound();
  return <AlgimoussProductPage product={product} content={content} />;
}
