import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import TyvekProductPage, { type TyvekProductContent } from "@/components/shop/tyvek/TyvekProductPage";

export const metadata: Metadata = {
  title: "DuPont™ Tyvek® FlexWrap EZ 2064FW - Bande adhésive extensible | Comarden",
  description:
    "Tyvek® FlexWrap EZ 2064FW : ruban de solin auto-adhésif souple et extensible (env. 130 %) en butyle, pour une étanchéité continue à l'air, au vent et à l'eau autour des pénétrations et menuiseries. Caractéristiques techniques complètes. Distribué par Comarden.",
};

const content: TyvekProductContent = {
  breadcrumb: "Accessoires",
  tagline: "Bande adhésive de solin souple et extensible",
  intro:
    "DuPont™ Tyvek® FlexWrap EZ est un adhésif haute performance souple et extensible, composé d'une couche de Tyvek® plissé laminée sur une bande adhésive butyle pour assurer une parfaite adhérence. Il crée une étanchéité continue à l'air, au vent et à l'eau autour des zones de pénétration de toutes formes : jonctions des fenêtres avec le pare-vapeur, conduits, trous d'aération, câbles, coins et autres pénétrations. À utiliser dans les façades de bâtiment, un revêtement de toit ou à l'intérieur.",
  caracteristiques: [
    "Membrane Tyvek® plissée + adhésif butyle",
    "Extensible env. 130 % (2,3 x la longueur)",
    "Étanche à l'air, au vent et à l'eau",
    "Sans asphalte ni bitume (pas de coulures)",
    "Écart de température : -30 °C à +80 °C",
    "Résistance aux UV : 4 mois",
  ],
  whyEyebrow: "Tyvek® FlexWrap EZ",
  whyTitle: "Caractéristiques et avantages",
  whyPoints: [
    {
      icon: "Move",
      title: "Extrême extensibilité",
      body: "Sa membrane plissée en Tyvek® permet un allongement d'environ 130 % de sa longueur initiale. Elle s'adapte ainsi sans plis aux mouvements structurels et aux formes complexes.",
    },
    {
      icon: "Layers",
      title: "Adhésif puissant en butyle",
      body: "Sans asphalte ni bitume (ce qui évite les coulures ou les taches), il assure une adhérence maximale sur la plupart des matériaux de construction et des membranes Tyvek® / AirGuard®.",
    },
    {
      icon: "Timer",
      title: "Gain de temps",
      body: "Sa pose est estimée environ 50 % plus rapide que celle des rubans adhésifs ou joints standards, sans fixation supplémentaire nécessaire.",
    },
    {
      icon: "Thermometer",
      title: "Résistance climatique",
      body: "Il supporte des températures extrêmes allant de -30 °C à +80 °C (temporairement 100 °C) et reste exposable aux UV pendant 4 mois avant recouvrement.",
    },
  ],
  poseTitle: "Notice d'installation",
  pose:
    "La surface doit être exempte de poussières, humidité, gel et graisse. Installer par temps sec, à une température supérieure à 0 °C (une couche d'apprêt est possible en dessous). Positionner le FlexWrap autour de la zone à coller ; ne pas l'étirer sur les sections droites (l'étirement est réservé aux angles, arrondis et coins). Maroufler fermement à la main ou au rouleau pour activer l'adhésif et chasser les bulles d'air. Une fois posé, le ruban doit être recouvert dans les 4 mois par le revêtement final. Conditionnement : 0,6 m² couverts, 3 rouleaux par boîte.",
  docUrl: "https://www.tyvek.fr",
  docLabel: "En savoir plus sur tyvek.fr",
};

export default async function TyvekFlexWrapEz2064FWPage() {
  const product = await getProductBySlug("tyvek-flexwrap-ez-2064fw");
  if (!product) notFound();
  return <TyvekProductPage product={product} content={content} />;
}
