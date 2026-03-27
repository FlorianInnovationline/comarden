import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { RENTAL_PRODUCTS, RENTAL_CATEGORIES } from "@/lib/rental/data";
import type { RentalProduct } from "@/lib/rental/data";
import LocationPageClient from "@/components/rental/LocationPageClient";

export const metadata: Metadata = {
  title: "Location de matériel | Comarden",
  description:
    "Louez du matériel professionnel chez Comarden : cloueurs, machines à ardoises, outillage, transport et levage. Tarifs compétitifs, matériel entretenu.",
};

export const dynamic = "force-dynamic";

function getCustomProducts(): RentalProduct[] {
  try {
    const filePath = path.join(process.cwd(), "data", "rental-products.json");
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export default function LocationPage() {
  const customProducts = getCustomProducts();
  const allProducts = [...RENTAL_PRODUCTS, ...customProducts];

  const customCats = customProducts
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
