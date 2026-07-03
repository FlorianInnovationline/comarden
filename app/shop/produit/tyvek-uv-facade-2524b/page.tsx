import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import TyvekProductPage, { type TyvekProductContent } from "@/components/shop/tyvek/TyvekProductPage";

export const metadata: Metadata = {
  title: "DuPont™ Tyvek® UV Façade 2524B - Pare-pluie façades ventilées | Comarden",
  description:
    "Tyvek® UV Façade 2524B : pare-pluie haute performance pour façades à claire-voie et façades ventilées. Première membrane HPV certifiée CE pour façades à joints ouverts, très haute résistance aux UV. Caractéristiques techniques complètes. Distribué par Comarden.",
};

const content: TyvekProductContent = {
  breadcrumb: "Pare-pluie de façade",
  tagline: "Pare-pluie pour façades à claire-voie et façades ventilées",
  intro:
    "DuPont™ Tyvek® UV Façade 2524B est un pare-pluie haute performance spécialement conçu pour les façades à claire-voie et les façades ventilées. Première membrane HPV à avoir obtenu le marquage CE pour une utilisation en façade à joints ouverts, elle offre une très haute résistance aux UV et assure la pérennité de la structure du bâtiment ainsi que l'efficacité de son isolation dans le temps, pour une ouverture entre lames de bardage allant jusqu'à 3 cm.",
  caracteristiques: [
    "Très haute résistance aux UV (certifié CE façades à claire-voie)",
    "Imperméable au vent et à l'eau",
    "Perméable à la vapeur d'eau",
    "Ouverture entre lames jusqu'à 3 cm",
    "Convient au bois, métal, pierre et autres bardages",
    "Léger, souple et facile à installer",
  ],
  whyEyebrow: "Une protection permanente",
  whyTitle: "Une protection exceptionnelle grâce à DuPont™ Tyvek® UV Façade",
  whyPoints: [
    {
      icon: "Clock",
      title: "Des performances à long terme",
      body: "Les façades à claire-voie offrent de nouvelles possibilités architecturales, mais l'isolation et la structure nécessitent une protection efficace contre les intempéries et les UV. Tyvek® UV Façade assure la pérennité de la structure et l'efficacité de son isolation dans le temps.",
    },
    {
      icon: "Award",
      title: "Unique dans sa catégorie",
      body: "Tyvek® UV Façade répond aux rigoureuses réglementations européennes de la construction. Pour obtenir le marquage CE, le produit résiste à une exposition permanente aux UV de 5 000 heures en conservant ses propriétés, contre 336 heures seulement pour un pare-pluie standard.",
    },
    {
      icon: "Sparkles",
      title: "Les propriétés uniques de Tyvek®",
      body: "Issues d'un procédé unique de fabrication « flash spun bond », les membranes DuPont™ Tyvek® sont extrêmement solides, souples et légères. Elles offrent une protection exceptionnelle pendant la construction et toute la durée de vie du bâtiment.",
    },
    {
      icon: "ShieldCheck",
      title: "Une solution qui défie le temps",
      body: "Étanchéité à l'eau à l'épreuve du temps, couche fonctionnelle épaisse pour une durabilité prouvée, composition idéale pour résister aux UV et à la chaleur, et propriétés mécaniques maintenues à long terme, gage de longévité.",
    },
  ],
  poseTitle: "Mise en œuvre",
  pose:
    "Tyvek® UV Façade se pose côté extérieur de l'isolant, derrière le bardage claire-voie ou ventilé. L'espace maximal entre les lames de bardage est de 3 cm (largeur minimale des lames B ≥ 2A). Nous recommandons de recouvrir la membrane le plus rapidement possible après son installation. Pour le collage des lés, utilisez la Bande adhésive Tyvek® UV Façade (excellente résistance aux UV) ou la Bande adhésive Tyvek® Double Face, particulièrement efficace en conditions humides.",
  docUrl: "https://www.tyvek.fr",
  docLabel: "En savoir plus sur tyvek.fr",
};

export default async function TyvekUvFacade2524BPage() {
  const product = await getProductBySlug("tyvek-uv-facade-2524b");
  if (!product) notFound();
  return <TyvekProductPage product={product} content={content} />;
}
