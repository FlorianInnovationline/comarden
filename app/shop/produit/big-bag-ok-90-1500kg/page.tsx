import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import AmianteProductPage, { type AmianteContent } from "@/components/shop/amiante/AmianteProductPage";

export const metadata: Metadata = {
  title: "Big Bag OK 90 x 90 x 110 cm avec liner - SWL 1500 kg (déchets amiante) | Comarden",
  description:
    "Big Bag OK 90 x 90 x 110 cm avec impression et liner intérieur pour le conditionnement et le transport sécurisé des déchets amiante. Capacité 1 m³, SWL 1500 kg. Distribué par Comarden.",
  robots: { index: false, follow: false },
};

const content: AmianteContent = {
  tagline: "Conditionnement sécurisé des déchets amiante (avec liner)",
  utilisation:
    "Le Big Bag OK avec liner s'utilise pour les déchets de chantier contaminés ou sensibles, les plaques ondulées, fragments ou petits éléments en amiante-ciment, les déchets issus de travaux de toiture et de rénovation, les matériaux poussiéreux nécessitant un emballage renforcé, et le stockage temporaire et l'évacuation vers une filière agréée. Avant remplissage, placer le big bag sur une surface stable, plane et propre, en évitant les éléments tranchants ou coupants pouvant perforer le sac ou le liner. Après remplissage, refermer correctement le liner et le système de fermeture afin de limiter la dispersion de poussières ou de fibres.",
  pointsAttention: [
    "Respecter la charge maximale SWL 1500 kg.",
    "Ne pas dépasser le volume utile du sac.",
    "Ne jamais traîner le big bag au sol : le déplacer uniquement avec un engin adapté.",
    "Vérifier l'état du sac, des coutures, des sangles et du liner avant utilisation.",
    "Ne pas utiliser si le sac est déchiré, percé ou si le liner est endommagé.",
    "Pour les déchets amiantés, respecter strictement les procédures légales de conditionnement, étiquetage, transport et élimination.",
    "Les déchets amiantés doivent être confiés à une filière autorisée.",
    "Porter les EPI adaptés : masque P3, combinaison jetable, gants, lunettes et protection des chaussures.",
    "Ne pas mélanger les déchets amiantés avec des déchets classiques.",
  ],
  epi: ["demi-masque-bls-4000-next", "filtres-bls-202-p3r", "combinaison-sms-cat3-type5-6", "gants-oxxa-nitri-tech-14-690"],
};

export default async function BigBagOk901500kgPage() {
  const product = await getProductBySlug("big-bag-ok-90-1500kg");
  if (!product) notFound();
  return <AmianteProductPage product={product} content={content} />;
}
