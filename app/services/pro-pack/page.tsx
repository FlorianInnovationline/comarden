import type { Metadata } from "next";
import { Star, TrendingUp, Rocket } from "lucide-react";
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

            {/* Placeholder hero image */}
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
                  {/* Number badge */}
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

      {/* ── Footer section ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base sm:text-lg text-primary/80 leading-relaxed mb-8">
            Ces trois PACK PRO Comarden sont uniques en Belgique et démontrent
            l&apos;investissement constant de Comarden auprès de ses clients.
          </p>

          <p className="text-xl sm:text-2xl font-bold text-primary italic">
            &ldquo;Comarden. Venez une fois… vous comprendrez pourquoi on
            revient.&rdquo;
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTACompact />
    </div>
  );
}
