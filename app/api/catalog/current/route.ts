import { NextRequest, NextResponse } from 'next/server';
import { validateToken } from '@/lib/catalog/token';
import { getCatalogData } from '@/lib/catalog/data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('t');

  if (!validateToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = getCatalogData();
  
  if (!data) {
    return NextResponse.json({ error: 'No published catalog found' }, { status: 404 });
  }

  return NextResponse.json(data);
}
