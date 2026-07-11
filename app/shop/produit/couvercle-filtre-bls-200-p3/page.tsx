import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import AmianteProductPage, { type AmianteContent } from "@/components/shop/amiante/AmianteProductPage";

export const metadata: Metadata = {
  title: "Couvercle filtre BLS série 200 P3 - Accessoire préfiltre (paire) | Comarden",
  description:
    "Couvercle filtre BLS série 200 modèle P3 (paire) : maintient et protège le préfiltre P3 sur les filtres BLS 200. À utiliser avec masque + filtres P3. Distribué par Comarden.",
  robots: { index: false, follow: false },
};

const content: AmianteContent = {
  tagline: "Accessoire de maintien et protection du préfiltre P3",
  utilisation:
    "Le couvercle se place sur le filtre compatible de la série BLS 200 afin de maintenir le préfiltre P3 en position. Il est recommandé pour maintenir correctement le préfiltre P3, protéger le filtre contre les salissures et projections, compléter un équipement respiratoire BLS pour chantier amiante, et pour les interventions en toiture, rénovation, désamiantage et maintenance, ainsi que les environnements exposés aux poussières fines, fibres et particules dangereuses. Avant utilisation, vérifier que le préfiltre est bien positionné et que le couvercle est correctement clipsé.",
  pointsAttention: [
    "Le couvercle seul ne protège pas contre l'amiante. Il doit être utilisé avec un masque, des filtres et/ou préfiltres P3 adaptés.",
    "Vérifier la compatibilité avec les filtres BLS série 200 avant utilisation.",
    "Ne pas utiliser un couvercle fissuré, déformé ou mal fixé.",
    "Remplacer l'accessoire en cas d'usure ou de mauvaise tenue.",
    "Respecter les procédures de sécurité et la réglementation amiante en vigueur.",
    "Porter les autres EPI nécessaires : combinaison, gants, lunettes, protection respiratoire complète et procédures de décontamination.",
  ],
  epi: ["demi-masque-bls-4000-next", "filtres-bls-202-p3r"],
};

export default async function CouvercleFiltreBls200P3Page() {
  const product = await getProductBySlug("couvercle-filtre-bls-200-p3");
  if (!product) notFound();
  return <AmianteProductPage product={product} content={content} />;
}
