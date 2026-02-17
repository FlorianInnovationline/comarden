"use client";

import { CheckCircle2, Phone, Home } from "lucide-react";
import Link from "next/link";

export default function SuccessState() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="text-center">
        {/* Success icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
            <CheckCircle2 className="w-12 h-12 text-green-600" strokeWidth={2} />
          </div>
        </div>

        {/* Success message */}
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
          Merci — nous vous recontactons sous 24h.
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          Votre demande a bien été enregistrée. Notre équipe va l'analyser et vous contacter rapidement.
        </p>

        {/* Phone contact */}
        <div className="mb-10 p-6 bg-slate-50 rounded-xl border border-slate-200 inline-block">
          <div className="flex items-center gap-3">
            <Phone className="w-6 h-6 text-accent" />
            <div className="text-left">
              <p className="text-sm text-slate-500 mb-1">Vous pouvez aussi nous appeler :</p>
              <a
                href="tel:061412706"
                className="text-xl font-bold text-primary hover:text-accent transition-colors"
              >
                061 41 27 06
              </a>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/20 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Revenir à l'accueil
          </Link>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-white border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20"
          >
            Faire une nouvelle demande
          </button>
        </div>
      </div>
    </div>
  );
}
