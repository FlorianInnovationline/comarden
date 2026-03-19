import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Leaf,
  Droplets,
  Sun,
  Shield,
  ThermometerSun,
  Volume2,
  Trees,
  Flower2,
  Clock,
  Sprout,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Toitures Végétalisées - Comarden",
  description:
    "Solutions de toitures vertes avec Floratoit : Hydropack, IDMAT, et systèmes végétalisés pour tous vos projets.",
};

const hydropackAdvantages = [
  {
    icon: Clock,
    title: "Installation rapide",
    description:
      "Les bacs précultivés se posent directement sur la membrane d\u2019étanchéité, pour une mise en œuvre rapide et efficace.",
  },
  {
    icon: Flower2,
    title: "Résultat immédiat",
    description:
      "Végétation mature dès la pose : profitez d\u2019une toiture verte dès le premier jour.",
  },
  {
    icon: Sprout,
    title: "Entretien minimal",
    description:
      "Les sedums et plantes sélectionnés nécessitent très peu d\u2019entretien après installation.",
  },
  {
    icon: Shield,
    title: "Adaptable à tous les projets",
    description:
      "Convient aux toitures plates et légèrement inclinées, neuves ou en rénovation.",
  },
];

const idmatAdvantages = [
  {
    icon: Leaf,
    title: "Léger et flexible",
    description:
      "Le tapis précultivé s\u2019adapte facilement aux formes complexes et aux surfaces irrégulières.",
  },
  {
    icon: Sun,
    title: "Pose simple",
    description:
      "Déroulez le tapis directement sur le substrat : une mise en œuvre accessible à tous les professionnels.",
  },
  {
    icon: Trees,
    title: "Couverture uniforme",
    description:
      "Végétation homogène sur toute la surface, pour un rendu esthétique optimal dès la pose.",
  },
  {
    icon: Droplets,
    title: "Économique",
    description:
      "Solution compétitive offrant un excellent rapport qualité-prix pour les grandes surfaces.",
  },
];

const vegetalBenefits = [
  { icon: ThermometerSun, label: "Isolation thermique renforcée" },
  { icon: Volume2, label: "Isolation acoustique" },
  { icon: Droplets, label: "Rétention des eaux pluviales" },
  { icon: Sprout, label: "Amélioration de la qualité de l\u2019air" },
  { icon: Trees, label: "Biodiversité urbaine" },
  { icon: Shield, label: "Protection de la membrane d\u2019étanchéité" },
  { icon: Sun, label: "Réduction de l\u2019effet îlot de chaleur" },
  { icon: Flower2, label: "Esthétique et valorisation du bâtiment" },
  { icon: Clock, label: "Durée de vie prolongée de la toiture" },
  { icon: Leaf, label: "Contribution au développement durable" },
];

export default function ToituresVertesPage() {
  return (
    <div className="pt-20">
      {/* ── HERO ── */}
      <section className="relative py-16 sm:py-20 lg:py-28 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2f4a] via-primary to-[#2B4162]" />
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.45) 0%, transparent 70%)",
              top: "10%",
              right: "-10%",
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15"
            style={{
              background:
                "radial-gradient(circle, rgba(34,197,94,0.35) 0%, transparent 70%)",
              bottom: "0%",
              left: "-5%",
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
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
                </span>
                <span className="text-emerald-400 font-medium tracking-wide uppercase text-xs sm:text-sm">
                  Partenaire FLORATOIT
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Toitures Végétalisées
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                Solutions écologiques pour toitures plates et inclinées
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PARTNER INTRO ── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100 mb-6">
                <Leaf className="w-7 h-7 text-emerald-600" />
              </div>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                En partenariat avec{" "}
                <a
                  href="https://www.floratoit.be"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 font-semibold hover:underline"
                >
                  Floratoit
                </a>
                , Comarden propose des solutions de toitures végétalisées
                adaptées à tous les projets.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FLORATOIT ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center justify-between gap-6 mb-12">
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-700 flex-shrink-0">
                Partenaire
              </p>
              <Image
                src="/images/logos/floratoit-logo.png"
                alt="Floratoit"
                width={440}
                height={130}
                className="h-[5.5rem] sm:h-24 lg:h-28 w-auto object-contain"
                priority={false}
              />
              <a
                href="https://www.floratoit.be"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-700 text-white font-semibold px-5 py-2.5 text-sm hover:bg-emerald-700/90 transition-colors flex-shrink-0"
              >
                Découvrir Floratoit
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                num: "1",
                title: "Ramenez la nature sur votre toiture",
                text: "La toiture végétalisée est l’avenir des toitures plates en Belgique, déjà encouragée et parfois obligatoire dans certaines villes comme Bruxelles.",
                icon: Leaf,
              },
              {
                num: "2",
                title: "Protégez votre toiture pour des décennies",
                text: "Une toiture verte protège l’EPDM ou le bitume des UV et des chocs thermiques et peut prolonger la durée de vie de votre étanchéité jusqu’à 30 ans.",
                icon: Shield,
              },
              {
                num: "3",
                title: "Une solution écologique et performante",
                text: "Gestion des eaux de pluie, réduction des îlots de chaleur, amélioration de l’isolation : le toit vert améliore le confort du bâtiment et l’environnement urbain.",
                icon: Trees,
              },
              {
                num: "4",
                title: "Une installation simple avec Floratoit",
                text: "Grâce aux solutions Hydropack® et IDMAT®, Floratoit propose des systèmes fiables, rapides à poser et adaptés aux toitures plates ou inclinées.",
                icon: Sprout,
              },
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={b.num} delay={i * 80}>
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-emerald-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/5 text-primary text-xs font-bold">
                            {b.num}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-primary">
                            {b.title}
                          </h3>
                        </div>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                          {b.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HYDROPACK ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                Hydropack<sup>®</sup> — Bacs précultivés
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Le système Hydropack<sup>®</sup> se compose de bacs précultivés
                prêts à poser, garnis de sedums et plantes vivaces. Cette
                solution modulaire permet de végétaliser rapidement toute
                toiture plate ou légèrement inclinée, avec un résultat vert et
                dense dès l&apos;installation.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hydropackAdvantages.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 100}>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 h-full hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-primary text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── IDMAT ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                IDMAT<sup>®</sup> — Tapis précultivés
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                Le système IDMAT<sup>®</sup> est constitué de tapis précultivés
                de sedums, cultivés en pépinière puis déroulés directement sur
                le substrat. Solution idéale pour les grandes surfaces, il offre
                une couverture végétale homogène et immédiate.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {idmatAdvantages.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 100}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15 h-full hover:bg-white/15 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-white text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AVANTAGES D'UNE TOITURE VÉGÉTALISÉE ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                Les avantages d&apos;une toiture végétalisée
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Une toiture verte offre de nombreux bénéfices environnementaux,
                économiques et esthétiques.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {vegetalBenefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <Reveal key={benefit.label} delay={i * 60}>
                  <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-slate-700">
                      {benefit.label}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RÉGLEMENTATION ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                Réglementation Bruxelles
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                À Bruxelles, les toitures végétalisées sont obligatoires pour
                les toitures plates de plus de 100&nbsp;m². Cette réglementation
                s&apos;inscrit dans une volonté de développement durable et de
                gestion des eaux pluviales.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA FLORATOIT + CONTACT ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                Prêt à végétaliser votre toiture&nbsp;?
              </h2>
              <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                Découvrez l&apos;ensemble des solutions Floratoit ou
                contactez-nous pour un accompagnement personnalisé.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.floratoit.be"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-emerald-800 font-semibold px-8 py-3.5 rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Découvrir les solutions Floratoit
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold px-8 py-3.5 rounded-full border border-white/20 hover:bg-emerald-500 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Contactez-nous
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA COMPACT ── */}
      <CTACompact />
    </div>
  );
}
