import { NextRequest, NextResponse } from "next/server";
import { getDatabaseClient } from "@/lib/shop/db";
import { slugify } from "@/lib/shop/utils";
import { getProducts } from "@/lib/shop/queries";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const active = searchParams.get("active") === "true" ? true : searchParams.get("active") === "false" ? false : undefined;
    const search = searchParams.get("search") || undefined;

    const products = await getProducts({
      categoryId,
      active,
      search,
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const client = getDatabaseClient();

    if (client.type === 'fallback') {
      // Fallback mode - just log
      console.log("Product created (fallback):", body);
      return NextResponse.json(
        { id: `prod-${Date.now()}`, ...body },
        { status: 201 }
      );
    }

    // MySQL mode
    const connection = await client.pool.getConnection();
    try {
      const [result] = await connection.query(
        `INSERT INTO products (title, slug, description, price_cents, currency, sku, stock, is_active, category_id, images, tags)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          body.title,
          body.slug || slugify(body.title),
          body.description || null,
          body.price_cents,
          body.currency || 'EUR',
          body.sku || null,
          body.stock || 0,
          body.is_active ? 1 : 0,
          body.category_id || null,
          JSON.stringify(body.images || []),
          JSON.stringify(body.tags || []),
        ]
      );

      const insertId = (result as any).insertId;
      
      // Fetch created product
      const [rows] = await connection.query(
        'SELECT * FROM products WHERE id = ?',
        [insertId]
      );
      const products = Array.isArray(rows) ? rows : [];
      
      return NextResponse.json(products[0] || { id: insertId, ...body }, { status: 201 });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
