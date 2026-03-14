"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, ArrowRight, ChevronDown } from "lucide-react";
import { site } from "@/lib/site";
import Button from "@/components/ui/Button";

const navItems = [
  { label: "Magasin", href: "/shop" },
  { label: "Présentation", href: "/presentation" },
  { label: "Formations", href: "/formations" },
  { label: "Événements", href: "/evenements" },
  { label: "Actu", href: "/actu" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [produitsOpen, setProduitsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const linkCls = `relative px-2 xl:px-2.5 py-2 text-[13px] font-medium transition-colors whitespace-nowrap ${
    scrolled ? "text-primary hover:text-primary/80" : "text-white hover:text-white/90"
  }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-sm border-b border-border"
            : "bg-primary"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16 xl:h-20">
            <Link href="/" className="relative z-50 flex-shrink-0">
              <span className={`text-xl sm:text-2xl xl:text-3xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? "text-primary" : "text-white"}`}>
                COMARDEN
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center justify-center gap-0 flex-1 px-4">
              {/* Produits Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProduitsOpen(true)}
                onMouseLeave={() => setProduitsOpen(false)}
              >
                <Link
                  href="/produits"
                  className={`${linkCls} flex items-center gap-1`}
                >
                  Produits
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      produitsOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>
                {produitsOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-border shadow-lg rounded-sm py-1.5 animate-slide-down z-50">
                    {site.nav.produits.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-1.5 text-[13px] text-primary hover:bg-neutral/50 transition-all duration-200 hover:translate-x-1"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href="/services"
                  className={`${linkCls} flex items-center gap-1`}
                >
                  Services
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-border shadow-lg rounded-sm py-1.5 animate-slide-down z-50">
                    {site.nav.services.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-1.5 text-[13px] text-primary hover:bg-neutral/50 transition-all duration-200 hover:translate-x-1"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className={linkCls}>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
              <Link
                href={`tel:${site.phone.primary}`}
                className={`flex items-center gap-1.5 text-[13px] font-medium transition-colors whitespace-nowrap ${
                  scrolled
                    ? "text-primary hover:text-primary/80"
                    : "text-white hover:text-white/90"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    scrolled ? "bg-accent/10" : "bg-accent/20"
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 text-accent" />
                </div>
                <span className="hidden 2xl:inline">{site.phone.display}</span>
              </Link>
              <Button
                asChild
                href="/contact"
                variant={scrolled ? "primary" : "secondary"}
                size="sm"
                className="rounded-full whitespace-nowrap text-[13px]"
              >
                Devis gratuit
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>

            {/* Mobile/Tablet Menu Button */}
            <button
              className="xl:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  isMenuOpen
                    ? "bg-white rotate-45 translate-y-2"
                    : scrolled
                      ? "bg-primary"
                      : "bg-white"
                }`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  isMenuOpen
                    ? "bg-white opacity-0"
                    : scrolled
                      ? "bg-primary"
                      : "bg-white"
                }`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  isMenuOpen
                    ? "bg-white -rotate-45 -translate-y-2"
                    : scrolled
                      ? "bg-primary"
                      : "bg-white"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet Full-Screen Navigation */}
      <div
        className={`fixed inset-0 z-40 bg-primary transition-all duration-500 xl:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="h-full flex flex-col justify-center px-6 sm:px-8 overflow-y-auto">
          <nav className="space-y-1">
            <Link
              href="/produits"
              className={`block text-xl sm:text-2xl font-light text-white/90 hover:text-accent transition-all duration-300 py-3 ${
                isMenuOpen ? "animate-slide-in-left" : ""
              }`}
              style={{ animationDelay: "100ms" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Produits
            </Link>
            <Link
              href="/services"
              className={`block text-xl sm:text-2xl font-light text-white/90 hover:text-accent transition-all duration-300 py-3 ${
                isMenuOpen ? "animate-slide-in-left" : ""
              }`}
              style={{ animationDelay: "150ms" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            {navItems.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block text-xl sm:text-2xl font-light text-white/90 hover:text-accent transition-all duration-300 py-3 hover:translate-x-2 ${
                  isMenuOpen ? "animate-slide-in-left" : ""
                }`}
                style={{ animationDelay: `${200 + idx * 50}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-12 pt-8 border-t border-white/20">
            <Link
              href={`tel:${site.phone.primary}`}
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors mb-6"
            >
              <Phone className="w-5 h-5" />
              <span className="text-lg">{site.phone.display}</span>
            </Link>
            <Button
              asChild
              href="/contact"
              variant="secondary"
              size="md"
              className="rounded-full"
            >
              Demander un devis
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
