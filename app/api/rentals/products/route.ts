import { NextRequest, NextResponse } from "next/server";
import { RENTAL_PRODUCTS, type RentalProduct } from "@/lib/rental/data";
import {
  isRentalSeedId,
  readCustomRentalProducts,
  readRentalOverridesFile,
  writeCustomRentalProducts,
  writeRentalOverrides,
} from "@/lib/rental/catalog";

function buildPayload(body: Record<string, unknown>): Omit<RentalProduct, "id"> {
  return {
    name: String(body.name ?? ""),
    ref: body.ref != null && body.ref !== "" ? String(body.ref) : undefined,
    category: String(body.category ?? ""),
    description: String(body.description ?? ""),
    features: Array.isArray(body.features) ? (body.features as string[]) : [],
    applications: Array.isArray(body.applications) ? (body.applications as string[]) : [],
    variants: Array.isArray(body.variants) ? (body.variants as string[]) : [],
    priceCents: Number(body.priceCents),
    priceUnit: body.priceUnit as RentalProduct["priceUnit"],
    image: body.image != null && body.image !== "" ? String(body.image) : undefined,
  };
}

export async function GET() {
  const products = readCustomRentalProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, category, description, priceCents, priceUnit } = body;

    if (!name || !category || !description || !priceCents || !priceUnit) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const products = readCustomRentalProducts();
    const payload = buildPayload(body);

    const newProduct: RentalProduct = {
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ...payload,
    };

    products.push(newProduct);
    writeCustomRentalProducts(products);

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing product id" }, { status: 400 });
    }

    const payload = buildPayload(body);

    if (isRentalSeedId(id)) {
      const base = RENTAL_PRODUCTS.find((p) => p.id === id);
      if (!base) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }

      const overrides = readRentalOverridesFile();
      overrides[id] = {
        ...overrides[id],
        ...payload,
      };
      writeRentalOverrides(overrides);

      const merged: RentalProduct = { ...base, ...overrides[id], id };
      return NextResponse.json({ success: true, product: merged });
    }

    const products = readCustomRentalProducts();
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    products[idx] = {
      ...products[idx],
      ...payload,
      id,
    };

    writeCustomRentalProducts(products);
    return NextResponse.json({ success: true, product: products[idx] });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing product id" }, { status: 400 });
    }

    if (isRentalSeedId(id)) {
      return NextResponse.json(
        { error: "Les produits du catalogue par défaut ne peuvent pas être supprimés" },
        { status: 400 }
      );
    }

    const products = readCustomRentalProducts();
    const filtered = products.filter((p) => p.id !== id);

    if (filtered.length === products.length) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    writeCustomRentalProducts(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
