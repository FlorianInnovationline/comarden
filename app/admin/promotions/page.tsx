import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import { getPromotions } from "@/lib/shop/queries";
import { GLOBAL_DISCOUNT_CODE } from "@/lib/shop/globalDiscount";
import AdminLayout from "@/components/admin/AdminLayout";
import PromotionsTable from "@/components/admin/PromotionsTable";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default async function AdminPromotionsPage() {
  const admin = await isAdmin();
  
  if (!admin) {
    redirect("/admin/login");
  }

  // The site-wide discount lives in this table too, but it is managed on its own
  // "Discounts" page - keep it out of the promo-code list.
  const promotions = (await getPromotions(false)).filter(
    (p) => p.code !== GLOBAL_DISCOUNT_CODE
  );

  return (
    <AdminLayout>
      <Reveal>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
              Promotions
            </h1>
            <p className="text-muted-foreground">
              Gérez vos codes promotionnels et réductions
            </p>
          </div>
          <Button size="lg" className="bg-primary text-white">
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle promotion
          </Button>
        </div>
      </Reveal>

      <PromotionsTable promotions={promotions} />
    </AdminLayout>
  );
}
