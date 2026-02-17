"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/shop/cart";
import { formatPrice } from "@/lib/shop/utils";
import { createOrder } from "@/lib/shop/queries";
import type { CheckoutFormData } from "@/types/shop";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    company: '',
    delivery_address: '',
    notes: '',
  });

  const total = getTotal();

  if (items.length === 0 && !isSuccess) {
    router.push('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone || undefined,
        company: formData.company || undefined,
        delivery_address: formData.delivery_address || undefined,
        notes: formData.notes || undefined,
        status: 'new' as const,
        total_cents: total,
        currency: 'EUR',
      };

      const orderItems = items.map((item) => ({
        product_id: item.product.id,
        product_title: item.product.title,
        qty: item.qty,
        unit_price_cents: item.product.price_cents,
        line_total_cents: item.product.price_cents * item.qty,
      }));

      // In a real app, this would be a server action
      // For now, we'll use a client-side fetch
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: orderData, items: orderItems }),
      });

      if (response.ok) {
        clearCart();
        setIsSuccess(true);
      } else {
        alert('Erreur lors de la création de la commande. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Erreur lors de la création de la commande. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-neutral/20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <Reveal>
            <div className="bg-white rounded-2xl border border-border p-8 sm:p-12 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                Merci pour votre commande
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-8">
                Votre demande a été envoyée avec succès. Notre équipe vous recontactera rapidement pour confirmer votre commande et finaliser les détails de livraison.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild href="/shop" variant="outline">
                  Continuer les achats
                </Button>
                <Button asChild href="/" variant="primary">
                  Retour à l&apos;accueil
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-neutral/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Reveal>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au panier
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-8">
            Finaliser la commande
          </h1>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Reveal>
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border/50 p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-primary mb-4">Informations de contact</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.customer_name}
                        onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.customer_email}
                        onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={formData.customer_phone}
                        onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Entreprise
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-primary mb-4">Adresse de livraison</h2>
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Adresse complète
                    </label>
                    <textarea
                      value={formData.delivery_address}
                      onChange={(e) => setFormData({ ...formData, delivery_address: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Rue, numéro, code postal, ville"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Notes (optionnel)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Instructions spéciales, horaires de livraison préférés..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full bg-primary text-white hover:bg-primary/90"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Confirmer la commande'}
                </Button>
              </form>
            </Reveal>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Reveal delay={100}>
              <div className="bg-white rounded-2xl border border-border/50 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-primary mb-6">Résumé</h2>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.product_id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.product.title} × {item.qty}
                      </span>
                      <span className="font-semibold">
                        {formatPrice(item.product.price_cents * item.qty, 'EUR')}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 flex justify-between">
                  <span className="font-bold text-primary">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(total, 'EUR')}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
