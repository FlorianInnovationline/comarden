// ============================================================================
// Shop data access — Supabase implementation.
// ----------------------------------------------------------------------------
// All functions keep their MySQL-era signatures so call sites don't change.
// If Supabase is not configured (no NEXT_PUBLIC_SUPABASE_URL), every read
// transparently falls back to the in-memory seed in ./seed.ts — preserving
// the "works without a DB" local-dev experience that the previous codebase
// already supported.
//
// SERVER-ONLY: pulls in lib/supabase/server.ts (which uses next/headers).
// ============================================================================

import type { SupabaseClient } from "@supabase/supabase-js";
import { seedData } from "./seed";
import { withMergedProductImages } from "./productFolderImages";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";
import type {
  Category,
  Product,
  Order,
  OrderItem,
  Promotion,
} from "@/types/shop";

if (typeof window !== "undefined") {
  throw new Error(
    "lib/shop/queries.ts cannot be imported from client code. " +
      "Call an /api route or use a Server Component."
  );
}

type DB = SupabaseClient<Database>;

async function client(): Promise<DB | null> {
  if (!isSupabaseConfigured()) return null;
  return createSupabaseServerClient();
}

// ----- mappers --------------------------------------------------------------
// Translate Postgres row shape -> our `types/shop.ts` shape. Mostly identity;
// the main difference is `images` (jsonb -> string[]) and joined category data.

type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
type OrderItemRow = Database["public"]["Tables"]["order_items"]["Row"];
type PromotionRow = Database["public"]["Tables"]["promotions"]["Row"];

function toStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === "string");
  if (typeof v === "string") {
    try {
      const parsed: unknown = JSON.parse(v);
      return Array.isArray(parsed)
        ? parsed.filter((x): x is string => typeof x === "string")
        : [];
    } catch {
      return [];
    }
  }
  return [];
}

function mapCategory(r: CategoryRow): Category {
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    description: r.description ?? undefined,
    image_url: r.image_url ?? undefined,
    created_at: r.created_at,
    updated_at: r.updated_at,
  };
}

type ProductRowWithCategory = ProductRow & {
  category?: CategoryRow | null;
};

function mapProduct(r: ProductRowWithCategory): Product {
  const cat = r.category ?? null;
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    description: r.description ?? undefined,
    price_cents: r.price_cents,
    currency: r.currency,
    sku: r.sku ?? undefined,
    stock: r.stock,
    is_active: r.is_active,
    category_id: r.category_id ?? undefined,
    images: toStringArray(r.images),
    tags: r.tags ?? [],
    brand: r.brand ?? undefined,
    specs: r.specs ?? undefined,
    avantages: r.avantages ?? undefined,
    variants: r.variants ?? undefined,
    lien_produit: r.lien_produit ?? undefined,
    warning: r.warning ?? undefined,
    created_at: r.created_at,
    updated_at: r.updated_at,
    category: cat ? mapCategory(cat) : undefined,
  };
}

function mapOrderItem(r: OrderItemRow): OrderItem {
  return {
    id: r.id,
    order_id: r.order_id,
    product_id: r.product_id ?? undefined,
    product_title: r.product_title,
    qty: r.qty,
    unit_price_cents: r.unit_price_cents,
    line_total_cents: r.line_total_cents,
    created_at: r.created_at,
  };
}

function mapOrder(
  r: OrderRow & { order_items?: OrderItemRow[] | null }
): Order {
  return {
    id: r.id,
    created_at: r.created_at,
    customer_name: r.customer_name,
    customer_email: r.customer_email,
    customer_phone: r.customer_phone ?? undefined,
    company: r.company ?? undefined,
    delivery_address: r.delivery_address ?? undefined,
    notes: r.notes ?? undefined,
    status: r.status,
    total_cents: r.total_cents,
    currency: r.currency,
    items: r.order_items ? r.order_items.map(mapOrderItem) : undefined,
  };
}

function mapPromotion(r: PromotionRow): Promotion {
  return {
    id: r.id,
    title: r.title,
    code: r.code ?? undefined,
    description: r.description ?? undefined,
    discount_type: r.discount_type,
    discount_value: r.discount_value,
    starts_at: r.starts_at ?? undefined,
    ends_at: r.ends_at ?? undefined,
    active: r.active,
    created_at: r.created_at,
    updated_at: r.updated_at,
  };
}

// ===========================================================================
// Categories
// ===========================================================================
export async function getCategories(): Promise<Category[]> {
  const sb = await client();
  if (!sb) return seedData.categories;

  const { data, error } = await sb
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("[shop] getCategories error:", error.message);
    return seedData.categories;
  }
  return (data ?? []).map(mapCategory);
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const sb = await client();
  if (!sb) {
    return seedData.categories.find((c) => c.slug === slug) ?? null;
  }

  const { data, error } = await sb
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[shop] getCategoryBySlug error:", error.message);
    return null;
  }
  return data ? mapCategory(data) : null;
}

// ===========================================================================
// Products
// ===========================================================================
export interface ProductFilters {
  categoryId?: string;
  active?: boolean;
  search?: string;
}

export async function getProducts(
  filters?: ProductFilters
): Promise<Product[]> {
  const sb = await client();

  if (!sb) {
    let products = seedData.products;
    if (filters?.categoryId) {
      products = products.filter((p) => p.category_id === filters.categoryId);
    }
    if (filters?.active !== undefined) {
      products = products.filter((p) => p.is_active === filters.active);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.description?.toLowerCase().includes(q) ?? false)
      );
    }
    return products.map((p) => withMergedProductImages({ ...p }));
  }

  let query = sb
    .from("products")
    .select("*, category:categories(*)")
    .order("created_at", { ascending: false });

  if (filters?.categoryId) query = query.eq("category_id", filters.categoryId);
  if (filters?.active !== undefined) query = query.eq("is_active", filters.active);
  if (filters?.search) {
    const q = filters.search.replace(/[%_]/g, (m) => `\\${m}`);
    query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("[shop] getProducts error:", error.message);
    return seedData.products.map((p) => withMergedProductImages({ ...p }));
  }

  return (data ?? [])
    .map((r) => mapProduct(r as ProductRowWithCategory))
    .map(withMergedProductImages);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const sb = await client();
  if (!sb) {
    const p = seedData.products.find((x) => x.slug === slug);
    return p ? withMergedProductImages({ ...p }) : null;
  }

  const { data, error } = await sb
    .from("products")
    .select("*, category:categories(*)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[shop] getProductBySlug error:", error.message);
    return null;
  }
  if (!data) return null;
  return withMergedProductImages(mapProduct(data as ProductRowWithCategory));
}

export async function getProductById(id: string): Promise<Product | null> {
  const sb = await client();
  if (!sb) {
    const p = seedData.products.find((x) => x.id === id);
    return p ? { ...p } : null;
  }

  const { data, error } = await sb
    .from("products")
    .select("*, category:categories(*)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[shop] getProductById error:", error.message);
    return null;
  }
  return data ? mapProduct(data as ProductRowWithCategory) : null;
}

// ===========================================================================
// Orders
// ===========================================================================
export async function createOrder(
  orderData: Omit<Order, "id" | "created_at" | "items">,
  items: Omit<OrderItem, "id" | "order_id" | "created_at">[]
): Promise<Order | null> {
  const sb = await client();

  if (!sb) {
    console.log("[shop] Order created (fallback — no DB):", orderData, items);
    return {
      id: `order-${Date.now()}`,
      ...orderData,
      created_at: new Date().toISOString(),
    };
  }

  // 1) Insert the order
  const { data: order, error: orderErr } = await sb
    .from("orders")
    .insert({
      customer_name: orderData.customer_name,
      customer_email: orderData.customer_email,
      customer_phone: orderData.customer_phone ?? null,
      company: orderData.company ?? null,
      delivery_address: orderData.delivery_address ?? null,
      notes: orderData.notes ?? null,
      status: orderData.status,
      total_cents: orderData.total_cents,
      currency: orderData.currency,
    })
    .select("*")
    .single();

  if (orderErr || !order) {
    console.error("[shop] createOrder (order insert) error:", orderErr?.message);
    return null;
  }

  // 2) Insert the line items
  if (items.length > 0) {
    const itemRows = items.map((it) => ({
      order_id: order.id,
      product_id: it.product_id ?? null,
      product_title: it.product_title,
      qty: it.qty,
      unit_price_cents: it.unit_price_cents,
      line_total_cents: it.line_total_cents,
    }));

    const { error: itemsErr } = await sb.from("order_items").insert(itemRows);
    if (itemsErr) {
      console.error("[shop] createOrder (items insert) error:", itemsErr.message);
      // The order header was inserted; rolling back would need an RPC/transaction.
      // Returning the order anyway so the customer isn't told it failed.
    }
  }

  return mapOrder(order);
}

export async function getOrders(): Promise<Order[]> {
  const sb = await client();
  if (!sb) return [];

  const { data, error } = await sb
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[shop] getOrders error:", error.message);
    return [];
  }
  return (data ?? []).map((r) =>
    mapOrder(r as OrderRow & { order_items: OrderItemRow[] })
  );
}

// ===========================================================================
// Promotions
// ===========================================================================
export async function getPromotions(
  activeOnly: boolean = true
): Promise<Promotion[]> {
  const sb = await client();
  if (!sb) {
    return seedData.promotions.filter((p) => !activeOnly || p.active);
  }

  let query = sb
    .from("promotions")
    .select("*")
    .order("created_at", { ascending: false });

  if (activeOnly) query = query.eq("active", true);

  const { data, error } = await query;
  if (error) {
    console.error("[shop] getPromotions error:", error.message);
    return [];
  }
  return (data ?? []).map(mapPromotion);
}
