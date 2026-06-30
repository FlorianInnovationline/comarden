import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import SopremaProductPage from "@/components/shop/soprema/SopremaProductPage";

export const metadata: Metadata = {
  title: "MONOGUM 4 TF - Membrane bitumineuse APP de finition | Comarden",
  description: "MONOGUM 4 TF - Membrane bitumineuse APP de finition - SOPREMA, distribué par Comarden. Spécifications techniques, formats et conditionnement.",
};

export default async function Page() {
  const product = await getProductBySlug("monogum-4-tf");
  if (!product) notFound();
  return <SopremaProductPage product={product} />;
}
