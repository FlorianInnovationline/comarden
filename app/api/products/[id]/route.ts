import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface UpdateProductBody {
  title: string;
  slug: string;
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as UpdateProductBody;

    if (!isSupabaseConfigured()) {
      console.log("[products] Product updated (fallback — no DB):", id, body);
      return NextResponse.json({ id, ...body }, { status: 200 });
    }

    const sb = await createSupabaseServerClient();
    const { data, error } = await sb
      .from("products")
      .update({
        title: body.title,
        slug: body.slug,
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
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("[products] update error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
