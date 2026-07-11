import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import AmianteProductPage, { type AmianteContent } from "@/components/shop/amiante/AmianteProductPage";

export const metadata: Metadata = {
  title: "Filtres BLS 202 P3 R - Classe P3 pour amiante (paire) | Comarden",
  description:
    "Filtres à particules BLS 202 P3 R (paire) à connexion B-Lock pour masques BLS 4000 NEXT / 5000. Classe P3 R adaptée à l'amiante. Toujours par paire. Distribué par Comarden.",
  robots: { index: false, follow: false },
};

const content: AmianteContent = {
  tagline: "Filtres à particules classe P3 R (paire)",
  utilisation:
    "Le filtre BLS 202 P3 R s'utilise par paire sur les masques compatibles BLS équipés du système B-Lock. Il est recommandé pour les travaux sur plaques ondulées en amiante-ciment, les interventions de rénovation et de maintenance en toiture, la manipulation de matériaux contenant des fibres d'amiante, la protection contre poussières toxiques, fibres et particules fines, et les chantiers de désamiantage réalisés selon les règles en vigueur. Avant chaque utilisation, vérifier que les filtres sont correctement clipsés, non endommagés et adaptés au risque présent sur le chantier.",
  pointsAttention: [
    "Le filtre doit toujours être utilisé avec un masque compatible BLS 4000 NEXT ou BLS 5000.",
    "Pour l'amiante, utiliser impérativement une protection de classe P3.",
    "Le masque et les filtres doivent être parfaitement ajustés pour garantir l'étanchéité.",
    "Ne pas utiliser si le filtre est endommagé, saturé, humide ou contaminé.",
    "Remplacer les filtres selon la durée d'exposition, les recommandations du fabricant et les procédures de sécurité du chantier.",
    "Ne pas utiliser lorsque le type ou la concentration du contaminant est inconnu.",
    "Respecter la réglementation amiante en vigueur et porter les autres EPI nécessaires : combinaison, gants, lunettes, protection des déchets et procédures de décontamination.",
  ],
  epi: ["demi-masque-bls-4000-next", "couvercle-filtre-bls-200-p3"],
};

export default async function FiltresBls202P3rPage() {
  const product = await getProductBySlug("filtres-bls-202-p3r");
  if (!product) notFound();
  return <AmianteProductPage product={product} content={content} />;
}
