import type { Metadata } from "next";
import PresentationHero from "@/components/presentation/PresentationHero";
import PresentationStats from "@/components/presentation/PresentationStats";
import CommitmentsGrid from "@/components/presentation/CommitmentsGrid";
import Gallery from "@/components/presentation/Gallery";
import Timeline from "@/components/presentation/Timeline";
import HistoryContent from "@/components/presentation/HistoryContent";
import Commitments from "@/components/presentation/Commitments";
import LocationsPreview from "@/components/sections/LocationsPreview";
import NewsPreview from "@/components/sections/NewsPreview";
import CTACompact from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Comarden — Spécialiste matériaux de toiture en Belgique depuis 1977",
  description:
    "Depuis 1977, Comarden accompagne les couvreurs et professionnels de la toiture en Wallonie et Bruxelles. Ardoises naturelles, tôles, isolation, charpente. Deux sites : Bertrix et Naninne.",
};

export default function PresentationPage() {
  return (
    <div className="pt-0">
      <PresentationHero />
      <PresentationStats />
      <CommitmentsGrid />
      <Gallery />
      <Timeline />
      <HistoryContent />
      <Commitments />
      <LocationsPreview />
      <NewsPreview />
      <CTACompact />
    </div>
  );
}
