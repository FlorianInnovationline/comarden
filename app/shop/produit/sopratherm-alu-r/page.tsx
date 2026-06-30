import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import SopremaProductPage from "@/components/shop/soprema/SopremaProductPage";

export const metadata: Metadata = {
  title: "SOPRATHERM ALU R - Panneau isolant PIR parement aluminium | Comarden",
  description: "SOPRATHERM ALU R - Panneau isolant PIR parement aluminium - SOPREMA, distribué par Comarden. Spécifications techniques, formats et conditionnement.",
};

export default async function Page() {
  const product = await getProductBySlug("sopratherm-alu-r");
  if (!product) notFound();
  return <SopremaProductPage product={product} />;
}
