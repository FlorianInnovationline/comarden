import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import SopremaProductPage from "@/components/shop/soprema/SopremaProductPage";

export const metadata: Metadata = {
  title: "ALSAN FLASHING QUADRO - Résine étanchéité polyuréthane | Comarden",
  description: "ALSAN FLASHING QUADRO - Résine étanchéité polyuréthane - SOPREMA, distribué par Comarden. Spécifications techniques, formats et conditionnement.",
};

export default async function Page() {
  const product = await getProductBySlug("alsan-flashing-quadro");
  if (!product) notFound();
  return <SopremaProductPage product={product} />;
}
