import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import AmianteProductPage, { type AmianteContent } from "@/components/shop/amiante/AmianteProductPage";

export const metadata: Metadata = {
  title: "AMISEAL-FIX 11 - Fixateur pour fibres d'amiante | Comarden",
  description:
    "AMISEAL-FIX 11 : émulsion fixatrice à haut pouvoir de pénétration pour fixer, stabiliser et sceller les fibres d'amiante. Sans solvants ni COV. EPI obligatoires. Distribué par Comarden.",
  robots: { index: false, follow: false },
};

const content: AmianteContent = {
  tagline: "Fixateur d'amiante à haut pouvoir de pénétration",
  utilisation:
    "AMISEAL-FIX 11 s'utilise aussi bien en intérieur qu'en extérieur, sur plaques ondulées en amiante-ciment, anciennes couvertures, matériaux d'isolation, enduits, cimentages, revêtements et peintures contaminés. Avant application, le support doit être débarrassé des éléments non adhérents, saletés, mousses, algues ou dépôts pouvant empêcher une bonne imprégnation, et ne doit pas présenter d'eau stagnante. Bien homogénéiser le produit dans son emballage d'origine avant utilisation ; ne pas diluer. Appliquer jusqu'à saturation complète du support, en une ou plusieurs passes selon l'absorption du matériau ; sur les supports très poreux, une application mouillé sur mouillé peut être nécessaire. Consommation indicative : jusqu'à 12 m² par litre. Température d'application entre +5 °C et +35 °C, positive pendant au moins 24 heures. Temps de séchage indicatif de 1 à 12 heures selon les conditions de chantier.",
  pointsAttention: [
    "Les travaux sur matériaux contenant de l'amiante doivent toujours être réalisés dans le strict respect des législations et réglementations locales en vigueur.",
    "Le port des équipements de protection individuelle adaptés est obligatoire lors d'interventions sur supports amiantés : protection respiratoire appropriée, combinaison, gants et procédures de sécurité conformes au chantier.",
    "AMISEAL-FIX 11 ne remplace pas une analyse amiante, un inventaire amiante ou une procédure officielle de désamiantage. Il s'agit d'un produit destiné à fixer et limiter la dispersion des fibres, dans le cadre d'une intervention maîtrisée.",
    "Ne pas appliquer sur support gelé, en cas de température inférieure à +5 °C, supérieure à +35 °C, ou si un risque de gel est prévu dans les 24 heures.",
    "Après utilisation, le matériel contaminé, comme les rouleaux ou brosses, doit être traité conformément aux règles applicables aux déchets liés à l'amiante.",
  ],
  epi: ["demi-masque-bls-4000-next", "filtres-bls-202-p3r", "combinaison-sms-cat3-type5-6", "gants-oxxa-nitri-tech-14-690"],
};

export default async function AmisealFix11Page() {
  const product = await getProductBySlug("amiseal-fix-11");
  if (!product) notFound();
  return <AmianteProductPage product={product} content={content} />;
}
