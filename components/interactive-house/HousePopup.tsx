"use client";

import { useEffect, useRef } from "react";
import { X, Phone, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { HousePart } from "@/lib/houseParts";

interface HousePopupProps {
  part: HousePart | null;
  isOpen: boolean;
  onClose: () => void;
  triggerElement: HTMLElement | null;
  isMobile: boolean;
}

export default function HousePopup({
  part,
  isOpen,
  onClose,
  triggerElement,
  isMobile,
}: HousePopupProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && part) {
      // Store the element that triggered the modal
      previousFocusRef.current = triggerElement;

      // Prevent body scroll on mobile
      document.body.style.overflow = "hidden";

      // Focus close button after a short delay (for animation)
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      // Restore body scroll
      document.body.style.overflow = "";

      // Restore focus to trigger element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, part, triggerElement]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Handle outside click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !part) return null;

  const Icon = part.icon;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 animate-fade-in"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal / Bottom Sheet */}
      <div
        ref={modalRef}
        className={`fixed z-[61] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar ${
          isMobile
            ? "bottom-0 left-0 right-0 animate-slide-up"
            : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg animate-scale-in"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="house-popup-title"
      >
        {/* Drag handle (mobile only) */}
        {isMobile && (
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
          </div>
        )}

        {/* Header */}
        <div className="relative p-6 border-b border-slate-200 bg-gradient-to-br from-primary/5 to-white">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
              <Icon className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <h2
                id="house-popup-title"
                className="text-xl font-bold text-primary mb-1"
              >
                {part.label}
              </h2>
              {part.tag && (
                <span className="inline-block px-2 py-0.5 text-xs font-semibold text-accent bg-accent/10 rounded-full">
                  {part.tag}
                </span>
              )}
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="flex-shrink-0 p-2 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-slate-600" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-slate-700 leading-relaxed">{part.description}</p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={part.productHref}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2 group"
            >
              Voir les produits
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
            </Link>

            <Link
              href={part.quoteHref}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-primary text-primary hover:bg-primary/5 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2"
            >
              Demander un devis
              <ExternalLink className="w-4 h-4" strokeWidth={2.5} />
            </Link>
          </div>

          {/* Optional phone CTA */}
          <a
            href="tel:061230456"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl font-medium text-slate-700 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group"
          >
            <Phone className="w-4 h-4 text-slate-600 group-hover:text-primary transition-colors" strokeWidth={2.5} />
            Appeler maintenant
          </a>
        </div>
      </div>
    </>
  );
}
