import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import AlgimoussProductPage, { type AlgimoussProductContent } from "@/components/shop/algimouss/AlgimoussProductPage";

export const metadata: Metadata = {
  title: "ALGIFUGE - Hydrofuge toiture et façade | Comarden",
  description:
    "ALGIFUGE d'Algimouss : hydrofuge de protection longue durée pour toitures, murs et façades. Protège de l'eau, du gel et du vieillissement, non filmogène (laisse respirer le support). Mode d'emploi et caractéristiques complètes. Distribué par Comarden.",
};

const content: AlgimoussProductContent = {
  breadcrumb: "Protection",
  tagline: "Hydrofuge toiture, murs et façades",
  intro:
    "ALGIFUGE est un hydrofuge de protection longue durée pour les toitures, les murs et les façades. Il protège de l'eau, du gel et du vieillissement, limite l'incrustation des salissures et empêche la pénétration de l'eau dans les matériaux, tout en laissant respirer le support. Non filmogène, il ne modifie pas l'aspect ni la structure des matériaux.",
  caracteristiques: [
    "Protège de l'eau, du gel et du vieillissement",
    "Limite l'incrustation des salissures",
    "Empêche la pénétration de l'eau",
    "Retarde l'apparition des micro-organismes",
    "Non filmogène, laisse respirer le support",
    "Ne modifie pas l'aspect des matériaux",
  ],
  supports: [
    { label: "Toitures", value: "Tuiles (terre cuite, béton), lauzes et tous supports absorbants." },
    { label: "Murs et façades", value: "Enduits monocouches et autres enduits, briques, pierres et tous supports absorbants." },
  ],
  supportsWarning:
    "Ne jamais appliquer sur des matériaux non absorbants : ardoises, verre, plastiques, peintures, métaux, bardeaux bitumineux...",
  modeEmploi: [
    "Protéger les surfaces qui n'ont pas à être traitées.",
    "Appliquer le produit pur de bas en haut, à l'aide d'un pulvérisateur, d'un pinceau ou d'un rouleau, sur un support propre et sec.",
    "Nettoyer les outils à l'eau après utilisation.",
  ],
  recommandations: [
    "Sur des supports sales, procéder impérativement à un nettoyage préalable avec Alginet toitures, Alginet dallages ou Algiclean selon le support.",
    "Appliquer ensuite un produit de traitement (Algialgues), puis attendre trois semaines minimum avant d'appliquer ce produit de protection.",
    "Conditions d'application : entre 8 °C et 25 °C, sur support sec.",
    "En cas de projections accidentelles, surtout sur le verre, rincer immédiatement à l'eau.",
    "Temps de séchage : 12 heures minimum selon la porosité du support.",
    "Stocker en local hors gel.",
  ],
  docUrl: "https://algimouss.com/",
  docLabel: "En savoir plus sur algimouss.com",
};

export default async function AlgifugeToitureFacadePage() {
  const product = await getProductBySlug("algifuge-toiture-facade");
  if (!product) notFound();
  return <AlgimoussProductPage product={product} content={content} />;
}
