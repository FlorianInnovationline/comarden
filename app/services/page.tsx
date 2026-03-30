import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";
import ProcessSteps from "@/components/services/ProcessSteps";
import ClientJourney from "@/components/services/ClientJourney";
import ProofStrip from "@/components/services/ProofStrip";
import CTACompact from "@/components/sections/CTA";
import YouTubeEmbed from "@/components/media/YouTubeEmbed";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Services | Comarden - Façonnage, Transport & Conseil",
  description:
    "Des services pensés pour gagner du temps sur chantier : façonnage sur mesure, livraison camion-grue, préparation soignée et conseil technique.",
};

export default function ServicesPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const videoId = "zpi1FrNcTIk";
  return (
    <div className="pt-20">
      <ServicesHero />
      <ServicesGrid />
      <ProcessSteps />

      {/* Video placeholder between sections */}
      <section className="py-14 sm:py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="text-accent font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3">
                Démo
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
                Un aperçu en vidéo
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-xl">
                Une courte vidéo pour visualiser notre façon de travailler : préparation, façonnage et livraison.
              </p>
            </div>
            <YouTubeEmbed
              videoId={videoId}
              title="Vidéo — Services Comarden"
              eyebrow="YouTube"
              className="border-white/15"
            />
          </div>
        </div>
      </section>

      <ClientJourney />
      <ProofStrip />
      <CTACompact />
    </div>
  );
}
