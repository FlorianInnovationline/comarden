import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/shop/queries";
import { slugify } from "@/lib/shop/utils";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const active =
      searchParams.get("active") === "true"
        ? true
        : searchParams.get("active") === "false"
          ? false
          : undefined;
    const search = searchParams.get("search") || undefined;

    const products = await getProducts({ categoryId, active, search });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

interface CreateProductBody {
  title: string;
  slug?: string;
  description?: string | null;
  price_cents: number;
  currency?: string;
  sku?: string | null;
  stock?: number;
  is_active?: boolean;
  category_id?: string | null;
  images?: string[];
  tags?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateProductBody;

    if (!isSupabaseConfigured()) {
      console.log("[products] Product created (fallback - no DB):", body);
      return NextResponse.json(
        { id: `prod-${Date.now()}`, ...body },
        { status: 201 }
      );
    }

    const sb = await createSupabaseServerClient();
    const { data, error } = await sb
      .from("products")
      .insert({
        title: body.title,
        slug: body.slug || slugify(body.title),
        description: body.description ?? null,
        price_cents: body.price_cents,
        currency: body.currency || "EUR",
        sku: body.sku ?? null,
        stock: body.stock ?? 0,
        is_active: body.is_active ?? true,
        category_id: body.category_id ?? null,
        images: body.images ?? [],
        tags: body.tags ?? [],
      })
      .select("*")
      .single();

    if (error) {
      console.error("[products] insert error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
