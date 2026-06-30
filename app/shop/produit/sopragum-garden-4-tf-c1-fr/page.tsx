import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import SopremaProductPage from "@/components/shop/soprema/SopremaProductPage";

export const metadata: Metadata = {
  title: "SOPRAGUM GARDEN 4 TF C1 FR - Membrane anti-racines toiture végétalisée | Comarden",
  description: "SOPRAGUM GARDEN 4 TF C1 FR - Membrane anti-racines toiture végétalisée - SOPREMA, distribué par Comarden. Spécifications techniques, formats et conditionnement.",
};

export default async function Page() {
  const product = await getProductBySlug("sopragum-garden-4-tf-c1-fr");
  if (!product) notFound();
  return <SopremaProductPage product={product} />;
}
