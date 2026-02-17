import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import { getProductById, getCategories } from "@/lib/shop/queries";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";
import Reveal from "@/components/ui/Reveal";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const admin = await isAdmin();
  
  if (!admin) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <AdminLayout>
      <Reveal>
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
            Modifier le produit
          </h1>
          <p className="text-muted-foreground">
            {product.title}
          </p>
        </div>
      </Reveal>

      <ProductForm product={product} categories={categories} />
    </AdminLayout>
  );
}
