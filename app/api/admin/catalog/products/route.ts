import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin/auth';
import { getProducts } from '@/lib/catalog/data';

export async function GET(request: NextRequest) {
  const admin = await isAdmin();
  
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const products = getProducts();
  return NextResponse.json(products);
}
