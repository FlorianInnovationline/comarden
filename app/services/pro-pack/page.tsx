import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  TrendingUp,
  Rocket,
  FileText,
  Users,
  FolderOpen,
  Calculator,
  Clock,
  ArrowRight,
  Award,
  Target,
  BarChart3,
  Briefcase,
  Handshake,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Quote,
  Phone,
} from "lucide-react";
import CTACompact from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Pack PRO - Comarden",
  description:
    "Les PACK PRO Comarden : accompagnement unique en Belgique pour les professionnels du bâtiment.",
};

const packs = [
  {
    number: 1,
    name: "Pro PACK 1",
    icon: Star,
    description:
      "Pour ceux qui aiment leur métier mais préfèrent déléguer l\u2019administratif.",
  },
  {
    number: 2,
    name: "Pro PACK 2",
    icon: TrendingUp,
    description:
      "Pour les débutants souhaitant mieux vendre, créer des devis professionnels et rentables, avec accompagnement sur chantier.",
  },
  {
    number: 3,
    name: "Pro PACK 3",
    icon: Rocket,
    description:
      "Pour les entreprises ambitieuses qui veulent se développer et booster leur croissance.",
  },
];

const pack1Includes = [
  { icon: Users, label: "Gestion du secrétariat social" },
  { icon: FolderOpen, label: "Suivi administratif des dossiers" },
  { icon: Briefcase, label: "Organisation interne" },
  { icon: Calculator, label: "Comptabilité complète" },
  { icon: Clock, label: "Tâches chronophages prises en charge" },
];

const pack1Benefits = [
  "Gain de temps immédiat",
  "Réduction de la charge administrative et comptable",
  "Meilleure organisation interne",
  "Optimisation des performances et de la rentabilité",
  "Sans investissement de départ",
];

const pack2Includes = [
  { icon: FileText, label: "Création de devis professionnels, clairs et rentables" },
  { icon: Target, label: "Mise à disposition de supports commerciaux performants" },
  { icon: Handshake, label: "Accompagnement sur chantier" },
  { icon: ShieldCheck, label: "Aide au choix des matériaux selon le budget et les exigences techniques" },
];

const pack2Benefits = [
  "Meilleurs taux de transformation",
  "Devis plus précis et plus rentables",
  "Moins d\u2019erreurs sur chantier",
  "Clients plus satisfaits",
  "Montée en compétence rapide",
];

const pack3Includes = [
  { icon: Target, label: "Stratégie de développement et organisation interne" },
  { icon: Users, label: "Structuration des équipes (vente, administratif, production)" },
  { icon: TrendingUp, label: "Optimisation des processus commerciaux et opérationnels" },
  { icon: FolderOpen, label: "Suivi des commandes et gestion des flux" },
  { icon: BarChart3, label: "Contrôle et rentabilité des chantiers" },
  { icon: Handshake, label: "Gestion et encadrement des sous-traitants" },
];

const pack3Benefits = [
  "Vision claire et structurée de votre croissance",
  "Organisation plus performante",
  "Meilleure maîtrise de vos marges",
  "Équipes plus efficaces et mieux encadrées",
  "Développement sécurisé et durable",
];

export default function ProPackPage() {
  return (
    <div className="pt-20">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-primary py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2f4a] via-primary to-[#2B4162]" />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(245,192,0,0.4) 0%, transparent 70%)",
            bottom: "0%",
            right: "-5%",
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                </span>
                <span className="text-accent font-medium tracking-wide uppercase text-sm">
                  Unique en Belgique
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
                UNIQUE EN BELGIQUE —{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Les PACK PRO</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-accent/30 -skew-x-3" />
                </span>{" "}
                Comarden
              </h1>

              <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl">
                Chez Comarden, nous combinons savoir-faire, expertise technique
                et accompagnement sur le terrain pour aider nos clients à gagner
                en performance et en rentabilité.
              </p>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              <div className="w-full aspect-[4/3] rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center gap-4">
                <Rocket className="w-16 h-16 text-accent/60" />
                <span className="text-white/40 text-sm font-medium">
                  Image Pack PRO — à venir
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 60V30C240 10 480 0 720 0C960 0 1200 10 1440 30V60H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ── Pack PRO Cards ── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
              Nos trois formules d&apos;accompagnement
            </h2>
            <p className="text-base sm:text-lg text-primary/70 leading-relaxed">
              Un accompagnement adapté à chaque profil de professionnel.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {packs.map((pack) => {
              const Icon = pack.icon;
              return (
                <div
                  key={pack.number}
                  className="group relative bg-white rounded-2xl border-2 border-primary/10 p-8 hover:border-accent hover:shadow-xl hover:shadow-accent/10 transition-all duration-300"
                >
                  <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-accent text-primary font-bold text-lg flex items-center justify-center shadow-lg">
                    {pack.number}
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                    {pack.name}
                  </h3>

                  <p className="text-primary/70 leading-relaxed">
                    {pack.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — Detailed Pack Descriptions
      ══════════════════════════════════════════════════════════ */}

      {/* ── PACK 1 Detail ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with image */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-10 items-center">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-primary font-bold text-sm">1</span>
                <span className="text-sm font-semibold text-accent uppercase tracking-widest">Pro Pack 1</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-3">
                Libérez-vous de l&apos;administratif
              </h2>
              <p className="text-lg text-primary/60 font-medium italic mb-5">
                &ldquo;Concentrez-vous sur votre métier, on gère le reste.&rdquo;
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Vous êtes un professionnel passionné par votre métier, mais l&apos;administratif
                et la comptabilité vous freinent au quotidien ? Avec le Pro PACK 1, Comarden
                vous accompagne dans la gestion complète de votre administratif et comptable :
                secrétariat social, suivi des dossiers, organisation, comptabilité et autres
                tâches chronophages.
              </p>
            </div>
            <div className="lg:col-span-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <Image
                  src="/images/services/PackPro/1.jpg"
                  alt="Pro Pack 1 — Accompagnement administratif"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          {/* Two columns: includes + benefits */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Ce qui est inclus</h3>
              <div className="space-y-3">
                {pack1Includes.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-slate-200 shadow-sm">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4.5 h-4.5 text-accent" />
                      </div>
                      <span className="text-sm sm:text-base text-slate-700 font-medium">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Vos avantages</h3>
              <div className="space-y-2 mb-8">
                {pack1Benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-emerald-700">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quote callout full-width */}
          <div className="relative bg-primary rounded-2xl p-6 sm:p-8 mt-8">
            <Quote className="absolute top-4 right-4 w-10 h-10 text-white/10" />
            <p className="text-lg sm:text-xl text-white font-semibold leading-relaxed">
              &ldquo;Une activité plus fluide, plus rentable, et moins de stress au quotidien.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── PACK 2 Detail ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with image — reversed layout */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-10 items-center">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <Image
                  src="/images/services/PackPro/2.jpg"
                  alt="Pro Pack 2 — Accompagnement commercial"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-primary font-bold text-sm">2</span>
                <span className="text-sm font-semibold text-accent uppercase tracking-widest">Pro Pack 2</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-3">
                Vendez mieux, gagnez plus
              </h2>
              <p className="text-lg text-primary/60 font-medium italic mb-5">
                &ldquo;Structurez vos offres, améliorez vos devis, augmentez votre rentabilité.&rdquo;
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Vous débutez ou souhaitez améliorer vos performances commerciales et techniques ?
                Avec le Pro PACK 2, Comarden vous accompagne pour structurer vos offres, améliorer
                vos devis et augmenter votre rentabilité. Notre mission : vous aider à mieux vendre
                et à sécuriser vos chantiers.
              </p>
            </div>
          </div>

          {/* Two columns: includes + benefits */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Notre accompagnement</h3>
              <div className="space-y-3 mb-6">
                {pack2Includes.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 shadow-sm">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4.5 h-4.5 text-accent" />
                      </div>
                      <span className="text-sm sm:text-base text-slate-700 font-medium">{item.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="bg-accent/10 border-2 border-accent/30 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  <h4 className="text-base font-bold text-primary">L&apos;analyse de vos performances</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Nous analysons avec vous les écarts entre votre devis initial,
                  la commande finale de matériaux, et la réalité du chantier.
                  Objectif : identifier les erreurs, les corriger durablement et augmenter votre marge.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Vos avantages</h3>
              <div className="space-y-2">
                {pack2Benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-emerald-700">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative bg-primary rounded-2xl p-6 sm:p-8 mt-8">
            <Quote className="absolute top-4 right-4 w-10 h-10 text-white/10" />
            <p className="text-lg sm:text-xl text-white font-semibold leading-relaxed">
              &ldquo;Vous gagnez en crédibilité, en efficacité et en rentabilité. Sans investissement de départ.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── PACK 3 Detail ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with image */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-10 items-center">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-primary font-bold text-sm">3</span>
                <span className="text-sm font-semibold text-accent uppercase tracking-widest">Pro Pack 3</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-3">
                Accélérez votre croissance
              </h2>
              <p className="text-lg text-primary/60 font-medium italic mb-5">
                &ldquo;Structurez votre développement, professionnalisez votre organisation.&rdquo;
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Vous êtes une entreprise ambitieuse avec une réelle volonté de croissance ?
                Le Pro PACK 3 est conçu pour vous aider à passer un cap : structurer votre
                développement, professionnaliser votre organisation et maximiser votre
                performance globale. La croissance ne s&apos;improvise pas — elle nécessite une
                vision claire, des processus structurés et un accompagnement stratégique.
              </p>
            </div>
            <div className="lg:col-span-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <Image
                  src="/images/services/PackPro/3.jpg"
                  alt="Pro Pack 3 — Accompagnement croissance"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          {/* Two columns: includes + benefits */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Accompagnement complet</h3>
              <div className="space-y-3">
                {pack3Includes.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-slate-200 shadow-sm">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4.5 h-4.5 text-accent" />
                      </div>
                      <span className="text-sm sm:text-base text-slate-700 font-medium">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Vos avantages</h3>
              <div className="space-y-2">
                {pack3Benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-emerald-700">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative bg-primary rounded-2xl p-6 sm:p-8 mt-8">
            <Quote className="absolute top-4 right-4 w-10 h-10 text-white/10" />
            <p className="text-lg sm:text-xl text-white font-semibold leading-relaxed">
              &ldquo;Une entreprise plus solide, plus rentable et prête à grandir sereinement.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 — Pourquoi Comarden
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-28 bg-primary relative overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(245,192,0,0.4) 0%, transparent 70%)",
            top: "-20%",
            left: "-10%",
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
              Pourquoi choisir Comarden ?
            </h2>
            <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Avec Comarden, bénéficiez de l&apos;expérience d&apos;un acteur reconnu
              dans la toiture et la façade.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Award,
                title: "Expertise complète",
                text: "Gestion de toute la chaîne — administratif, comptabilité, ventes, chantiers, sous-traitants.",
              },
              {
                icon: Handshake,
                title: "Accompagnement personnalisé",
                text: "Un suivi structurant adapté à votre profil, votre taille d\u2019entreprise et vos ambitions.",
              },
              {
                icon: Zap,
                title: "Résultats concrets",
                text: "Optimisation des performances, de la rentabilité et de la croissance — mesurable dès les premières semaines.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 text-center hover:bg-white/10 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm sm:text-base">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 — CTA Banner
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FDD000]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
            Vous êtes un professionnel de la toiture ou de la façade ?
          </h2>
          <p className="text-base sm:text-lg text-primary/80 leading-relaxed mb-8 max-w-2xl mx-auto">
            Comarden vous propose 3 packs adaptés à votre profil pour optimiser
            votre administratif, vos devis, vos chantiers et votre croissance.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-xl text-base sm:text-lg"
          >
            Nous contacter
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── Footer quote ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base sm:text-lg text-primary/80 leading-relaxed mb-8">
            Ces trois PACK PRO Comarden sont uniques en Belgique et démontrent
            l&apos;investissement constant de Comarden auprès de ses clients.
          </p>

          <p className="text-base sm:text-lg lg:text-xl font-bold text-primary italic lg:whitespace-nowrap">
            &ldquo;Comarden. Venez une fois… vous comprendrez pourquoi on revient.&rdquo;
          </p>
        </div>
      </section>

      <CTACompact />
    </div>
  );
}
