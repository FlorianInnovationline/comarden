import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import SopremaProductPage from "@/components/shop/soprema/SopremaProductPage";

export const metadata: Metadata = {
  title: "ISOLAIR MULTI - Panneau pare-pluie en fibre de bois | Comarden",
  description: "ISOLAIR MULTI - Panneau pare-pluie en fibre de bois - SOPREMA, distribué par Comarden. Spécifications techniques, formats et conditionnement.",
};

export default async function Page() {
  const product = await getProductBySlug("isolair-multi");
  if (!product) notFound();
  return <SopremaProductPage product={product} />;
}
