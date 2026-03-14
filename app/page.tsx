import Hero from "@/components/sections/Hero";
import ProductsCarousel from "@/components/sections/ProductsCarousel";
import PresentationStats from "@/components/presentation/PresentationStats";
import TrainingCenter from "@/components/sections/TrainingCenter";
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
      <TrainingCenter />
      <OfferGrid />
      <ServicesHighlight />
      <InteractiveHouseCard />
      <PartnersBanner />
      <LocationsPreview />
      <NewsPreview />
      {/* Slogan */}
      <section className="py-8 sm:py-10 bg-primary text-center">
        <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-white italic max-w-3xl mx-auto px-4">
          &ldquo;Comarden. Venez une fois… vous comprendrez pourquoi on revient.&rdquo;
        </p>
      </section>
      <CTACompact />
    </>
  );
}
