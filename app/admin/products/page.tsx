import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/admin/auth";
import { getProducts, getCategories } from "@/lib/shop/queries";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductsTable from "@/components/admin/ProductsTable";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default async function AdminProductsPage() {
  const admin = await isAdmin();
  
  if (!admin) {
    redirect("/admin/login");
  }

  const products = await getProducts({ active: undefined });
  const categories = await getCategories();

  return (
    <AdminLayout>
      <Reveal>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
              Produits
            </h1>
            <p className="text-muted-foreground">
              Gérez votre catalogue de produits
            </p>
          </div>
          <Button asChild href="/admin/products/new" size="lg" className="bg-primary text-white">
            <Plus className="w-5 h-5 mr-2" />
            Nouveau produit
          </Button>
        </div>
      </Reveal>

      <ProductsTable products={products} categories={categories} />
    </AdminLayout>
  );
}
