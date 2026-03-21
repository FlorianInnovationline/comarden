// MySQL queries for shop

import { getDatabaseClient } from './db';
import type { Product, Category, Order, OrderItem, Promotion } from '@/types/shop';
import { seedData } from './seed';
import { withMergedProductImages } from './productFolderImages';

// Categories
export async function getCategories(): Promise<Category[]> {
  const client = getDatabaseClient();
  
  if (client.type === 'fallback') {
    return seedData.categories;
  }

  try {
    const [rows] = await client.pool.query(
      'SELECT * FROM categories ORDER BY name ASC'
    );
    return (Array.isArray(rows) ? rows : []) as Category[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return seedData.categories;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const client = getDatabaseClient();
  
  if (client.type === 'fallback') {
    return seedData.categories.find((c) => c.slug === slug) || null;
  }

  try {
    const [rows] = await client.pool.query(
      'SELECT * FROM categories WHERE slug = ? LIMIT 1',
      [slug]
    );
    const result = (Array.isArray(rows) ? rows : []) as Category[];
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

// Products
export async function getProducts(filters?: {
  categoryId?: string;
  active?: boolean;
  search?: string;
}): Promise<Product[]> {
  const client = getDatabaseClient();
  
  if (client.type === 'fallback') {
    let products = seedData.products;
    if (filters?.categoryId) {
      products = products.filter((p) => p.category_id === filters.categoryId);
    }
    if (filters?.active !== undefined) {
      products = products.filter((p) => p.is_active === filters.active);
    }
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower)
      );
    }
    return products.map((p) => withMergedProductImages({ ...p }));
  }

  try {
    let query = 'SELECT p.*, c.name as category_name, c.slug as category_slug FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1';
    const params: any[] = [];

    if (filters?.categoryId) {
      query += ' AND p.category_id = ?';
      params.push(filters.categoryId);
    }
    if (filters?.active !== undefined) {
      query += ' AND p.is_active = ?';
      params.push(filters.active ? 1 : 0);
    }
    if (filters?.search) {
      query += ' AND (p.title LIKE ? OR p.description LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm);
    }

    query += ' ORDER BY p.created_at DESC';

    const [rows] = await client.pool.query(query, params);
    const products = (Array.isArray(rows) ? rows : []) as Record<string, unknown>[];
    
    const mapped = products.map((p) => ({
      ...p,
      images: typeof p.images === 'string' ? JSON.parse(p.images) : (p.images || []),
      tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : (p.tags || []),
      category: p.category_name ? {
        id: p.category_id,
        name: p.category_name,
        slug: p.category_slug,
      } : undefined,
    })) as Product[];
    return mapped.map((p) => withMergedProductImages(p));
  } catch (error) {
    console.error('Error fetching products:', error);
    return seedData.products.map((p) => withMergedProductImages({ ...p }));
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const client = getDatabaseClient();
  
  if (client.type === 'fallback') {
    const p = seedData.products.find((x) => x.slug === slug);
    return p ? withMergedProductImages({ ...p }) : null;
  }

  try {
    const [rows] = await client.pool.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug, c.description as category_description
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.slug = ? LIMIT 1`,
      [slug]
    );
    const result = (Array.isArray(rows) ? rows : []) as Record<string, unknown>[];
    if (result.length === 0) return null;
    
    const p = result[0];
    const product = {
      ...p,
      images: typeof p.images === 'string' ? JSON.parse(p.images as string) : (p.images || []),
      tags: typeof p.tags === 'string' ? JSON.parse(p.tags as string) : (p.tags || []),
      category: p.category_name ? {
        id: p.category_id,
        name: p.category_name,
        slug: p.category_slug,
        description: p.category_description,
      } : undefined,
    } as Product;
    return withMergedProductImages(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const client = getDatabaseClient();
  
  if (client.type === 'fallback') {
    const p = seedData.products.find((x) => x.id === id);
    return p ? { ...p } : null;
  }

  try {
    const [rows] = await client.pool.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = ? LIMIT 1`,
      [id]
    );
    const result = (Array.isArray(rows) ? rows : []) as Record<string, unknown>[];
    if (result.length === 0) return null;
    
    const p = result[0];
    return {
      ...p,
      images: typeof p.images === 'string' ? JSON.parse(p.images as string) : (p.images || []),
      tags: typeof p.tags === 'string' ? JSON.parse(p.tags as string) : (p.tags || []),
      category: p.category_name ? {
        id: p.category_id,
        name: p.category_name,
        slug: p.category_slug,
      } : undefined,
    } as Product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Orders
export async function createOrder(
  orderData: Omit<Order, 'id' | 'created_at'>,
  items: Omit<OrderItem, 'id' | 'order_id' | 'created_at'>[]
): Promise<Order | null> {
  const client = getDatabaseClient();
  
  if (client.type === 'fallback') {
    console.log('Order created (fallback):', orderData, items);
    return {
      id: `order-${Date.now()}`,
      ...orderData,
      created_at: new Date().toISOString(),
    };
  }

  try {
    const connection = await client.pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Insert order
      const [orderResult] = await connection.query(
        `INSERT INTO orders (customer_name, customer_email, customer_phone, company, delivery_address, notes, status, total_cents, currency)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderData.customer_name,
          orderData.customer_email,
          orderData.customer_phone || null,
          orderData.company || null,
          orderData.delivery_address || null,
          orderData.notes || null,
          orderData.status,
          orderData.total_cents,
          orderData.currency,
        ]
      );

      const orderId = (orderResult as any).insertId;

      // Insert order items
      for (const item of items) {
        await connection.query(
          `INSERT INTO order_items (order_id, product_id, product_title, qty, unit_price_cents, line_total_cents)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            orderId,
            item.product_id || null,
            item.product_title,
            item.qty,
            item.unit_price_cents,
            item.line_total_cents,
          ]
        );
      }

      await connection.commit();

      // Fetch created order
      const [orderRows] = await connection.query(
        'SELECT * FROM orders WHERE id = ?',
        [orderId]
      );
      const orders = (Array.isArray(orderRows) ? orderRows : []) as Order[];
      
      return orders[0] || null;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
}

export async function getOrders(): Promise<Order[]> {
  const client = getDatabaseClient();
  
  if (client.type === 'fallback') {
    return [];
  }

  try {
    const [rows] = await client.pool.query(
      `SELECT o.*, 
       JSON_ARRAYAGG(
         JSON_OBJECT(
           'id', oi.id,
           'order_id', oi.order_id,
           'product_id', oi.product_id,
           'product_title', oi.product_title,
           'qty', oi.qty,
           'unit_price_cents', oi.unit_price_cents,
           'line_total_cents', oi.line_total_cents,
           'created_at', oi.created_at
         )
       ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       GROUP BY o.id
       ORDER BY o.created_at DESC`
    );
    
    const orders = (Array.isArray(rows) ? rows : []) as Record<string, unknown>[];
    return orders.map((o) => ({
      ...o,
      items: o.items ? JSON.parse(o.items as string) : [],
    })) as Order[];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

// Promotions
export async function getPromotions(activeOnly: boolean = true): Promise<Promotion[]> {
  const client = getDatabaseClient();
  
  if (client.type === 'fallback') {
    return seedData.promotions.filter((p) => !activeOnly || p.active);
  }

  try {
    let query = 'SELECT * FROM promotions';
    const params: any[] = [];

    if (activeOnly) {
      query += ' WHERE active = ?';
      params.push(1);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await client.pool.query(query, params);
    return (Array.isArray(rows) ? rows : []) as Promotion[];
  } catch (error) {
    console.error('Error fetching promotions:', error);
    return [];
  }
}
