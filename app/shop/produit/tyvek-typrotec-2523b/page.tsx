import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import TyvekProductPage, { type TyvekProductContent } from "@/components/shop/tyvek/TyvekProductPage";

export const metadata: Metadata = {
  title: "DuPont™ Tyvek® Typrotec 2523B - Écran de sous-toiture HPV | Comarden",
  description:
    "Tyvek® Typrotec 2523B : écran de sous-toiture HPV de résistance supérieure. Étanche à l'eau et au vent, pose directe sur l'isolant, couche fonctionnelle 6 à 8 fois plus épaisse. Spécifications techniques complètes. Distribué par Comarden.",
};

const content: TyvekProductContent = {
  breadcrumb: "Écrans de sous-toiture",
  tagline: "Écran de sous-toiture HPV de résistance supérieure",
  intro:
    "L'écran de sous-toiture DuPont™ Tyvek® Typrotec 2523B est une membrane monocouche hautement perméable à la vapeur d'eau (HPV), étanche à l'eau et au vent. Il se pose directement sur l'isolant thermique et assure une régulation optimale de l'humidité, minimisant le risque de condensation. Sa couche fonctionnelle est, par nature, 6 à 8 fois plus épaisse que celle des écrans multicouches standard, pour une durabilité et une étanchéité prouvées dans le temps.",
  caracteristiques: [
    "Étanche à l'eau",
    "Étanche au vent",
    "Résistance mécanique supérieure",
    "Pose directe sur l'isolant thermique",
    "Hautement perméable à la vapeur d'eau (HPV)",
    "Durable - garantie 15 ans",
  ],
  whyEyebrow: "Tous les écrans de sous-toiture ne sont pas identiques",
  whyTitle: "Pourquoi choisir les écrans de sous-toiture DuPont™ Tyvek® ?",
  whyPoints: [
    {
      icon: "Layers",
      title: "Une couche fonctionnelle très épaisse",
      body: "La couche fonctionnelle de Tyvek® est, par nature, 6 à 8 fois plus épaisse que la plupart des produits multicouches standard. Par comparaison, les écrans multicouches sont composés d'une couche fonctionnelle très fine (3 fois plus fine qu'un cheveu humain) laminée entre deux couches protectrices externes.",
    },
    {
      icon: "ShieldCheck",
      title: "Durabilité supérieure - technologie Flash Spun-bond",
      body: "Tyvek® est composé de millions de micro-filaments de polyéthylène thermoliés entre eux. Sa structure garantit une barrière solide et durable, sans délamination possible.",
    },
    {
      icon: "Droplets",
      title: "Étanchéité à l'eau prouvée",
      body: "Des tests de fonctionnalité réalisés par un laboratoire indépendant démontrent que les écrans de sous-toiture Tyvek® restent étanches même après plus de 20 ans, contrairement à certains écrans multicouches défaillants après moins de 10 ans.",
    },
    {
      icon: "SunMedium",
      title: "Excellente résistance aux UV et à la chaleur",
      body: "Contrairement à la plupart des membranes multicouches standard, la couche fonctionnelle de Tyvek® est composée à 100 % de PE stabilisé aux UV et à la chaleur. Cela la rend résistante aux UV à des températures allant jusqu'à 100 °C.",
    },
    {
      icon: "BadgeCheck",
      title: "Testé et certifié",
      body: "Agréé ATG (ATG 2180), Tyvek® reflète l'innovation et l'expertise de DuPont, une entreprise reconnue pour son exigence de qualité et son service client. Garantie 15 ans.",
    },
  ],
  poseTitle: "Mise en œuvre",
  pose:
    "Le Typrotec 2523B se pose directement sur l'isolant thermique, logo lisible vers l'extérieur, avec un recouvrement des lés selon les règles de l'art. Il est disponible avec ou sans bande adhésive intégrée pour faciliter le collage des recouvrements. Utilisez le Tyvek® Typrotec Tape pour le traitement des jonctions, recouvrements et pénétrations afin de garantir la continuité de l'étanchéité à l'air et à l'eau.",
  docUrl:
    "https://www.dupontdenemours.be/content/dam/dupont/amer/us/en/performance-building-solutions/public/documents/fr/Tyvek_Pocket_flyer_BE_fr_september_2019.pdf",
  docLabel: "Flyer technique DuPont™ Tyvek® (PDF)",
};

export default async function TyvekTyprotec2523BPage() {
  const product = await getProductBySlug("tyvek-typrotec-2523b");
  if (!product) notFound();
  return <TyvekProductPage product={product} content={content} />;
}
