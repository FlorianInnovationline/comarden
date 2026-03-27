import type { Metadata } from "next";
import { RENTAL_PRODUCTS, RENTAL_CATEGORIES } from "@/lib/rental/data";
import LocationPageClient from "@/components/rental/LocationPageClient";

export const metadata: Metadata = {
  title: "Location de matériel | Comarden",
  description:
    "Louez du matériel professionnel chez Comarden : cloueurs, machines à ardoises, outillage, transport et levage. Tarifs compétitifs, matériel entretenu.",
};

export default function LocationPage() {
  return (
    <LocationPageClient
      products={RENTAL_PRODUCTS}
      categories={RENTAL_CATEGORIES as unknown as string[]}
    />
  );
}
