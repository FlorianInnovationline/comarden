import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import AlgimoussProductPage, { type AlgimoussProductContent } from "@/components/shop/algimouss/AlgimoussProductPage";

export const metadata: Metadata = {
  title: "ALGIPULVE PRO III - Lance télescopique 3,20 m | Comarden",
  description:
    "Lance télescopique 3,20 m Algimouss (ALGIPULVE PRO III) en fibre de verre, utilisable avec tous les produits. Évite les déplacements sur la toiture, coupleur rapide, repliée 1,25 m. Distribué par Comarden.",
};

const content: AlgimoussProductContent = {
  breadcrumb: "Équipement",
  tagline: "Lance télescopique 3,20 m (ALGIPULVE PRO III)",
  intro:
    "Lance télescopique de pulvérisation en fibre de verre, utilisable avec tous les produits Algimouss. Cette canne évite les déplacements sur la toiture et limite l'utilisation d'une échelle. Compatible avec l'ALGIPULVE PRO III et munie d'un coupleur rapide, elle mesure 1,25 m une fois repliée.",
  caracteristiques: [
    "Utilisable avec tous les produits Algimouss",
    "Évite les déplacements sur la toiture",
    "Limite l'utilisation d'échelle",
    "En fibre de verre",
    "Coupleur rapide",
    "Repliée : 1,25 m",
  ],
  modeEmploi: [],
  recommandations: [
    "Longueur déployée : 3,20 mètres, longueur repliée : 1,25 m.",
    "Compatible avec le pulvérisateur ALGIPULVE PRO III.",
    "Munie d'un coupleur rapide pour un raccordement facile.",
  ],
  docUrl: "https://algimouss.com/",
  docLabel: "En savoir plus sur algimouss.com",
};

export default async function AlgipulveLance320Page() {
  const product = await getProductBySlug("algipulve-lance-320m");
  if (!product) notFound();
  return <AlgimoussProductPage product={product} content={content} />;
}
