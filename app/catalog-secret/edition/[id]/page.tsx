import { notFound } from 'next/navigation';
import { validateToken } from '@/lib/catalog/token';
import CatalogReader from '@/components/catalog/CatalogReader';

export default async function CatalogEditionPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }> | { id: string };
  searchParams: Promise<{ t?: string }> | { t?: string };
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const resolvedSearchParams = searchParams instanceof Promise ? await searchParams : searchParams;
  const token = resolvedSearchParams.t;
  
  if (!validateToken(token)) {
    notFound();
  }

  return <CatalogReader token={token!} editionId={resolvedParams.id} />;
}
