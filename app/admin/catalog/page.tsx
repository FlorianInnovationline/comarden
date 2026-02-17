import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import AdminLayout from "@/components/admin/AdminLayout";
import CatalogAdminPanel from "@/components/admin/CatalogAdminPanel";

export default async function AdminCatalogPage() {
  const admin = await isAdmin();
  
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <AdminLayout>
      <CatalogAdminPanel />
    </AdminLayout>
  );
}
