import Hero from "@/components/sections/Hero";
import ProductsCarousel from "@/components/sections/ProductsCarousel";
import PresentationStats from "@/components/presentation/PresentationStats";
import OfferGrid from "@/components/sections/OurOffer";
import ServicesHighlight from "@/components/sections/ServicesHighlight";
import InteractiveHouseCard from "@/components/interactive-house/InteractiveHouseCard";
import PartnersBanner from "@/components/sections/PartnersBanner";
import LocationsPreview from "@/components/sections/LocationsPreview";
import NewsPreview from "@/components/sections/NewsPreview";
import CTACompact from "@/components/sections/CTA";
import FacadeShowcase from "@/components/sections/FacadeShowcase";

export default function Home() {
  return (
    <>
      <Hero />
      <FacadeShowcase />
      <ProductsCarousel />
      <PresentationStats />
      <OfferGrid />
      <ServicesHighlight />
      <InteractiveHouseCard />
      <PartnersBanner />
      <LocationsPreview />
      <NewsPreview />
      <CTACompact />
    </>
  );
}
