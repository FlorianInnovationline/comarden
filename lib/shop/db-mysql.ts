// MySQL database client
// SERVER-ONLY: This file uses Node.js built-in modules and must not be imported in client components

import mysql from 'mysql2/promise';
import type { Pool } from 'mysql2/promise';

// Ensure this is only used server-side
if (typeof window !== 'undefined') {
  throw new Error('db-mysql.ts cannot be imported in client components');
}

let pool: Pool | null = null;

export function getMySQLPool(): Pool | null {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL || process.env.MYSQL_URL;
  
  if (!connectionString) {
    console.warn('MySQL not configured. Using fallback mode.');
    return null;
  }

  try {
    // Parse connection string or use individual env vars
    const config = parseConnectionString(connectionString);
    
    pool = mysql.createPool({
      host: config.host || process.env.MYSQL_HOST || 'localhost',
      port: config.port || parseInt(process.env.MYSQL_PORT || '3306'),
      user: config.user || process.env.MYSQL_USER || 'root',
      password: config.password || process.env.MYSQL_PASSWORD || '',
      database: config.database || process.env.MYSQL_DATABASE || 'comarden_shop',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });

    return pool;
  } catch (error) {
    console.error('Error creating MySQL pool:', error);
    return null;
  }
}

function parseConnectionString(connectionString: string) {
  // Support format: mysql://user:password@host:port/database
  const url = new URL(connectionString);
  return {
    host: url.hostname,
    port: url.port ? parseInt(url.port) : 3306,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1), // Remove leading /
  };
}

export function isMySQLConfigured(): boolean {
  return !!(
    process.env.DATABASE_URL ||
    process.env.MYSQL_URL ||
    (process.env.MYSQL_HOST && process.env.MYSQL_DATABASE)
  );
}
