import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import LocationsGrid from "@/components/contact/LocationsGrid";
import HoursTable from "@/components/contact/HoursTable";
import ContactForm from "@/components/contact/ContactForm";
import JobsTeaser from "@/components/contact/JobsTeaser";
import CTACompact from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Contact - Comarden",
  description:
    "Contactez Comarden pour un devis, des conseils ou une alternative produit. Deux sites en Wallonie : Bertrix et Naninne.",
};

export default function ContactPage() {
  const bertrixPhone = site.locations[0]?.phone || site.phone.bertrix;
  const naninnePhone = site.locations[1]?.phone || site.phone.naninne;

  // Clean phone numbers for tel: links (remove spaces, parentheses, keep +32)
  const bertrixPhoneClean = bertrixPhone.replace(/\s|\(|\)|\./g, "");
  const naninnePhoneClean = naninnePhone.replace(/\s|\(|\)|\./g, "");

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 lg:pt-28 lg:pb-28 bg-primary text-white overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2f4a] via-primary to-[#2B4162]" />
          {/* Animated gradient orbs */}
          <div 
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(245,192,0,0.4) 0%, transparent 70%)",
              top: "10%",
              right: "-10%",
              animation: "pulse-slow 8s ease-in-out infinite",
            }}
          />
          <div 
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(245,192,0,0.3) 0%, transparent 70%)",
              bottom: "0%",
              left: "-5%",
              animation: "pulse-slow 10s ease-in-out infinite reverse",
            }}
          />
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                <span className="text-accent font-medium tracking-wide uppercase text-sm">
                  Nous sommes là pour vous
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Contactez-nous
              </h1>
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
                Besoin d&apos;un devis, de conseils ou d&apos;une alternative produit ?
                Notre équipe est à votre disposition pour répondre à toutes vos
                questions.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${bertrixPhoneClean}`}
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg rounded-full bg-accent text-primary hover:bg-accent/90 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 hover:scale-105 font-semibold"
                >
                  <Phone className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Appeler Bertrix
                </a>
                <a
                  href={`tel:${naninnePhoneClean}`}
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg rounded-full border-2 border-white/20 text-white bg-white/5 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-semibold"
                >
                  <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Appeler Naninne
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Locations Grid */}
      <LocationsGrid />

      {/* Opening Hours */}
      <HoursTable />

      {/* Contact Form */}
      <ContactForm />

      {/* Jobs Teaser */}
      <JobsTeaser />

      {/* CTA */}
      <CTACompact />
    </div>
  );
}
