import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import AlgimoussProductPage, { type AlgimoussProductContent } from "@/components/shop/algimouss/AlgimoussProductPage";

export const metadata: Metadata = {
  title: "ALGIALGUES - Traitement toiture, mur et façade (à diluer) | Comarden",
  description:
    "ALGIALGUES d'Algimouss : traitement anti-mousse à diluer pour toitures, murs et façades. Élimine durablement lichens, algues et moisissures, sans rinçage et sans chlore. Mode d'emploi et caractéristiques complètes. Distribué par Comarden.",
};

const content: AlgimoussProductContent = {
  breadcrumb: "Traitement",
  tagline: "Traitement toiture, mur et façade - à diluer",
  intro:
    "ALGIALGUES est un traitement curatif et préventif à diluer qui élimine durablement lichens, algues et moisissures sur les toitures, les murs et les façades, et retarde leur réapparition. Sans rinçage et sans chlore, il ne modifie pas l'aspect ni la structure des supports, y compris le zinc.",
  caracteristiques: [
    "Élimine lichens, algues et moisissures",
    "Retarde leur réapparition",
    "Sans rinçage",
    "Sans chlore",
    "Facile et rapide à appliquer",
    "Ne modifie pas les supports (y compris le zinc)",
  ],
  supports: [
    { label: "Toitures", value: "Ardoises, fibres-ciment, tuiles (béton, terre cuite), shingles, plastiques..." },
    { label: "Murs et façades", value: "Enduits, crépis, peintures, bois, pierres, briques..." },
  ],
  modeEmploi: [
    "En présence de mousses épaisses ou de grosses plaques de lichens, effectuer un brossage ou un grattage préalable.",
    "Protéger les surfaces qui n'ont pas à être traitées.",
    "Par temps très chaud, humidifier les surfaces à traiter afin de les refroidir, puis laisser sécher.",
    "Diluer le produit à raison de 1 L pour 1 L à 5 L d'eau selon l'encrassement du support.",
    "Pulvériser le mélange sur le support.",
    "Ne jamais rincer après application.",
    "Nettoyer les outils à l'eau après utilisation.",
  ],
  recommandations: [
    "En présence d'un encrassement important, procéder à un nettoyage préalable avec Alginet toitures, Alginet dallages ou Algiclean selon le support.",
    "Sur les toitures en ardoise, effectuer 2 applications successives pour une meilleure imprégnation.",
    "Recommandé avant mise en peinture pour éviter le cloquage et l'écaillement.",
    "Délai d'action : 3 à 9 mois.",
    "Conditions d'application : entre 5 °C et 25 °C.",
    "Prévoir au moins 12 heures sans pluie après application.",
    "En cas de récupération des eaux de pluie, effectuer une dérivation pendant les 2 à 3 pluies suivant l'application.",
  ],
  docUrl: "https://algimouss.com/",
  docLabel: "En savoir plus sur algimouss.com",
};

export default async function AlgialguesPage() {
  const product = await getProductBySlug("algialgues");
  if (!product) notFound();
  return <AlgimoussProductPage product={product} content={content} />;
}
