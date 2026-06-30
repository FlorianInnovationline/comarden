import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import SopremaProductPage from "@/components/shop/soprema/SopremaProductPage";

export const metadata: Metadata = {
  title: "SOPRAGUM OPTIMA 4 TmF C1 FR - Membrane APP de finition ignifuge | Comarden",
  description: "SOPRAGUM OPTIMA 4 TmF C1 FR - Membrane APP de finition ignifuge - SOPREMA, distribué par Comarden. Spécifications techniques, formats et conditionnement.",
};

export default async function Page() {
  const product = await getProductBySlug("sopragum-optima-4-tmf-c1-fr");
  if (!product) notFound();
  return <SopremaProductPage product={product} />;
}
