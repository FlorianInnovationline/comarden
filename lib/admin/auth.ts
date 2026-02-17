// Admin authentication utilities (SERVER-ONLY)
// This file uses next/headers and should only be imported in Server Components

import { cookies } from 'next/headers';

export interface AdminUser {
  id: string;
  email: string;
  user_id: string;
}

// Check if user is admin (server-side only)
export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');
  const devAdmin = cookieStore.get('dev_admin');

  // Check if user is authenticated via cookies
  if (adminSession?.value === 'authenticated' || devAdmin?.value === 'true') {
    return true;
  }

  return false;
}

// Get current admin user (server-side only)
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');
  const devAdmin = cookieStore.get('dev_admin');
  
  if (adminSession?.value === 'authenticated' || devAdmin?.value === 'true') {
    return {
      id: 'admin-1',
      email: process.env.DEV_ADMIN_EMAIL || 'admin@comarden.be',
      user_id: 'admin-user-id',
    };
  }

  return null;
}
