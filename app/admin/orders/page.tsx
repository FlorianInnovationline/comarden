import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import { getOrders } from "@/lib/shop/queries";
import AdminLayout from "@/components/admin/AdminLayout";
import OrdersTable from "@/components/admin/OrdersTable";
import Reveal from "@/components/ui/Reveal";

export default async function AdminOrdersPage() {
  const admin = await isAdmin();
  
  if (!admin) {
    redirect("/admin/login");
  }

  const orders = await getOrders();

  return (
    <AdminLayout>
      <Reveal>
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
            Commandes
          </h1>
          <p className="text-muted-foreground">
            Gérez les commandes de vos clients
          </p>
        </div>
      </Reveal>

      <OrdersTable orders={orders} />
    </AdminLayout>
  );
}
