import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import AlgimoussProductPage, { type AlgimoussProductContent } from "@/components/shop/algimouss/AlgimoussProductPage";

export const metadata: Metadata = {
  title: "ALGIALGUES PREMIUM - Traitement curatif et préventif prêt à l'emploi | Comarden",
  description:
    "ALGIALGUES PREMIUM d'Algimouss : traitement anti-mousse curatif et préventif prêt à l'emploi. Élimine dépôts verts, lichens, mousses et moisissures, effet préventif 3 à 5 ans, sans rinçage et sans chlore. Distribué par Comarden.",
};

const content: AlgimoussProductContent = {
  breadcrumb: "Traitement",
  tagline: "Traitement curatif et préventif - prêt à l'emploi",
  intro:
    "ALGIALGUES PREMIUM est un traitement curatif et préventif prêt à l'emploi, à base de sels d'ammonium quaternaire, qui agit à la fois de manière curative et préventive. Il élimine en profondeur les dépôts verts, lichens, mousses et moisissures sur les toitures, façades et murs, et retarde leur réapparition pendant 3 à 5 ans. Produit sans rinçage, il s'applique pur au pulvérisateur.",
  caracteristiques: [
    "Traitement curatif et préventif",
    "Prêt à l'emploi (s'applique pur)",
    "Sans rinçage, sans chlore",
    "Non corrosif (respecte le zinc)",
    "Effet préventif 3 à 5 ans",
    "Idéal avant peinture",
  ],
  supports: [
    { label: "Toitures", value: "Tuiles, ardoises, fibres-ciment, shingles et supports similaires." },
    { label: "Murs et façades", value: "Crépis, enduits, briques, pierres et supports similaires." },
  ],
  modeEmploi: [
    "Appliquer sur un support sec et propre.",
    "Appliquer le produit pur au pulvérisateur, au rouleau ou à la brosse.",
    "Ne pas rincer : les résidus s'éliminent naturellement avec la pluie et le vent.",
    "Avant une mise en peinture, appliquer au minimum 5 jours avant de peindre.",
  ],
  recommandations: [
    "Double action : détruit instantanément les micro-organismes et retarde durablement leur réapparition pendant 3 à 5 ans.",
    "Respect du support : formule sans chlore et non corrosive qui n'altère pas les matériaux (tuiles, ardoises, crépis, briques) ni les métaux comme le zinc.",
    "Rendement moyen : 1 litre traite 5 à 10 m² selon la porosité (soit 25 à 50 m² par bidon de 5 L).",
    "Conditions météo : température idéale entre 5 °C et 25 °C, par temps sec, sans pluie prévue dans les 24 heures.",
    "Renouveler l'application tous les 3 à 5 ans pour un effet préventif continu.",
  ],
  docUrl: "https://algimouss.com/produit/anti-mousse-toiture-algimouss-pro/",
  docLabel: "Fiche produit sur algimouss.com",
};

export default async function AlgialguesPremiumPage() {
  const product = await getProductBySlug("algialgues-premium");
  if (!product) notFound();
  return <AlgimoussProductPage product={product} content={content} />;
}
