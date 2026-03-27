import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { RentalProduct } from "@/lib/rental/data";

const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "rental-products.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, "[]", "utf-8");
  }
}

function readProducts(): RentalProduct[] {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(PRODUCTS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeProducts(products: RentalProduct[]) {
  ensureDataDir();
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");
}

export async function GET() {
  const products = readProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, category, description, priceCents, priceUnit } = body;

    if (!name || !category || !description || !priceCents || !priceUnit) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const products = readProducts();

    const newProduct: RentalProduct = {
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      ref: body.ref || undefined,
      category,
      description,
      features: body.features || [],
      applications: body.applications || [],
      variants: body.variants || [],
      priceCents: Number(priceCents),
      priceUnit,
      image: body.image || undefined,
    };

    products.push(newProduct);
    writeProducts(products);

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

    const products = readProducts();
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    products[idx] = {
      ...products[idx],
      name: body.name ?? products[idx].name,
      ref: body.ref !== undefined ? body.ref || undefined : products[idx].ref,
      category: body.category ?? products[idx].category,
      description: body.description ?? products[idx].description,
      features: body.features ?? products[idx].features,
      applications: body.applications ?? products[idx].applications,
      variants: body.variants ?? products[idx].variants,
      priceCents: body.priceCents != null ? Number(body.priceCents) : products[idx].priceCents,
      priceUnit: body.priceUnit ?? products[idx].priceUnit,
      image: body.image !== undefined ? body.image || undefined : products[idx].image,
    };

    writeProducts(products);
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

    const products = readProducts();
    const filtered = products.filter((p) => p.id !== id);

    if (filtered.length === products.length) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    writeProducts(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
