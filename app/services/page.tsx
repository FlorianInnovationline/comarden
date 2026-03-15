import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";
import ProcessSteps from "@/components/services/ProcessSteps";
import ClientJourney from "@/components/services/ClientJourney";
import ProofStrip from "@/components/services/ProofStrip";
import CTACompact from "@/components/sections/CTA";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Services | Comarden - Façonnage, Transport & Conseil",
  description:
    "Des services pensés pour gagner du temps sur chantier : façonnage sur mesure, livraison camion-grue, préparation soignée et conseil technique.",
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <ServicesHero />
      <ServicesGrid />
      <ProcessSteps />
      <ClientJourney />
      <ProofStrip />
      <CTACompact />
    </div>
  );
}
