import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import AmianteProductPage, { type AmianteContent } from "@/components/shop/amiante/AmianteProductPage";

export const metadata: Metadata = {
  title: "Gants OXXA Nitri-Tech 14-690 taille 10 - Boîte de 144 paires | Comarden",
  description:
    "Gants OXXA Nitri-Tech 14-690 (taille 10) avec enduction mousse nitrile, sans couture, dos respirant. Protection mécanique en complément des EPI amiante. Boîte de 144 paires. Distribué par Comarden.",
  robots: { index: false, follow: false },
};

const content: AmianteContent = {
  tagline: "Gants de protection mécanique (complément EPI)",
  utilisation:
    "Les gants OXXA Nitri-Tech 14-690 s'utilisent pour les travaux de toiture et de rénovation, la manutention de matériaux, la préparation de chantier, les travaux de maintenance, la manipulation d'outillage, les interventions en environnement sec, gras ou légèrement huileux, et en complément d'EPI lors de travaux sur matériaux sensibles, selon l'analyse de risque.",
  pointsAttention: [
    "Ces gants protègent les mains contre les risques mécaniques légers à modérés, mais ne sont pas des gants spécifiques de désamiantage.",
    "En présence d'amiante, ils doivent être utilisés avec les autres EPI adaptés : masque P3, combinaison jetable, lunettes et procédures de décontamination.",
    "Ne pas utiliser en cas de coupure, déchirure ou usure importante.",
    "Vérifier que la taille 10 convient à l'utilisateur pour garantir confort et précision.",
    "Ne pas utiliser pour la manipulation de produits chimiques agressifs sans vérification de compatibilité.",
    "Remplacer les gants après contamination ou lorsqu'ils ne garantissent plus une bonne protection.",
    "Respecter les procédures légales en vigueur pour les chantiers amiante.",
  ],
  epi: ["combinaison-sms-cat3-type5-6", "demi-masque-bls-4000-next", "filtres-bls-202-p3r"],
};

export default async function GantsOxxaNitriTech14690Page() {
  const product = await getProductBySlug("gants-oxxa-nitri-tech-14-690");
  if (!product) notFound();
  return <AmianteProductPage product={product} content={content} />;
}
