import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin/auth';
import { saveEdition } from '@/lib/catalog/data';
import type { CatalogEdition } from '@/types/catalog';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const admin = await isAdmin();
  
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resolvedParams = params instanceof Promise ? await params : params;
  const edition: CatalogEdition = await request.json();
  saveEdition(edition);
  return NextResponse.json({ success: true });
}
