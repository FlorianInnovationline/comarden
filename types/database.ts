// Supabase database types (generated from schema)

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          price_cents: number;
          currency: string;
          sku: string | null;
          stock: number;
          is_active: boolean;
          category_id: string | null;
          images: string[];
          tags: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          price_cents?: number;
          currency?: string;
          sku?: string | null;
          stock?: number;
          is_active?: boolean;
          category_id?: string | null;
          images?: string[];
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          price_cents?: number;
          currency?: string;
          sku?: string | null;
          stock?: number;
          is_active?: boolean;
          category_id?: string | null;
          images?: string[];
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          created_at: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string | null;
          company: string | null;
          delivery_address: string | null;
          notes: string | null;
          status: string;
          total_cents: number;
          currency: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          customer_name: string;
          customer_email: string;
          customer_phone?: string | null;
          company?: string | null;
          delivery_address?: string | null;
          notes?: string | null;
          status?: string;
          total_cents: number;
          currency?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string | null;
          company?: string | null;
          delivery_address?: string | null;
          notes?: string | null;
          status?: string;
          total_cents?: number;
          currency?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          product_title: string;
          qty: number;
          unit_price_cents: number;
          line_total_cents: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          product_title: string;
          qty: number;
          unit_price_cents: number;
          line_total_cents: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          product_title?: string;
          qty?: number;
          unit_price_cents?: number;
          line_total_cents?: number;
          created_at?: string;
        };
      };
      promotions: {
        Row: {
          id: string;
          title: string;
          code: string | null;
          description: string | null;
          discount_type: string;
          discount_value: number;
          starts_at: string | null;
          ends_at: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          code?: string | null;
          description?: string | null;
          discount_type: string;
          discount_value: number;
          starts_at?: string | null;
          ends_at?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          code?: string | null;
          description?: string | null;
          discount_type?: string;
          discount_value?: number;
          starts_at?: string | null;
          ends_at?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      admin_users: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          email?: string;
          created_at?: string;
        };
      };
    };
  };
}
