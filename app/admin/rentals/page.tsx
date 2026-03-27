"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Truck, Package, ClipboardList } from "lucide-react";
import RentalRequestsTab from "@/components/admin/rentals/RentalRequestsTab";
import RentalProductsTab from "@/components/admin/rentals/RentalProductsTab";

const TABS = [
  { id: "requests", label: "Demandes", icon: ClipboardList },
  { id: "products", label: "Produits en location", icon: Package },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminRentalsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("requests");

  return (
    <AdminLayout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="mb-8 animate-fade-in-scale">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
                Location
              </h1>
              <p className="text-base text-muted-foreground">
                Gérez les demandes et le catalogue de location
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-1 p-1 bg-neutral/40 rounded-2xl w-fit">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-white text-primary shadow-md"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content */}
        {activeTab === "requests" ? (
          <RentalRequestsTab />
        ) : (
          <RentalProductsTab />
        )}
      </div>
    </AdminLayout>
  );
}
