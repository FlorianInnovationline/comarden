import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import AmianteProductPage, { type AmianteContent } from "@/components/shop/amiante/AmianteProductPage";

export const metadata: Metadata = {
  title: "Combinaison SMS blanche Cat. III Type 5/6 - Protection amiante | Comarden",
  description:
    "Combinaison de protection jetable SMS blanche Cat. III Type 5/6 pour chantiers amiante. Matière SMS respirante, usage unique. À porter avec masque P3, gants et lunettes. Distribué par Comarden.",
  robots: { index: false, follow: false },
};

const content: AmianteContent = {
  tagline: "Combinaison de protection jetable Cat. III Type 5/6",
  utilisation:
    "La combinaison SMS Cat. III Type 5/6 s'utilise pour les interventions sur plaques ondulées en amiante-ciment, les travaux de toiture et de rénovation, la maintenance de bâtiments anciens, la protection contre les poussières fines et fibres dangereuses, les travaux préparatoires avant désamiantage et les interventions nécessitant une combinaison jetable à usage unique. Pour une protection optimale, porter la combinaison avec les EPI adaptés : masque respiratoire avec filtre P3, gants, lunettes, surchaussures ou bottes de sécurité.",
  pointsAttention: [
    "La combinaison doit être utilisée comme EPI à usage unique.",
    "Type 5 : protection contre les particules solides et poussières dangereuses.",
    "Type 6 : protection limitée contre les éclaboussures légères de liquides.",
    "Elle ne remplace pas une procédure officielle de désamiantage ou de confinement.",
    "Vérifier la bonne taille avant utilisation afin de garantir le confort et la liberté de mouvement.",
    "Fermer correctement la tirette et ajuster la capuche, les poignets et les chevilles.",
    "Après intervention sur matériaux amiantés, la combinaison doit être traitée comme un déchet contaminé selon la réglementation en vigueur.",
    "Ne pas réutiliser une combinaison contaminée, déchirée ou endommagée.",
  ],
  epi: ["demi-masque-bls-4000-next", "filtres-bls-202-p3r", "gants-oxxa-nitri-tech-14-690", "big-bag-ok-90-1500kg"],
};

export default async function CombinaisonSmsCat3Type56Page() {
  const product = await getProductBySlug("combinaison-sms-cat3-type5-6");
  if (!product) notFound();
  return <AmianteProductPage product={product} content={content} />;
}
