import type { Metadata } from "next";
import { RENTAL_CATEGORIES } from "@/lib/rental/data";
import type { RentalProduct } from "@/lib/rental/data";
import { getMergedRentalProducts } from "@/lib/rental/catalog";
import LocationPageClient from "@/components/rental/LocationPageClient";

export const metadata: Metadata = {
  title: "Location de matériel | Comarden",
  description:
    "Louez du matériel professionnel chez Comarden : cloueurs, machines à ardoises, outillage, transport et levage. Tarifs compétitifs, matériel entretenu.",
};

export const dynamic = "force-dynamic";

export default function LocationPage() {
  const allProducts: RentalProduct[] = getMergedRentalProducts();

  const customCats = allProducts
    .map((p) => p.category)
    .filter((c) => !(RENTAL_CATEGORIES as readonly string[]).includes(c));
  const uniqueCustomCats = [...new Set(customCats)];
  const allCategories = [
    ...(RENTAL_CATEGORIES as unknown as string[]),
    ...uniqueCustomCats,
  ];

  return (
    <LocationPageClient products={allProducts} categories={allCategories} />
  );
}
