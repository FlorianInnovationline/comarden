// ============================================================================
// Supabase generated `Database` type - keeps the JS client strongly typed.
// ----------------------------------------------------------------------------
// This file is HAND-WRITTEN to mirror db/supabase-schema.sql. Once the Supabase
// CLI is installed locally, regenerate it with:
//
//   supabase gen types typescript --project-id <ref> --schema public > lib/supabase/types.ts
//
// Until then, keep this file in sync with the SQL schema by hand. The shape
// matches what postgrest-js expects (each Table has Row / Insert / Update /
// Relationships, Views / Functions / Enums / CompositeTypes are objects).
// ============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "admin" | "editor" | "viewer";
export type OrderStatus =
  | "new"
  | "confirmed"
  | "shipped"
  | "completed"
  | "cancelled";
export type EventStatus = "upcoming" | "past";
export type JobApplicationStatus =
  | "new"
  | "reviewing"
  | "contacted"
  | "rejected"
  | "hired";
export type DiscountType = "percent" | "fixed";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
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
        Relationships: [];
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
          images: Json;
          tags: string[];
          brand: string | null;
          specs: string[] | null;
          avantages: string[] | null;
          variants: string[] | null;
          lien_produit: string | null;
          warning: string | null;
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
          images?: Json;
          tags?: string[];
          brand?: string | null;
          specs?: string[] | null;
          avantages?: string[] | null;
          variants?: string[] | null;
          lien_produit?: string | null;
          warning?: string | null;
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
          images?: Json;
          tags?: string[];
          brand?: string | null;
          specs?: string[] | null;
          avantages?: string[] | null;
          variants?: string[] | null;
          lien_produit?: string | null;
          warning?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          customer_name: string;
          customer_email: string;
          customer_phone: string | null;
          company: string | null;
          delivery_address: string | null;
          notes: string | null;
          status: OrderStatus;
          total_cents: number;
          currency: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          customer_name: string;
          customer_email: string;
          customer_phone?: string | null;
          company?: string | null;
          delivery_address?: string | null;
          notes?: string | null;
          status?: OrderStatus;
          total_cents: number;
          currency?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string | null;
          company?: string | null;
          delivery_address?: string | null;
          notes?: string | null;
          status?: OrderStatus;
          total_cents?: number;
          currency?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
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
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      promotions: {
        Row: {
          id: string;
          title: string;
          code: string | null;
          description: string | null;
          discount_type: DiscountType;
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
          discount_type: DiscountType;
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
          discount_type?: DiscountType;
          discount_value?: number;
          starts_at?: string | null;
          ends_at?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          slug: string;
          title: string;
          date: string | null;
          date_label: string | null;
          audience: string | null;
          location: string | null;
          horaires: string | null;
          status: EventStatus;
          teaser: string | null;
          intro: string | null;
          partners: Json;
          media: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          date?: string | null;
          date_label?: string | null;
          audience?: string | null;
          location?: string | null;
          horaires?: string | null;
          status?: EventStatus;
          teaser?: string | null;
          intro?: string | null;
          partners?: Json;
          media?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          date?: string | null;
          date_label?: string | null;
          audience?: string | null;
          location?: string | null;
          horaires?: string | null;
          status?: EventStatus;
          teaser?: string | null;
          intro?: string | null;
          partners?: Json;
          media?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      job_postings: {
        Row: {
          id: string;
          slug: string;
          title: string;
          location: string | null;
          description: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          location?: string | null;
          description?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          location?: string | null;
          description?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      job_applications: {
        Row: {
          id: string;
          job_slug: string | null;
          nom: string | null;
          prenom: string | null;
          email: string | null;
          telephone: string | null;
          localite: string | null;
          code_postal: string | null;
          date_naissance: string | null;
          poste_actuel: string | null;
          disponible_a_partir_du: string | null;
          permis_b: boolean | null;
          competences_commerciales: string | null;
          connaissances_techniques: string | null;
          experience_comptoir: number | null;
          experience_route: number | null;
          mot_sur_vous: string | null;
          cv_url: string | null;
          lettre_url: string | null;
          consentement_rgpd: boolean;
          status: JobApplicationStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          job_slug?: string | null;
          nom?: string | null;
          prenom?: string | null;
          email?: string | null;
          telephone?: string | null;
          localite?: string | null;
          code_postal?: string | null;
          date_naissance?: string | null;
          poste_actuel?: string | null;
          disponible_a_partir_du?: string | null;
          permis_b?: boolean | null;
          competences_commerciales?: string | null;
          connaissances_techniques?: string | null;
          experience_comptoir?: number | null;
          experience_route?: number | null;
          mot_sur_vous?: string | null;
          cv_url?: string | null;
          lettre_url?: string | null;
          consentement_rgpd?: boolean;
          status?: JobApplicationStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          job_slug?: string | null;
          nom?: string | null;
          prenom?: string | null;
          email?: string | null;
          telephone?: string | null;
          localite?: string | null;
          code_postal?: string | null;
          date_naissance?: string | null;
          poste_actuel?: string | null;
          disponible_a_partir_du?: string | null;
          permis_b?: boolean | null;
          competences_commerciales?: string | null;
          connaissances_techniques?: string | null;
          experience_comptoir?: number | null;
          experience_route?: number | null;
          mot_sur_vous?: string | null;
          cv_url?: string | null;
          lettre_url?: string | null;
          consentement_rgpd?: boolean;
          status?: JobApplicationStatus;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "job_applications_job_slug_fkey";
            columns: ["job_slug"];
            isOneToOne: false;
            referencedRelation: "job_postings";
            referencedColumns: ["slug"];
          },
        ];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}
