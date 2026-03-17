import type { Metadata } from "next";
import Link from "next/link";
import {
  Plane,
  Ruler,
  Eye,
  ClipboardCheck,
  Play,
  ArrowRight,
} from "lucide-react";
import CTACompact from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Service Drone - Comarden",
  description:
    "Service de mesurage par drone professionnel pour vos chantiers de toiture.",
};

const features = [
  {
    icon: Ruler,
    title: "Un mesurage complet et professionnel",
  },
  {
    icon: Eye,
    title: "Des vues aériennes détaillées",
  },
  {
    icon: ClipboardCheck,
    title: "La possibilité d\u2019évaluer d\u2019autres travaux",
  },
];

export default function DronePage() {
  return (
    <div className="pt-20">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-primary py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2f4a] via-primary to-[#2B4162]" />
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(245,192,0,0.4) 0%, transparent 70%)",
            top: "10%",
            right: "-10%",
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
                  Service Drone
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
                Service de mesurage par drone{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Comarden</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-accent/30 -skew-x-3" />
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl mb-8">
                Des devis précis = plus de rentabilité et plus de
                professionnalisme
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-primary font-semibold rounded-full px-8 py-4 text-base shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 hover:scale-105"
              >
                Demander plus d&apos;informations
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Placeholder hero image */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-full aspect-[4/3] rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center gap-4">
                <Plane className="w-16 h-16 text-accent/60" />
                <span className="text-white/40 text-sm font-medium">
                  Image drone — à venir
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

      {/* ── Content / Features ── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
              Comment ça fonctionne&nbsp;?
            </h2>
            <p className="text-base sm:text-lg text-primary/70 leading-relaxed">
              Notre pilote professionnel se déplace sur votre chantier. Vous recevez sous 72&nbsp;h&nbsp;:
              <br />
              Disponible partout en Wallonie.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative p-8 rounded-2xl bg-neutral border border-transparent hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-1">
                    {feature.title}
                  </h3>
                </div>
              );
            })}
          </div>

          <p className="text-center text-sm sm:text-base text-primary/60 font-medium">
            Disponible en Wallonie, à Bruxelles et dans toute la Belgique.
          </p>
        </div>
      </section>

      {/* ── Visuals ── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight text-center mb-12 lg:mb-16">
            Aperçu du service
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Image placeholder 1 */}
            <div className="group aspect-[4/3] rounded-2xl bg-white border border-primary/10 flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:border-accent/30 transition-all duration-300">
              <Plane className="w-12 h-12 text-primary/30 group-hover:text-accent transition-colors duration-300" />
              <span className="text-sm text-primary/40 font-medium">
                Drone en vol
              </span>
            </div>

            {/* Image placeholder 2 */}
            <div className="group aspect-[4/3] rounded-2xl bg-white border border-primary/10 flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:border-accent/30 transition-all duration-300">
              <Ruler className="w-12 h-12 text-primary/30 group-hover:text-accent transition-colors duration-300" />
              <span className="text-sm text-primary/40 font-medium">
                Mesurage de toiture
              </span>
            </div>

            {/* Video placeholder */}
            <div className="group aspect-[4/3] rounded-2xl bg-primary/5 border border-primary/10 flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:border-accent/30 transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                <Play className="w-8 h-8 text-accent" />
              </div>
              <span className="text-sm text-primary/40 font-medium">
                Vidéo à venir
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTACompact />
    </div>
  );
}
