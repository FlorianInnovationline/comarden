import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import TyvekProductPage, { type TyvekProductContent } from "@/components/shop/tyvek/TyvekProductPage";

export const metadata: Metadata = {
  title: "DuPont™ AirGuard® Sd23 8207A - Pare-vapeur translucide | Comarden",
  description:
    "AirGuard® Sd23 8207A : pare-vapeur (frein-vapeur) translucide et hautement résistant. Étanche à l'eau et à l'air, Sd 23 m, idéal en pose sarking sous PUR/PIR (NIT 251). Garantie 25 ans. Caractéristiques techniques complètes. Distribué par Comarden.",
};

const content: TyvekProductContent = {
  breadcrumb: "Pare-vapeur",
  tagline: "Pare-vapeur translucide et hautement résistant",
  intro:
    "DuPont™ AirGuard® Sd23 8207A est un pare-vapeur (frein-vapeur) translucide et hautement résistant, étanche à l'eau et à l'air. Sa translucidité offre une parfaite visibilité de l'installation de l'isolant. Idéal sous l'isolant en PUR/PIR en pose sarking suivant les recommandations de la NIT 251, il réduit le risque de condensation dans l'isolation et élimine les pertes de chaleur par convection. Garantie 25 ans.",
  caracteristiques: [
    "Étanche à l'eau et à l'air",
    "Translucide - visibilité de l'isolant",
    "Hautes résistances mécaniques",
    "Classement au feu : E",
    "Léger et facile à installer",
    "Résistant 4 semaines aux rayons UV",
  ],
  whyEyebrow: "AirGuard® Sd23",
  whyTitle: "Caractéristiques et avantages",
  whyPoints: [
    {
      icon: "Droplets",
      title: "Étanche à l'eau et à l'air",
      body: "Le risque de condensation dans l'isolation est réduit : la membrane bloque le passage de l'humidité et de l'air vers l'isolant.",
    },
    {
      icon: "Wind",
      title: "Contrôle les mouvements de l'air",
      body: "En supprimant les fuites d'air parasites, AirGuard® Sd23 élimine les pertes de chaleur par convection et améliore la performance énergétique.",
    },
    {
      icon: "Gauge",
      title: "Transmission de la vapeur d'eau (Sd) 23 m",
      body: "Un pouvoir de freinage de vapeur élevé qui limite la transmission de la vapeur d'eau vers l'isolant tout au long de l'année.",
    },
    {
      icon: "Eye",
      title: "Léger et translucide",
      body: "Facile à installer et à manipuler, sa translucidité permet une parfaite visibilité de l'installation de l'isolant pendant la pose.",
    },
    {
      icon: "ShieldCheck",
      title: "Hautes résistances mécaniques et UV",
      body: "Résistant 4 semaines aux rayons UV et doté de hautes résistances mécaniques, il réduit le risque de dégradation ou de pénétration d'air.",
    },
    {
      icon: "Award",
      title: "Pare-vapeur durable",
      body: "Conçu pour durer, AirGuard® Sd23 est couvert par une garantie de 25 ans.",
    },
  ],
  poseTitle: "Mise en œuvre",
  pose:
    "AirGuard® Sd23 se pose côté chaud de l'isolant, logo lisible du côté installateur, avec recouvrement des lés. Il est idéal sous l'isolant en PUR/PIR en pose sarking suivant les recommandations de la NIT 251. Traitez les recouvrements, jonctions et pénétrations avec la bande adhésive Tyvek® Tape Plus (2062B) ou le Tyvek® FlexWrap pour garantir la continuité de l'étanchéité à l'air. Disponible en 1,5 m x 50 m et 2,8 m x 50 m.",
  docUrl: "https://www.tyvek.fr",
  docLabel: "En savoir plus sur tyvek.fr",
};

export default async function AirGuardSd23Page() {
  const product = await getProductBySlug("airguard-sd23-8207a");
  if (!product) notFound();
  return <TyvekProductPage product={product} content={content} />;
}
