import type { Metadata } from "next";
import PresentationHero from "@/components/presentation/PresentationHero";
import PresentationStats from "@/components/presentation/PresentationStats";
import CommitmentsGrid from "@/components/presentation/CommitmentsGrid";
import Gallery from "@/components/presentation/Gallery";
import Timeline from "@/components/presentation/Timeline";
import Commitments from "@/components/presentation/Commitments";
import LocationsPreview from "@/components/sections/LocationsPreview";
import NewsPreview from "@/components/sections/NewsPreview";
import CTACompact from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Présentation - Comarden",
  description:
    "Découvrez l'histoire de Comarden, fondée en 1977 à Bertrix. Expertise en matériaux de construction en Wallonie.",
};

export default function PresentationPage() {
  return (
    <div className="pt-0">
      <PresentationHero />
      <PresentationStats />
      <CommitmentsGrid />
      <Gallery />
      <Timeline />
      <Commitments />
      <LocationsPreview />
      <NewsPreview />
      <CTACompact />
    </div>
  );
}
