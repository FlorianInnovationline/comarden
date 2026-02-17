// Database client - MySQL or fallback
// Supports MySQL (preferred) or fallback to seed data
// SERVER-ONLY: This file uses Node.js modules and must not be imported in client components

// Prevent client-side imports
if (typeof window !== 'undefined') {
  throw new Error('lib/shop/db.ts cannot be imported in client components. Use API routes instead.');
}

import { getMySQLPool } from './db-mysql';
import type { Pool } from 'mysql2/promise';

let mysqlPool: Pool | null = null;

export function getDatabaseClient() {
  // Try MySQL first
  mysqlPool = getMySQLPool();
  if (mysqlPool) {
    return { type: 'mysql' as const, pool: mysqlPool };
  }

  // Fallback to seed data
  return { type: 'fallback' as const, pool: null };
}

export function isDatabaseConfigured(): boolean {
  return getMySQLPool() !== null;
}

// Legacy Supabase function (for backward compatibility)
export function getSupabaseClient() {
  return null; // MySQL mode - no Supabase
}
