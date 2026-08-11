import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import AdminLayout from "@/components/admin/AdminLayout";
import DiscountPanel from "@/components/admin/DiscountPanel";
import Reveal from "@/components/ui/Reveal";

export const dynamic = "force-dynamic";

export default async function AdminDiscountsPage() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }

  return (
    <AdminLayout>
      <Reveal>
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
            Discounts
          </h1>
          <p className="text-muted-foreground">
            Définissez une remise par produit. Filtrez, appliquez en masse, ajustez
            au cas par cas, puis enregistrez.
          </p>
        </div>
      </Reveal>

      <DiscountPanel />
    </AdminLayout>
  );
}
