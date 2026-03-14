"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-sm border-b border-border"
            : "bg-primary"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative z-50 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Comarden"
                width={1275}
                height={216}
                className="h-7 sm:h-9 lg:h-11 w-auto transition-all duration-300"
                priority
              />
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center justify-center gap-0.5 flex-1 px-8">
              {/* Produits Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProduitsOpen(true)}
                onMouseLeave={() => setProduitsOpen(false)}
              >
                <Link
                  href="/produits"
                  className={`relative px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 whitespace-nowrap ${
                    scrolled
                      ? "text-primary hover:text-primary/80"
                      : "text-white hover:text-white/90"
                  }`}
                >
                  Produits
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      produitsOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>
                {produitsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-border shadow-lg rounded-sm py-2 animate-slide-down z-50">
                    {site.nav.produits.map((item, idx) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-primary hover:bg-neutral/50 transition-all duration-200 hover:translate-x-1"
                        style={{ animationDelay: `${idx * 50}ms` }}
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
                  className={`relative px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 whitespace-nowrap ${
                    scrolled
                      ? "text-primary hover:text-primary/80"
                      : "text-white hover:text-white/90"
                  }`}
                >
                  Services
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-border shadow-lg rounded-sm py-2 animate-slide-down z-50">
                    {site.nav.services.map((item, idx) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-primary hover:bg-neutral/50 transition-all duration-200 hover:translate-x-1"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Other nav items */}
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                    scrolled
                      ? "text-primary hover:text-primary/80"
                      : "text-white hover:text-white/90"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA - Right aligned */}
            <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
              <Link
                href={`tel:${site.phone.primary}`}
                className={`flex items-center gap-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  scrolled
                    ? "text-primary hover:text-primary/80"
                    : "text-white hover:text-white/90"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    scrolled ? "bg-accent/10" : "bg-accent/20"
                  }`}
                >
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <span className="hidden xl:inline">{site.phone.display}</span>
              </Link>
              <Button
                asChild
                href="/contact"
                variant={scrolled ? "primary" : "secondary"}
                size="sm"
                className="rounded-full whitespace-nowrap"
              >
                Devis gratuit
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
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

      {/* Mobile Full-Screen Navigation */}
      <div
        className={`fixed inset-0 z-40 bg-primary transition-all duration-500 lg:hidden ${
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

          {/* Mobile Contact Info */}
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
