import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Scissors, Ruler, Wrench, ShieldCheck } from "lucide-react";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Façonnage & Découpes - Comarden",
  description:
    "Service de façonnage sur mesure chez Comarden : découpe zinc, acier, EPDM, STACBOND. Pliage et façonnage professionnel à Bertrix et Naninne.",
};

const services = [
  {
    icon: Scissors,
    title: "Découpe sur mesure",
    description:
      "Tôles, panneaux et zinc découpés à vos dimensions exactes. Nos bancs de coupe professionnels garantissent une précision optimale.",
  },
  {
    icon: Ruler,
    title: "Pliage & façonnage",
    description:
      "Accessoires de finition façonnés dans une dizaine de couleurs. Rives, faîtières, chéneaux et pièces spéciales sur mesure.",
  },
  {
    icon: Wrench,
    title: "Découpe STACBOND",
    description:
      "Comarden a investi dans une toute nouvelle machine panneauteuse pour la découpe STACBOND, le pliage et le façonnage de panneaux composites aluminium.",
  },
  {
    icon: ShieldCheck,
    title: "Atelier libre-service",
    description:
      "Accès gratuit à nos ateliers de Naninne et Bertrix pour vos travaux de personnalisation et d'ajustement sur place.",
  },
];

export default function FaconnagePage() {
  return (
    <div className="pt-20">
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-accent font-medium tracking-wide uppercase text-xs sm:text-sm">
                Services
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 mt-3 leading-tight">
                Façonnage &amp; Découpes
              </h1>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
                Découpe précise, pliage professionnel et façonnage sur mesure. Découpe STACBOND, zinc, acier et panneaux depuis nos ateliers de Bertrix et Naninne.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4 text-center">
              Nos services de façonnage
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto text-center mb-12">
              Plus de service, de qualité et de flexibilité pour vos chantiers.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 100}>
                  <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
              Besoin d&apos;un devis pour du façonnage ?
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Contactez-nous avec vos plans et dimensions, nous vous répondons dans les 24h avec un devis précis.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Demander un devis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTACompact />
    </div>
  );
}
