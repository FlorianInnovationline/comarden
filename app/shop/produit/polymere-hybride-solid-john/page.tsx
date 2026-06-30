import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/shop/queries";
import { getBrand } from "@/lib/brands/config";
import BrandedProductPage from "@/components/shop/BrandedProductPage";

export const metadata: Metadata = {
  title: "Polymère hybride Solid John - Colle d'étanchéité élastique | Comarden",
  description: "Polymère hybride Solid John - Colle d'étanchéité élastique - Solid John, distribué par Comarden. Spécifications techniques, formats et conditionnement.",
};

const brand = getBrand("solid-john")!;

export default async function Page() {
  const product = await getProductBySlug("polymere-hybride-solid-john");
  if (!product) notFound();
  return <BrandedProductPage product={product} brand={brand} />;
}
