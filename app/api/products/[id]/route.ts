import { NextRequest, NextResponse } from "next/server";
import { getDatabaseClient } from "@/lib/shop/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const client = getDatabaseClient();

    if (client.type === 'fallback') {
      // Fallback mode
      console.log("Product updated (fallback):", id, body);
      return NextResponse.json({ id, ...body }, { status: 200 });
    }

    // MySQL mode
    const connection = await client.pool.getConnection();
    try {
      await connection.query(
        `UPDATE products 
         SET title = ?, slug = ?, description = ?, price_cents = ?, currency = ?, 
             sku = ?, stock = ?, is_active = ?, category_id = ?, images = ?, tags = ?
         WHERE id = ?`,
        [
          body.title,
          body.slug,
          body.description || null,
          body.price_cents,
          body.currency || 'EUR',
          body.sku || null,
          body.stock || 0,
          body.is_active ? 1 : 0,
          body.category_id || null,
          JSON.stringify(body.images || []),
          JSON.stringify(body.tags || []),
          id,
        ]
      );

      // Fetch updated product
      const [rows] = await connection.query(
        'SELECT * FROM products WHERE id = ?',
        [id]
      );
      const products = Array.isArray(rows) ? rows : [];
      
      return NextResponse.json(products[0] || { id, ...body }, { status: 200 });
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
