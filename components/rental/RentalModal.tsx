"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, CheckCircle, Loader2 } from "lucide-react";
import { RentalProduct, formatRentalPrice } from "@/lib/rental/data";

interface RentalModalProps {
  product: RentalProduct | null;
  onClose: () => void;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function RentalModal({ product, onClose }: RentalModalProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("1");
  const [variant, setVariant] = useState("");
  const [remarks, setRemarks] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
      setFormState("idle");
      setName("");
      setEmail("");
      setPhone("");
      setStartDate("");
      setDuration("1");
      setVariant(product.variants?.[0] || "");
      setRemarks("");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  if (!product) return null;

  const durationLabel =
    product.priceUnit === "jour"
      ? "Nombre de jours"
      : product.priceUnit === "heure"
      ? "Nombre d'heures"
      : "Nombre d'années";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    try {
      const res = await fetch("/api/rentals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          variant: variant || null,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          startDate,
          duration: Number(duration),
          durationUnit: product.priceUnit,
          remarks: remarks || null,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-scale">
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-primary to-primary/90">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-white pr-8">
            Demande de location
          </h2>
          <p className="text-sm text-white/80 mt-0.5">{product.name}</p>
          <p className="text-xs text-accent font-semibold mt-1">
            {formatRentalPrice(product.priceCents, product.priceUnit)}
          </p>
        </div>

        {formState === "success" ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">
              Demande envoyée !
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Nous vous recontacterons dans les plus brefs délais pour confirmer
              la disponibilité.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-1">
                Nom &amp; prénom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                placeholder="Jean Dupont"
              />
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder="jean@exemple.be"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-1">
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder="+32 470 00 00 00"
                />
              </div>
            </div>

            {/* Variant selector */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-primary mb-1">
                  Variante <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={variant}
                  onChange={(e) => setVariant(e.target.value)}
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all bg-white"
                >
                  {product.variants.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Date + Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-1">
                  Date de début <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-1">
                  {durationLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                />
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-1">
                Remarques
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
                placeholder="Informations complémentaires..."
              />
            </div>

            {formState === "error" && (
              <p className="text-sm text-red-600 font-medium">
                Une erreur est survenue. Veuillez réessayer.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={formState === "submitting"}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-primary font-bold rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formState === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Envoyer la demande
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
