// E-commerce types

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  price_cents: number;
  currency: string;
  sku?: string;
  stock: number;
  is_active: boolean;
  category_id?: string;
  images: string[];
  tags?: string[];
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  company?: string;
  delivery_address?: string;
  notes?: string;
  status: 'new' | 'confirmed' | 'shipped' | 'completed' | 'cancelled';
  total_cents: number;
  currency: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  product_title: string;
  qty: number;
  unit_price_cents: number;
  line_total_cents: number;
  created_at: string;
  product?: Product;
}

export interface Promotion {
  id: string;
  title: string;
  code?: string;
  description?: string;
  discount_type: 'percent' | 'fixed';
  discount_value: number;
  starts_at?: string;
  ends_at?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product_id: string;
  product: Product;
  qty: number;
}

export interface CheckoutFormData {
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  company?: string;
  delivery_address?: string;
  notes?: string;
}
