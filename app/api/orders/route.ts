import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/shop/queries";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { order, items } = body;

    const createdOrder = await createOrder(order, items);

    if (!createdOrder) {
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    return NextResponse.json({ order: createdOrder }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
