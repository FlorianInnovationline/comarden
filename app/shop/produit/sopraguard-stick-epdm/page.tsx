import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import SopremaProductPage from "@/components/shop/soprema/SopremaProductPage";

export const metadata: Metadata = {
  title: "SOPRAGUARD STICK - Membrane EPDM auto-adhésive | Comarden",
  description: "SOPRAGUARD STICK - Membrane EPDM auto-adhésive - SOPREMA, distribué par Comarden. Spécifications techniques, formats et conditionnement.",
};

export default async function Page() {
  const product = await getProductBySlug("sopraguard-stick-epdm");
  if (!product) notFound();
  return <SopremaProductPage product={product} />;
}
