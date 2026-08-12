import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import StratoGripProductPage, { type StratoGripContent } from "@/components/shop/stratogrip/StratoGripProductPage";

export const metadata: Metadata = {
  title: "Pistolet pour STRATOGRIP T300 (colle PU) + Tuyau 2 m | Comarden",
  description:
    "Pistolet applicateur professionnel pour la colle polyuréthane STRATOGRIP T300, livré avec un tuyau de 2 m. Application régulière et maîtrisée. Distribué par Comarden.",
};

const content: StratoGripContent = {
  tagline: "Pistolet applicateur pour colle PU T300, tuyau 2 m inclus",
  applications: [
    { icon: "SprayCan", label: "Pulvérisation" },
    { icon: "Wrench", label: "Applicateur" },
    { icon: "Cable", label: "Tuyau 2 m" },
  ],
};

export default async function PistoletT300Tuyau2mPage() {
  const product = await getProductBySlug("pistolet-t300-tuyau-2m");
  if (!product) notFound();
  return <StratoGripProductPage product={product} content={content} />;
}
