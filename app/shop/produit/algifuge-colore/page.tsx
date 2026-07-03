import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import AlgimoussProductPage, { type AlgimoussProductContent } from "@/components/shop/algimouss/AlgimoussProductPage";

export const metadata: Metadata = {
  title: "ALGIFUGE COLORÉ - Hydrofuge coloré toiture | Comarden",
  description:
    "ALGIFUGE COLORÉ d'Algimouss : hydrofuge coloré pour toiture qui imperméabilise et ravive la teinte d'origine. Application en une seule couche, 3 coloris (brun, noir ardoise, rouge tuile). Distribué par Comarden.",
};

const content: AlgimoussProductContent = {
  breadcrumb: "Protection",
  tagline: "Hydrofuge coloré toiture",
  intro:
    "ALGIFUGE COLORÉ est un produit hydrofuge coloré pour toiture qui imperméabilise et redonne la teinte d'origine. Il protège les matériaux de l'humidité, du gel et du vieillissement, limite l'incrustation des salissures et retarde l'apparition des micro-organismes. Application en une seule couche, disponible en 3 coloris.",
  caracteristiques: [
    "Imperméabilise et ravive la couleur de la toiture",
    "Application en une seule couche",
    "Limite l'incrustation des salissures",
    "Protège du gel et du vieillissement",
    "Retarde l'apparition des micro-organismes",
    "3 coloris : brun, noir ardoise, rouge tuile",
  ],
  supports: [
    {
      label: "Toitures",
      value:
        "Tuiles (terre cuite, béton), ardoises naturelles et fibres-ciment, plaques ondulées, lauzes et tous supports absorbants (à condition qu'il n'y ait pas de traitement de finition).",
    },
  ],
  supportsWarning:
    "Ne jamais appliquer sur des matériaux non absorbants (verre, plastiques, peintures, métaux...) qui, par nature, n'ont pas à être imperméabilisés.",
  modeEmploi: [
    "Le support doit être propre, sec, stable et traité obligatoirement au préalable avec le produit Algialgues (laisser agir minimum 5 jours avant l'application).",
    "Protéger les surfaces qui n'ont pas à être traitées.",
    "Bien mélanger et homogénéiser régulièrement le produit, avant et pendant l'utilisation (toutes les 30 minutes).",
    "Appliquer en une seule couche le produit pur, de bas en haut, à l'aide d'un rouleau ou d'un pistolet à peinture airless, sur un support propre et sec.",
    "Nettoyer les outils à l'eau après utilisation.",
  ],
  recommandations: [
    "La préparation du support et les conditions de mise en œuvre doivent être conformes aux prescriptions de la norme NF P84-404 (réf. DTU 42.1).",
    "Sur des supports sales, procéder impérativement à un nettoyage préalable avec Alginet toitures.",
    "Appliquer ensuite le traitement Algialgues, puis attendre 5 jours minimum avant ce produit de protection. Ce produit n'est pas destiné à recouvrir d'anciens revêtements.",
    "Conditions d'application : entre 6 °C et 30 °C.",
    "Prévoir au moins 6 heures sans pluie après application.",
    "En cas de projections accidentelles, surtout sur le verre, rincer immédiatement avec de l'eau.",
    "Vu la diversité des supports, faire un essai au préalable.",
    "Stocker en local hors gel.",
  ],
  docUrl: "https://algimouss.com/",
  docLabel: "En savoir plus sur algimouss.com",
};

export default async function AlgifugeColorePage() {
  const product = await getProductBySlug("algifuge-colore");
  if (!product) notFound();
  return <AlgimoussProductPage product={product} content={content} />;
}
