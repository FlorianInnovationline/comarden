import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import StratoGripProductPage, { type StratoGripContent } from "@/components/shop/stratogrip/StratoGripProductPage";

export const metadata: Metadata = {
  title: "STRATOGRIP T300 - Colle polyuréthane toiture plate (22 L) | Comarden",
  description:
    "STRATOGRIP T300 : colle polyuréthane monocomposant à prise rapide pour panneaux d'isolation de toiture plate (PIR, PUR, ISO, EPS, XPS). Canister 22 L, jusqu'à ± 350 m². Distribué par Comarden.",
};

const content: StratoGripContent = {
  tagline: "Colle polyuréthane professionnelle pour panneaux d'isolation de toiture plate",
  priceNote: "Canister 22 L, pour ± 350 m² de surface",
  applications: [
    { icon: "Home", label: "Toiture plate" },
    { icon: "Zap", label: "Prise rapide" },
    { icon: "SprayCan", label: "Pulvérisation" },
    { icon: "Timer", label: "± 2 min d'attente" },
    { icon: "Ruler", label: "± 350 m²/canister" },
  ],
  concept: {
    heading: "Une colle spécialement conçue pour l'isolation des toitures plates",
    paragraphs: [
      "La STRATOGRIP T300 est un adhésif monocomposant à base de mousse polyuréthane, durcissant sous l'effet de l'humidité.",
      "Elle est conçue pour offrir une adhérence forte, homogène et durable lors de la pose de panneaux isolants en toiture plate, aussi bien en construction neuve qu'en rénovation.",
      "Son conditionnement professionnel permet une mise en œuvre rapide sur de grandes surfaces et contribue à réduire considérablement le temps consacré au collage des panneaux d'isolation.",
    ],
  },
  panels: [
    "Panneaux d'isolation PIR",
    "Panneaux d'isolation PUR",
    "Panneaux ISO",
    "Panneaux d'isolation à surface tissée",
    "Polystyrène expansé EPS",
    "Polystyrène extrudé XPS",
  ],
  supports: [
    "Béton",
    "Contreplaqué",
    "Panneaux cimentaires",
    "Certains supports bitumineux existants (rénovation)",
  ],
  avantagesCards: [
    { title: "Application rapide", text: "Son système monocomposant et son conditionnement en canister permettent une application simple et rapide directement sur le support." },
    { title: "Jusqu'à ± 350 m² par canister*", text: "Un canister de 22 litres permet de traiter jusqu'à environ 350 m², selon les conditions d'application, le support et le mode de mise en œuvre." },
    { title: "Temps d'attente très court", text: "Après application, le temps d'attente avant la mise en place de l'isolant peut être de maximum 2 minutes*, permettant d'accélérer fortement la pose sur chantier." },
    { title: "Gain de temps sur chantier", text: "Le système de pulvérisation permet une application rapide et régulière et peut apporter un gain de temps important par rapport à certains systèmes de collage traditionnels." },
    { title: "Moins de déchets", text: "Le conditionnement en canister permet de réduire fortement le volume de déchets d'emballage généré sur chantier." },
    { title: "Collage solide et durable", text: "Une fois polymérisée, la colle assure un maintien fiable des panneaux isolants et contribue à la réalisation d'un complexe de toiture stable et durable." },
    { title: "Solution adaptée aux professionnels", text: "Développée pour les couvreurs, étancheurs et entreprises spécialisées dans les toitures plates, recherchant rapidité d'application, rendement et fiabilité." },
  ],
  applicationsList: [
    "La pose d'isolants sur toiture plate",
    "Les nouvelles constructions",
    "La rénovation de toitures plates",
    "Le collage de panneaux PIR, PUR, ISO, EPS ou XPS",
    "Le collage sur béton, contreplaqué ou panneaux cimentaires",
    "Les chantiers nécessitant une mise en œuvre rapide sur de grandes surfaces",
    "Certaines rénovations sur supports bitumineux existants",
  ],
};

export default async function StratogripT30022lPage() {
  const product = await getProductBySlug("stratogrip-t300-22l");
  if (!product) notFound();
  return <StratoGripProductPage product={product} content={content} />;
}
