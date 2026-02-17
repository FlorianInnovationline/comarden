import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import { getCategories } from "@/lib/shop/queries";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";
import Reveal from "@/components/ui/Reveal";

export default async function NewProductPage() {
  const admin = await isAdmin();
  
  if (!admin) {
    redirect("/admin/login");
  }

  const categories = await getCategories();

  return (
    <AdminLayout>
      <Reveal>
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
            Nouveau produit
          </h1>
          <p className="text-muted-foreground">
            Ajoutez un nouveau produit à votre catalogue
          </p>
        </div>
      </Reveal>

      <ProductForm categories={categories} />
    </AdminLayout>
  );
}
