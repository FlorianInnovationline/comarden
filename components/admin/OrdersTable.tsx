"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Order } from "@/types/shop";
import { formatPrice } from "@/lib/shop/utils";

interface OrdersTableProps {
  orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "new":
        return "bg-orange-100 text-orange-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "new":
        return "Nouveau";
      case "confirmed":
        return "Confirmé";
      case "shipped":
        return "Expédié";
      case "completed":
        return "Terminé";
      case "cancelled":
        return "Annulé";
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-border/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral/30">
            <tr>
              <th className="text-left py-3 px-4 sm:px-6 text-sm font-semibold text-primary">
                Date
              </th>
              <th className="text-left py-3 px-4 sm:px-6 text-sm font-semibold text-primary">
                Client
              </th>
              <th className="text-left py-3 px-4 sm:px-6 text-sm font-semibold text-primary">
                Total
              </th>
              <th className="text-left py-3 px-4 sm:px-6 text-sm font-semibold text-primary">
                Statut
              </th>
              <th className="text-right py-3 px-4 sm:px-6 text-sm font-semibold text-primary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-muted-foreground">
                  Aucune commande pour le moment
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <>
                  <tr
                    key={order.id}
                    className="border-b border-border/50 hover:bg-neutral/20 transition-colors cursor-pointer"
                    onClick={() =>
                      setExpandedOrder(expandedOrder === order.id ? null : order.id)
                    }
                  >
                    <td className="py-4 px-4 sm:px-6 text-sm">
                      {new Date(order.created_at).toLocaleDateString("fr-BE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-medium text-primary">{order.customer_name}</div>
                      <div className="text-xs text-muted-foreground">
                        {order.customer_email}
                      </div>
                      {order.company && (
                        <div className="text-xs text-muted-foreground">{order.company}</div>
                      )}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-semibold text-primary">
                      {formatPrice(order.total_cents, order.currency)}
                    </td>
                    <td className="py-4 px-4 sm:px-6">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center justify-end">
                        {expandedOrder === order.id ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </td>
                  </tr>
                  {expandedOrder === order.id && order.items && (
                    <tr className="bg-neutral/10">
                      <td colSpan={5} className="py-4 px-4 sm:px-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-primary mb-2">Articles</h4>
                            <div className="space-y-2">
                              {order.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex justify-between text-sm py-2 border-b border-border/50"
                                >
                                  <div>
                                    <div className="font-medium">{item.product_title}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {item.qty} × {formatPrice(item.unit_price_cents, "EUR")}
                                    </div>
                                  </div>
                                  <div className="font-semibold">
                                    {formatPrice(item.line_total_cents, "EUR")}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          {order.delivery_address && (
                            <div>
                              <h4 className="font-semibold text-primary mb-1">
                                Adresse de livraison
                              </h4>
                              <p className="text-sm text-muted-foreground whitespace-pre-line">
                                {order.delivery_address}
                              </p>
                            </div>
                          )}
                          {order.notes && (
                            <div>
                              <h4 className="font-semibold text-primary mb-1">Notes</h4>
                              <p className="text-sm text-muted-foreground">{order.notes}</p>
                            </div>
                          )}
                          <div>
                            <label className="block text-sm font-semibold text-primary mb-2">
                              Mettre à jour le statut
                            </label>
                            <select
                              defaultValue={order.status}
                              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                            >
                              <option value="new">Nouveau</option>
                              <option value="confirmed">Confirmé</option>
                              <option value="shipped">Expédié</option>
                              <option value="completed">Terminé</option>
                              <option value="cancelled">Annulé</option>
                            </select>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
