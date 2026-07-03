import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import TyvekProductPage, { type TyvekProductContent } from "@/components/shop/tyvek/TyvekProductPage";

export const metadata: Metadata = {
  title: "DuPont™ Tyvek® Tape Plus 2062B - Bande adhésive acrylique | Comarden",
  description:
    "Tyvek® Tape Plus 2062B (60 mm) : bande adhésive acrylique simple face pour coller hermétiquement les écrans de sous-toiture et pare-vapeur, même en conditions extrêmes (froid, humidité). Caractéristiques techniques complètes. Distribué par Comarden.",
};

const content: TyvekProductContent = {
  breadcrumb: "Accessoires",
  tagline: "Bande adhésive acrylique pour sous-toiture et pare-vapeur",
  intro:
    "La bande adhésive DuPont™ Tyvek® Tape Plus est une bande simple face (HD-PE) dotée d'un adhésif acrylique modifié. Elle permet de coller, même en conditions d'installation extrêmes (température basse et humidité élevée), hermétiquement les membranes, et plus particulièrement de rendre étanche le pourtour des zones de pénétration et de réparer les dommages sur tous les écrans de sous-toiture et pare-vapeur de la gamme.",
  caracteristiques: [
    "Adhésif acrylique modifié, simple face (HD-PE)",
    "Colle en conditions extrêmes (froid, humidité)",
    "Couleur : blanc",
    "Résistance à la température : -40 °C à 80 °C",
    "Pour écrans de sous-toiture et pare-vapeur",
    "Application dès -5 °C",
  ],
  whyEyebrow: "Tyvek® Tape Plus",
  whyTitle: "Caractéristiques, avantages et applications",
  whyPoints: [
    {
      icon: "Zap",
      title: "Prise initiale immédiate",
      body: "Conçue pour le secteur de la construction, elle offre une prise immédiate et une excellente adhérence au Tyvek® et à une vaste gamme de matériaux plastiques (non-tissé, film, etc.).",
    },
    {
      icon: "Snowflake",
      title: "Colle en conditions extrêmes",
      body: "Son adhésif acrylique modifié permet un collage hermétique même par température basse et humidité élevée, là où les rubans standards échouent.",
    },
    {
      icon: "Wrench",
      title: "Étanchéité et réparation",
      body: "Idéale pour rendre étanche le pourtour des zones de pénétration et pour réparer les dommages sur les écrans de sous-toiture et pare-vapeur de la gamme.",
    },
    {
      icon: "ShieldCheck",
      title: "Résistance durable",
      body: "Excellente résistance au vieillissement, à l'eau, à l'humidité, aux cycles environnementaux et aux produits chimiques.",
    },
  ],
  poseTitle: "Application et stockage",
  pose:
    "Les utilisateurs doivent vérifier que la bande convient au support (adhérence, compatibilité chimique, coloration). Appliquer à une température supérieure ou égale à -5 °C, sur une surface sèche et propre (ni poussière, ni graisse, ni solvant). Stockage : en rouleau dans l'emballage d'origine, à plat, dans un lieu propre et sec, à l'abri de la lumière directe du soleil, entre +10 °C et +30 °C.",
  docUrl: "https://www.tyvek.fr",
  docLabel: "En savoir plus sur tyvek.fr",
};

export default async function TyvekTapePlus2062BPage() {
  const product = await getProductBySlug("tyvek-tape-plus-2062b");
  if (!product) notFound();
  return <TyvekProductPage product={product} content={content} />;
}
