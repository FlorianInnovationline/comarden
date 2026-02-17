import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import { getOrders, getProducts } from "@/lib/shop/queries";
import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import { TrendingUp, ArrowRight, ShoppingCart } from "lucide-react";

export default async function AdminDashboardPage() {
  const admin = await isAdmin();
  
  if (!admin) {
    redirect("/admin/login");
  }

  // Fetch data with error handling
  let orders: any[] = [];
  let products: any[] = [];
  
  try {
    [orders, products] = await Promise.all([
      getOrders(),
      getProducts({ active: true }),
    ]);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    // Continue with empty arrays if there's an error
  }

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "new").length,
    totalRevenue: orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.total_cents, 0),
  };

  // Calculate trends (mock for now - in real app, compare with previous period)
  const trends = {
    products: { value: 0, isPositive: true },
    orders: { value: 0, isPositive: true },
    pending: { value: 0, isPositive: false },
    revenue: { value: 0, isPositive: true },
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-neutral/30 via-white to-neutral/20">
        {/* Header Section */}
        <div className="mb-8 animate-fade-in-scale">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-3 tracking-tight">
                Tableau de bord
              </h1>
              <p className="text-base text-muted-foreground">
                Vue d&apos;ensemble de votre activité e-commerce
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <div className="px-4 py-2 bg-white rounded-xl border border-border/50 shadow-sm">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-muted-foreground">Temps réel</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-8">
          <div className="animate-fade-in-scale" style={{ animationDelay: "0ms" }}>
            <StatCard
              title="Produits actifs"
              value={stats.totalProducts.toString()}
              iconName="Package"
              color="from-blue-500 via-blue-600 to-blue-700"
              trend={trends.products}
            />
          </div>
          <div className="animate-fade-in-scale" style={{ animationDelay: "100ms" }}>
            <StatCard
              title="Commandes totales"
              value={stats.totalOrders.toString()}
              iconName="ShoppingCart"
              color="from-green-500 via-green-600 to-green-700"
              trend={trends.orders}
            />
          </div>
          <div className="animate-fade-in-scale" style={{ animationDelay: "200ms" }}>
            <StatCard
              title="En attente"
              value={stats.pendingOrders.toString()}
              iconName="Clock"
              color="from-orange-500 via-orange-600 to-orange-700"
              trend={trends.pending}
            />
          </div>
          <div className="animate-fade-in-scale" style={{ animationDelay: "300ms" }}>
            <StatCard
              title="Chiffre d&apos;affaires"
              value={`€${(stats.totalRevenue / 100).toLocaleString("fr-BE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
              iconName="Euro"
              color="from-accent via-accent/90 to-accent/80"
              trend={trends.revenue}
            />
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="animate-fade-in-scale" style={{ animationDelay: "400ms" }}>
          <div className="bg-white rounded-2xl border border-border/30 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-border/50 bg-gradient-to-r from-white to-neutral/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-primary mb-1">Commandes récentes</h2>
                  <p className="text-sm text-muted-foreground">
                    {orders.length} commande{orders.length > 1 ? "s" : ""} au total
                  </p>
                </div>
                {orders.length > 0 && (
                  <a
                    href="/admin/orders"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary hover:text-accent transition-colors duration-300 hover:gap-3"
                  >
                    Voir tout
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral/20 flex items-center justify-center">
                    <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground font-medium mb-2">
                    Aucune commande pour le moment
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Les nouvelles commandes apparaîtront ici
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto -mx-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50 bg-neutral/10">
                        <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Date
                        </th>
                        <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Client
                        </th>
                        <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Total
                        </th>
                        <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="text-right py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {orders.slice(0, 10).map((order, index) => (
                        <tr
                          key={order.id}
                          className="hover:bg-neutral/30 transition-all duration-200 group animate-fade-in-up"
                          style={{
                            animationDelay: `${index * 50}ms`,
                          }}
                        >
                          <td className="py-4 px-6">
                            <div className="text-sm font-medium text-primary">
                              {new Date(order.created_at).toLocaleDateString("fr-BE", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(order.created_at).toLocaleTimeString("fr-BE", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-semibold text-primary group-hover:text-accent transition-colors duration-200">
                              {order.customer_name}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {order.customer_email}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-sm font-bold text-primary">
                              €{(order.total_cents / 100).toFixed(2)}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                                order.status === "new"
                                  ? "bg-orange-100 text-orange-800 border border-orange-200"
                                  : order.status === "confirmed"
                                  ? "bg-blue-100 text-blue-800 border border-blue-200"
                                  : order.status === "shipped"
                                  ? "bg-purple-100 text-purple-800 border border-purple-200"
                                  : order.status === "completed"
                                  ? "bg-green-100 text-green-800 border border-green-200"
                                  : "bg-red-100 text-red-800 border border-red-200"
                              }`}
                            >
                              {order.status === "new"
                                ? "Nouveau"
                                : order.status === "confirmed"
                                ? "Confirmé"
                                : order.status === "shipped"
                                ? "Expédié"
                                : order.status === "completed"
                                ? "Terminé"
                                : "Annulé"}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-primary hover:text-accent">
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
