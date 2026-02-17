import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin/auth';
import { getPages, savePages } from '@/lib/catalog/data';
import type { CatalogPage } from '@/types/catalog';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ editionId: string }> | { editionId: string } }
) {
  const admin = await isAdmin();
  
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resolvedParams = params instanceof Promise ? await params : params;
  const pages = getPages(resolvedParams.editionId);
  return NextResponse.json(pages);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ editionId: string }> | { editionId: string } }
) {
  const admin = await isAdmin();
  
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resolvedParams = params instanceof Promise ? await params : params;
  const pages: CatalogPage[] = await request.json();
  savePages(resolvedParams.editionId, pages);
  return NextResponse.json({ success: true });
}
