"use client";

import { useState, type FormEvent } from "react";
import {
  CheckCircle,
  Users,
  ShieldCheck,
  Handshake,
  ChevronDown,
  Send,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import CTACompact from "@/components/sections/CTA";

type FormData = {
  travaux: string[];
  surface: string;
  localite: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  message: string;
  materiauxAlternatifs: boolean;
  recommandations: boolean;
  conseils: boolean;
  posePartielle: boolean;
  dateRealisation: string;
  budget: string;
};

const INITIAL_FORM: FormData = {
  travaux: [],
  surface: "0",
  localite: "",
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  message: "",
  materiauxAlternatifs: false,
  recommandations: false,
  conseils: false,
  posePartielle: false,
  dateRealisation: "",
  budget: "",
};

const TRAVAUX_OPTIONS = [
  "Toiture",
  "Façade",
  "Isolation",
  "Tôles acier / Hangar / Bâtiment industriel",
  "Programme Économie d'Énergie / Isolation de ma maison",
  "Autre",
];

export default function TrouverProfessionnelPage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormData, value: string | string[] | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleTravaux = (opt: string) => {
    setForm((prev) => ({
      ...prev,
      travaux: prev.travaux.includes(opt)
        ? prev.travaux.filter((t) => t !== opt)
        : [...prev.travaux, opt],
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      {/* ── Hero ── */}
      <section className="relative py-16 sm:py-20 lg:py-28 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2f4a]/60 via-primary/40 to-[#2B4162]/60" />
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(245,192,0,0.4) 0%, transparent 70%)",
              top: "10%",
              right: "-10%",
              animation: "pulse-slow 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15"
            style={{
              background:
                "radial-gradient(circle, rgba(245,192,0,0.3) 0%, transparent 70%)",
              bottom: "0%",
              left: "-5%",
              animation: "pulse-slow 10s ease-in-out infinite reverse",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
                Trouver un entrepreneur professionnel et sérieux
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
                Vous avez un projet de toiture ou de façade ? Chez Comarden,
                vous frappez à la bonne porte.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Section 1 — Accompagnement ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <span className="text-accent font-medium tracking-wide uppercase text-xs sm:text-sm">
                  Notre approche
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-6">
                Un accompagnement professionnel pour votre projet
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground mb-8">
                Nos conseillers peuvent :
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Analyser votre projet à partir de vos plans, descriptifs ou photos",
                  "Vous conseiller sur les solutions techniques les plus adaptées",
                  "Établir une liste précise des matériaux nécessaires",
                  "Vous orienter vers des produits fiables et performants",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-base text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed border-l-4 border-accent/40 pl-4">
                Si nécessaire, une rencontre peut être organisée dans l&apos;un
                de nos sites (Naninne ou Bertrix). Un déplacement sur chantier
                peut également être envisagé si nécessaire.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Section 2 — Mise en relation ── */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-neutral/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                </div>
                <span className="text-accent font-medium tracking-wide uppercase text-xs sm:text-sm">
                  Sélection rigoureuse
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-6">
                Mise en relation avec des professionnels qualifiés
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground mb-8">
                Une fois la liste des matériaux établie, nous la transmettons à
                des entrepreneurs professionnels spécialisés dans votre type de
                chantier. Les professionnels sont sélectionnés :
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "En fonction de leur savoir-faire et de leur spécialisation",
                  "Sur base de leur sérieux et de leur fiabilité",
                  "Avec une vérification de leur solvabilité",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-base text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-base sm:text-lg text-muted-foreground font-medium">
                Notre objectif est de vous mettre en relation avec des
                professionnels compétents et de confiance.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Section 3 — Accompagnement A à Z ── */}
      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Handshake className="w-5 h-5 text-accent" />
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-6">
                Un accompagnement de A à Z
              </h2>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                Chez Comarden, nous ne nous contentons pas de fournir des
                matériaux. Nous vous accompagnons tout au long de votre projet,
                de l&apos;analyse technique jusqu&apos;à la mise en relation
                avec les professionnels. Comarden, votre partenaire pour réussir
                votre projet de toiture ou de façade en Wallonie et à Bruxelles.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-neutral/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-8 text-center">
                Démarrer votre projet
              </h2>

              {submitted ? (
                <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Demande envoyée !
                  </h3>
                  <p className="text-muted-foreground">
                    Merci pour votre demande. Notre équipe vous recontactera
                    dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 bg-white rounded-xl border border-border p-6 sm:p-8 shadow-sm"
                >
                  {/* Type de travaux (plusieurs choix) */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Type de travaux
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {TRAVAUX_OPTIONS.map((opt) => (
                        <label
                          key={opt}
                          className="inline-flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={form.travaux.includes(opt)}
                            onChange={() => toggleTravaux(opt)}
                            className="rounded border-border text-accent focus:ring-accent/50"
                          />
                          <span className="text-sm text-foreground">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Surface + Localité */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="surface"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Surface estimée (m²)
                      </label>
                      <input
                        id="surface"
                        type="text"
                        placeholder="0"
                        value={form.surface}
                        onChange={(e) => update("surface", e.target.value)}
                        className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                      />
                      <p className="mt-1 text-xs text-muted-foreground">
                        {!form.surface.trim() ? "0 m²" : `${form.surface} m²`}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="localite"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Localité
                      </label>
                      <input
                        id="localite"
                        type="text"
                        value={form.localite}
                        onChange={(e) => update("localite", e.target.value)}
                        className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                      />
                    </div>
                  </div>

                  {/* Nom + Prénom */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="nom" className="block text-sm font-medium text-foreground mb-1.5">
                        Nom <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="nom"
                        type="text"
                        required
                        value={form.nom}
                        onChange={(e) => update("nom", e.target.value)}
                        className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="prenom" className="block text-sm font-medium text-foreground mb-1.5">
                        Prénom
                      </label>
                      <input
                        id="prenom"
                        type="text"
                        value={form.prenom}
                        onChange={(e) => update("prenom", e.target.value)}
                        className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                      />
                    </div>
                  </div>

                  {/* Email + GSM */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="telephone"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        GSM
                      </label>
                      <input
                        id="telephone"
                        type="tel"
                        value={form.telephone}
                        onChange={(e) => update("telephone", e.target.value)}
                        className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                      />
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.materiauxAlternatifs}
                        onChange={(e) => update("materiauxAlternatifs", e.target.checked)}
                        className="rounded border-border text-accent focus:ring-accent/50"
                      />
                      <span className="text-sm text-foreground">Matériaux alternatifs si possibilité</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.recommandations}
                        onChange={(e) => update("recommandations", e.target.checked)}
                        className="rounded border-border text-accent focus:ring-accent/50"
                      />
                      <span className="text-sm text-foreground">Recommandations souhaitées</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.conseils}
                        onChange={(e) => update("conseils", e.target.checked)}
                        className="rounded border-border text-accent focus:ring-accent/50"
                      />
                      <span className="text-sm text-foreground">Je n&apos;y connais rien et j&apos;aimerais des conseils</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.posePartielle}
                        onChange={(e) => update("posePartielle", e.target.checked)}
                        className="rounded border-border text-accent focus:ring-accent/50"
                      />
                      <span className="text-sm text-foreground">Pose partielle</span>
                    </label>
                  </div>

                  {/* Date de réalisation + Budget */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="dateRealisation"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Date de réalisation souhaitée
                      </label>
                      <input
                        id="dateRealisation"
                        type="date"
                        value={form.dateRealisation}
                        onChange={(e) => update("dateRealisation", e.target.value)}
                        className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Budget estimé (HTVA) €
                      </label>
                      <input
                        id="budget"
                        type="text"
                        inputMode="numeric"
                        placeholder="0"
                        value={form.budget}
                        onChange={(e) => update("budget", e.target.value)}
                        className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-accent text-primary font-semibold rounded-full px-8 py-3 text-sm sm:text-base hover:bg-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    Démarrer votre projet
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTACompact />
    </div>
  );
}
