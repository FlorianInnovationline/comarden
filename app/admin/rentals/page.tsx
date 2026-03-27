"use client";

import { useEffect, useState, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Truck,
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  Package,
  ChevronDown,
  RefreshCw,
  Calendar,
  User,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";

interface RentalRequest {
  id: string;
  productId: string;
  productName: string;
  variant: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string;
  duration: number;
  durationUnit: string;
  remarks: string | null;
  status: "new" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

const STATUS_CONFIG = {
  new: {
    label: "Nouveau",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: Clock,
  },
  confirmed: {
    label: "Confirmé",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: CheckCircle,
  },
  completed: {
    label: "Terminé",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Annulé",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
  },
};

export default function AdminRentalsPage() {
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/rentals");
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      }
    } catch (err) {
      console.error("Failed to fetch rental requests:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/rentals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setRequests((prev) =>
          prev.map((r) =>
            r.id === id ? { ...r, status: status as RentalRequest["status"] } : r
          )
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const filtered = requests.filter((r) => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        r.productName.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.customerEmail.toLowerCase().includes(q) ||
        r.customerPhone.includes(q)
      );
    }
    return true;
  });

  const stats = {
    total: requests.length,
    new: requests.filter((r) => r.status === "new").length,
    confirmed: requests.filter((r) => r.status === "confirmed").length,
    completed: requests.filter((r) => r.status === "completed").length,
  };

  return (
    <AdminLayout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="mb-8 animate-fade-in-scale">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-3 tracking-tight">
                Demandes de location
              </h1>
              <p className="text-base text-muted-foreground">
                Gérez les demandes de location de matériel
              </p>
            </div>
            <button
              onClick={fetchRequests}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-semibold text-primary hover:bg-neutral/50 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Actualiser
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, icon: Package, color: "from-slate-500 to-slate-600" },
            { label: "Nouvelles", value: stats.new, icon: Clock, color: "from-orange-500 to-orange-600" },
            { label: "Confirmées", value: stats.confirmed, icon: CheckCircle, color: "from-blue-500 to-blue-600" },
            { label: "Terminées", value: stats.completed, icon: CheckCircle, color: "from-green-500 to-green-600" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-border/30 shadow-sm p-5 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}
                >
                  <s.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {s.label}
                </span>
              </div>
              <p className="text-3xl font-bold text-primary">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-border/30 shadow-sm mb-6 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher par produit, client, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all bg-white appearance-none min-w-[160px]"
              >
                <option value="all">Tous les statuts</option>
                <option value="new">Nouveau</option>
                <option value="confirmed">Confirmé</option>
                <option value="completed">Terminé</option>
                <option value="cancelled">Annulé</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Requests list */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-16">
              <RefreshCw className="w-8 h-8 text-muted-foreground animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Chargement...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-border/30 shadow-sm text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral/20 flex items-center justify-center">
                <Truck className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-lg font-semibold text-primary mb-1">
                Aucune demande
              </p>
              <p className="text-sm text-muted-foreground">
                {requests.length === 0
                  ? "Les demandes de location apparaîtront ici"
                  : "Aucun résultat pour ces filtres"}
              </p>
            </div>
          ) : (
            filtered.map((req, i) => {
              const statusCfg = STATUS_CONFIG[req.status];
              const StatusIcon = statusCfg.icon;
              const isExpanded = expandedId === req.id;

              return (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl border border-border/30 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {/* Summary row */}
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : req.id)
                    }
                    className="w-full px-6 py-5 flex items-center gap-4 text-left hover:bg-neutral/20 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <h3 className="text-sm font-bold text-primary truncate">
                          {req.productName}
                        </h3>
                        {req.variant && (
                          <span className="px-2 py-0.5 bg-primary/5 text-xs font-medium text-primary rounded-md">
                            {req.variant}
                          </span>
                        )}
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusCfg.color}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {statusCfg.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {req.customerName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(req.startDate).toLocaleDateString("fr-BE")} —{" "}
                          {req.duration}{" "}
                          {req.durationUnit === "jour"
                            ? "jour(s)"
                            : req.durationUnit === "heure"
                            ? "heure(s)"
                            : "an(s)"}
                        </span>
                        <span className="hidden sm:inline text-xs">
                          {new Date(req.createdAt).toLocaleDateString("fr-BE", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-border/30 pt-4 animate-fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Client
                            </p>
                            <p className="text-sm font-semibold text-primary">
                              {req.customerName}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Email
                            </p>
                            <a
                              href={`mailto:${req.customerEmail}`}
                              className="text-sm font-semibold text-primary hover:text-accent transition-colors"
                            >
                              {req.customerEmail}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Téléphone
                            </p>
                            <a
                              href={`tel:${req.customerPhone}`}
                              className="text-sm font-semibold text-primary hover:text-accent transition-colors"
                            >
                              {req.customerPhone}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Date de début
                            </p>
                            <p className="text-sm font-semibold text-primary">
                              {new Date(req.startDate).toLocaleDateString(
                                "fr-BE",
                                {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Durée
                            </p>
                            <p className="text-sm font-semibold text-primary">
                              {req.duration}{" "}
                              {req.durationUnit === "jour"
                                ? "jour(s)"
                                : req.durationUnit === "heure"
                                ? "heure(s)"
                                : "an(s)"}
                            </p>
                          </div>
                        </div>
                        {req.variant && (
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Variante
                              </p>
                              <p className="text-sm font-semibold text-primary">
                                {req.variant}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {req.remarks && (
                        <div className="mb-5 p-4 bg-neutral/30 rounded-xl">
                          <div className="flex items-center gap-2 mb-1">
                            <MessageSquare className="w-4 h-4 text-muted-foreground" />
                            <p className="text-xs font-semibold text-muted-foreground">
                              Remarques
                            </p>
                          </div>
                          <p className="text-sm text-primary">{req.remarks}</p>
                        </div>
                      )}

                      {/* Status actions */}
                      <div className="flex flex-wrap gap-2">
                        <p className="text-xs font-semibold text-muted-foreground self-center mr-2">
                          Changer le statut :
                        </p>
                        {(
                          ["new", "confirmed", "completed", "cancelled"] as const
                        ).map((s) => {
                          const cfg = STATUS_CONFIG[s];
                          return (
                            <button
                              key={s}
                              onClick={() => updateStatus(req.id, s)}
                              disabled={req.status === s}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                                req.status === s
                                  ? `${cfg.color} ring-2 ring-offset-1 ring-current/20`
                                  : "bg-white border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
                              }`}
                            >
                              <cfg.icon className="w-3 h-3" />
                              {cfg.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
