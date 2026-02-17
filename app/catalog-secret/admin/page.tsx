import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin/auth';

export default async function CatalogAdminPage() {
  const admin = await isAdmin();
  
  if (!admin) {
    redirect("/admin/login");
  }

  // Redirect to main admin catalog page
  redirect("/admin/catalog");
}
