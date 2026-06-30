import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import SopremaProductPage from "@/components/shop/soprema/SopremaProductPage";

export const metadata: Metadata = {
  title: "PAVAFLEX CONFORT 36 - Panneau isolant flexible en fibre de bois | Comarden",
  description: "PAVAFLEX CONFORT 36 - Panneau isolant flexible en fibre de bois - SOPREMA, distribué par Comarden. Spécifications techniques, formats et conditionnement.",
};

export default async function Page() {
  const product = await getProductBySlug("pavaflex-confort-36");
  if (!product) notFound();
  return <SopremaProductPage product={product} />;
}
