import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import AmianteProductPage, { type AmianteContent } from "@/components/shop/amiante/AmianteProductPage";

export const metadata: Metadata = {
  title: "Demi-masque BLS 4000 NEXT - Protection respiratoire amiante | Comarden",
  description:
    "Demi-masque respiratoire réutilisable BLS 4000 NEXT à connexion B-Lock. À équiper de filtres P3 pour les travaux amiante. Le masque seul ne protège pas. Distribué par Comarden.",
  robots: { index: false, follow: false },
};

const content: AmianteContent = {
  tagline: "Demi-masque respiratoire réutilisable (à équiper de filtres P3)",
  utilisation:
    "Le masque BLS 4000 NEXT s'utilise pour les travaux de rénovation, toiture, maintenance, désamiantage ou manipulation de matériaux susceptibles de libérer des fibres ou poussières dangereuses. Pour une utilisation en présence d'amiante, il doit impérativement être équipé de filtres P3 adaptés : le masque seul ne protège pas contre les fibres d'amiante. Avant utilisation, vérifier la bonne taille du masque, l'état général du masque et des joints, la bonne fixation des filtres, l'étanchéité sur le visage et l'absence de barbe ou d'élément pouvant nuire à l'étanchéité.",
  pointsAttention: [
    "Utiliser uniquement avec des filtres compatibles et adaptés au risque amiante, idéalement P3.",
    "Remplacer les filtres selon les recommandations du fabricant, la durée d'utilisation et le niveau d'exposition.",
    "Nettoyer et décontaminer le masque après chaque intervention en zone contaminée.",
    "Ne jamais utiliser un masque endommagé, mal ajusté ou avec des filtres saturés.",
    "Respecter les procédures légales en vigueur pour les travaux liés à l'amiante.",
    "Le port d'un masque ne remplace pas les autres équipements de protection : combinaison, gants, lunettes, procédures de confinement et gestion des déchets.",
  ],
  epi: ["filtres-bls-202-p3r", "couvercle-filtre-bls-200-p3"],
};

export default async function DemiMasqueBls4000NextPage() {
  const product = await getProductBySlug("demi-masque-bls-4000-next");
  if (!product) notFound();
  return <AmianteProductPage product={product} content={content} />;
}
