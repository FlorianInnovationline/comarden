import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import SopremaProductPage from "@/components/shop/soprema/SopremaProductPage";

export const metadata: Metadata = {
  title: "SOPRASTICK VENTI FF - Membrane sous-couche autoadhésive | Comarden",
  description: "SOPRASTICK VENTI FF - Membrane sous-couche autoadhésive - SOPREMA, distribué par Comarden. Spécifications techniques, formats et conditionnement.",
};

export default async function Page() {
  const product = await getProductBySlug("soprastick-venti-ff");
  if (!product) notFound();
  return <SopremaProductPage product={product} />;
}
