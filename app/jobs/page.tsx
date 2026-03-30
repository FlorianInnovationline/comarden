"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { GraduationCap, Heart, Briefcase, Lightbulb, Upload, CheckCircle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import CTACompact from "@/components/sections/CTA";

const arguments_ = [
  {
    icon: GraduationCap,
    title: "Formation et évolution professionnelle",
    text: "Chez Comarden, de nombreux collaborateurs ont évolué\u00a0: chauffeurs devenus magasiniers, puis technico-commerciaux. Nous investissons dans votre avenir.",
  },
  {
    icon: Heart,
    title: "Culture familiale et bienveillante",
    text: "L\u2019ambiance chez Comarden est unique\u00a0: respect, entraide et convivialité. Vous êtes plus qu\u2019un employé, vous faites partie de la famille.",
  },
  {
    icon: Briefcase,
    title: "Métiers variés",
    text: "Logistique, magasinage, conseil technique, administration… Chaque profil trouve sa place et peut s\u2019épanouir.",
  },
  {
    icon: Lightbulb,
    title: "Innovation et avant-garde",
    text: "Marques exclusives, R&D avec nos partenaires, formations continues\u00a0: Comarden est toujours à la pointe.",
  },
];

const postes = [
  "Technico-commercial interne",
  "Technico-Commercial Externe",
  "Magasinier",
  "Chauffeur camion",
  "Administratif",
  "Autre",
  "Stagiaire avec finalité",
];

export default function JobsPage() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    localite: "",
    posteActuel: "",
    fonctionActuelle: "",
    dateNaissance: "",
    gsm: "",
    email: "",
    poste: "",
    remarques: "",
  });
  const [cv, setCv] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";

  return (
    <div className="pt-20">
      {/* ─── HERO ─── */}
      <section className="relative pt-20 pb-20 lg:pt-28 lg:pb-28 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2f4a] via-primary to-[#2B4162]" />
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(245,192,0,0.4) 0%, transparent 70%)",
              top: "10%",
              right: "-10%",
              animation: "pulse-slow 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(245,192,0,0.3) 0%, transparent 70%)",
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
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                  </span>
                  <span className="text-accent font-medium tracking-wide uppercase text-sm">
                    Rejoignez-nous
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                  Pourquoi travailler chez&nbsp;Comarden&nbsp;?
                </h1>
                <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
                  Rejoignez une entreprise familiale dynamique, spécialisée dans les matériaux de
                  construction en Belgique. Ici, chaque talent compte et chaque parcours est unique.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
                <Image
                  src="/images/Jobs/1.jpg"
                  alt="Équipe Comarden — carrières"
                  width={1400}
                  height={1050}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── ARGUMENTS ─── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
          {arguments_.map((arg, i) => {
            const Icon = arg.icon;
            const reversed = i % 2 !== 0;
            return (
              <Reveal key={arg.title} delay={i * 80}>
                <div
                  className={`flex flex-col ${
                    reversed ? "lg:flex-row-reverse" : "lg:flex-row"
                  } items-center gap-10 lg:gap-16`}
                >
                  {/* Icon block */}
                  <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-accent/10">
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-accent" strokeWidth={1.6} />
                  </div>

                  {/* Text card */}
                  <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3">
                      {arg.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{arg.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ─── APPLICATION FORM ─── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
              Postulez chez Comarden
            </h2>
            <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
              Remplissez le formulaire ci-dessous et nous reviendrons vers vous dans les plus brefs
              délais.
            </p>
          </Reveal>

          {submitted ? (
            <Reveal>
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h3 className="text-2xl font-bold text-primary">Merci pour votre candidature&nbsp;!</h3>
                <p className="text-gray-500 max-w-md">
                  Nous avons bien reçu votre demande et reviendrons vers vous rapidement.
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={100}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom / Prénom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="nom"
                      name="nom"
                      type="text"
                      required
                      value={form.nom}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Dupont"
                    />
                  </div>
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="prenom"
                      name="prenom"
                      type="text"
                      required
                      value={form.prenom}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Jean"
                    />
                  </div>
                </div>

                {/* Localité */}
                <div>
                  <label htmlFor="localite" className="block text-sm font-medium text-gray-700 mb-1">
                    Localité
                  </label>
                  <input
                    id="localite"
                    name="localite"
                    type="text"
                    value={form.localite}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Namur"
                  />
                </div>

                {/* Poste actuel / Fonction actuelle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="posteActuel" className="block text-sm font-medium text-gray-700 mb-1">
                      Poste actuel
                    </label>
                    <input
                      id="posteActuel"
                      name="posteActuel"
                      type="text"
                      value={form.posteActuel}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="fonctionActuelle" className="block text-sm font-medium text-gray-700 mb-1">
                      Fonction actuelle
                    </label>
                    <input
                      id="fonctionActuelle"
                      name="fonctionActuelle"
                      type="text"
                      value={form.fonctionActuelle}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Date de naissance */}
                <div>
                  <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700 mb-1">
                    Date de naissance
                  </label>
                  <input
                    id="dateNaissance"
                    name="dateNaissance"
                    type="date"
                    value={form.dateNaissance}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* GSM / Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="gsm" className="block text-sm font-medium text-gray-700 mb-1">
                      GSM
                    </label>
                    <input
                      id="gsm"
                      name="gsm"
                      type="tel"
                      value={form.gsm}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="+32 470 00 00 00"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="jean.dupont@email.be"
                    />
                  </div>
                </div>

                {/* Poste souhaité */}
                <div>
                  <label htmlFor="poste" className="block text-sm font-medium text-gray-700 mb-1">
                    Je postule pour un poste de
                  </label>
                  <select
                    id="poste"
                    name="poste"
                    value={form.poste}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">— Sélectionnez —</option>
                    {postes.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CV upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléchargez votre CV
                  </label>
                  <label
                    htmlFor="cv"
                    className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-4 transition hover:border-accent hover:bg-accent/5"
                  >
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {cv ? cv.name : "PDF, DOC ou DOCX (max 5 Mo)"}
                    </span>
                    <input
                      id="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => setCv(e.target.files?.[0] ?? null)}
                    />
                  </label>
                </div>

                {/* Remarques */}
                <div>
                  <label htmlFor="remarques" className="block text-sm font-medium text-gray-700 mb-1">
                    Remarques
                  </label>
                  <textarea
                    id="remarques"
                    name="remarques"
                    rows={4}
                    value={form.remarques}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Informations complémentaires, disponibilités…"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-accent px-10 py-3.5 text-sm font-semibold text-primary shadow-lg shadow-accent/25 transition hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/40"
                >
                  Envoyer ma candidature
                </button>
              </form>
            </Reveal>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 sm:py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Comarden&nbsp;: votre carrière, notre priorité.
            </h2>
          </Reveal>
        </div>
      </section>

      <CTACompact />
    </div>
  );
}
