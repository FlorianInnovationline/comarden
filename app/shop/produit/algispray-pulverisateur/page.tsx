import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import AlgimoussProductPage, { type AlgimoussProductContent } from "@/components/shop/algimouss/AlgimoussProductPage";

export const metadata: Metadata = {
  title: "ALGISPRAY (ALGIPULVE PRO III) - Pulvérisateur électrique sur chariot | Comarden",
  description:
    "ALGISPRAY d'Algimouss (ALGIPULVE PRO III) : pulvérisateur électrique sur chariot pour l'application des produits chimiques. 15 bars, 12 L/min, tuyau 25 m, composants polypropylène et Viton. Distribué par Comarden.",
};

const content: AlgimoussProductContent = {
  breadcrumb: "Équipement",
  tagline: "Pulvérisateur électrique sur chariot (ALGIPULVE PRO III)",
  intro:
    "ALGISPRAY est un pulvérisateur électrique sur chariot qui facilite le transport sur les terrains irréguliers. Conçu pour l'application des produits chimiques (anti-verdissures, hydrofuges, fixateurs, produits de nettoyage, huile de décoffrage, produits d'imprégnation bois), il est puissant et léger. Ses composants en polypropylène et Viton en font un allié robuste pour tous vos travaux.",
  caracteristiques: [
    "Chariot pour un transport facile sur terrains irréguliers",
    "Application de tous types de produits chimiques",
    "Version acides à pistons/membranes",
    "Puissant et léger",
    "Composants polypropylène et Viton",
    "Tuyau flexible 25 mètres",
  ],
  modeEmploi: [],
  recommandations: [
    "Rincer soigneusement le pulvérisateur à l'eau claire après chaque utilisation (environ 30 L).",
    "Tourner le régulateur de pression dans le sens inverse des aiguilles d'une montre pour baisser la pression à un niveau très faible, puis pulvériser l'eau de rinçage pendant quelques minutes.",
    "Tourner de nouveau le régulateur de pression complètement dans le sens inverse des aiguilles d'une montre, puis rincer la pompe à l'eau claire.",
    "Faire ensuite tourner la pompe quelques minutes sans aspirer de liquide, afin de la vider complètement et d'éviter le risque de gel.",
    "En cas de complément de niveau d'huile, utiliser de l'huile 15W40 ; contrôler le niveau et la quantité d'huile avant chaque utilisation.",
    "Ne pas utiliser la pompe au maximum de sa puissance pendant le rodage des 10 premières heures de travail.",
    "Une utilisation prolongée à pression extrême ou dans des conditions anormales provoque une surchauffe et la détérioration de la pompe.",
    "Accessoires disponibles sur demande : lance télescopique 5,50 m ou lance télescopique 6 m.",
  ],
  docUrl: "https://algimouss.com/",
  docLabel: "En savoir plus sur algimouss.com",
};

export default async function AlgisprayPulverisateurPage() {
  const product = await getProductBySlug("algispray-pulverisateur");
  if (!product) notFound();
  return <AlgimoussProductPage product={product} content={content} />;
}
