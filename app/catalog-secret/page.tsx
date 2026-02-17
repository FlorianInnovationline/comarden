import { notFound } from 'next/navigation';
import { validateToken } from '@/lib/catalog/token';
import CatalogReader from '@/components/catalog/CatalogReader';

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }> | { t?: string };
}) {
  // Handle both async and sync searchParams (Next.js 14/15 compatibility)
  const params = searchParams instanceof Promise ? await searchParams : searchParams;
  const token = params.t;
  
  if (!validateToken(token)) {
    // Return 404 to make it look like the route doesn't exist
    notFound();
  }

  return <CatalogReader token={token!} />;
}
