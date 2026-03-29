import { NextResponse } from "next/server";
import { RENTAL_PRODUCTS } from "@/lib/rental/data";
import { getMergedRentalProducts } from "@/lib/rental/catalog";

export const dynamic = "force-dynamic";

const seedIds = new Set(RENTAL_PRODUCTS.map((p) => p.id));

export async function GET() {
  const products = getMergedRentalProducts();
  const withFlags = products.map((p) => ({
    ...p,
    isSeed: seedIds.has(p.id),
  }));
  return NextResponse.json({ products: withFlags });
}
