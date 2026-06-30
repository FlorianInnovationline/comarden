import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import SopremaProductPage from "@/components/shop/soprema/SopremaProductPage";

export const metadata: Metadata = {
  title: "SOPRAVAP 3/1 - Résine primaire, pare-vapeur et colle | Comarden",
  description: "SOPRAVAP 3/1 - Résine primaire, pare-vapeur et colle - SOPREMA, distribué par Comarden. Spécifications techniques, formats et conditionnement.",
};

export default async function Page() {
  const product = await getProductBySlug("sopravap-3-1");
  if (!product) notFound();
  return <SopremaProductPage product={product} />;
}
