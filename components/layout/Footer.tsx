import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-10 sm:py-12 lg:py-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4 sm:mb-6 transition-transform duration-300 hover:scale-105">
              <span className="text-xl sm:text-2xl font-bold text-accent tracking-tight">COMARDEN</span>
            </Link>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              {site.tagline} en Belgique francophone.
            </p>
          </div>

          {/* Produits */}
          <div>
            <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-accent mb-3 sm:mb-4">
              Produits
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {site.nav.produits.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-white/70 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-accent mb-3 sm:mb-4">
              Services
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {site.nav.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-white/70 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/trouver-professionnel"
                  className="text-xs sm:text-sm text-white/70 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Trouver un professionnel
                </Link>
              </li>
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-accent mb-3 sm:mb-4">
              Entreprise
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/presentation"
                  className="text-xs sm:text-sm text-white/70 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Présentation
                </Link>
              </li>
              <li>
                <Link
                  href="/formations"
                  className="text-xs sm:text-sm text-white/70 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Formations
                </Link>
              </li>
              <li>
                <Link
                  href="/evenements"
                  className="text-xs sm:text-sm text-white/70 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Événements
                </Link>
              </li>
              <li>
                <Link
                  href="/actu"
                  className="text-xs sm:text-sm text-white/70 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Actualités
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-xs sm:text-sm text-white/70 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-accent mb-3 sm:mb-4">
              Contact
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-white/70">
                  <p>Bertrix & Naninne</p>
                  <p>Belgique</p>
                </div>
              </li>
              <li>
                <Link
                  href={`tel:${site.phone.primary}`}
                  className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/70 hover:text-white transition-all duration-200 hover:translate-x-1"
                >
                  <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                  {site.phone.display}
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/70 hover:text-white transition-all duration-200 hover:translate-x-1 break-all"
                >
                  <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                  {site.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 sm:py-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-white/50 text-center sm:text-left">
            © {new Date().getFullYear()} Comarden. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              href={site.legal.mentions}
              className="text-xs sm:text-sm text-white/50 hover:text-white transition-all duration-200 hover:translate-y-[-2px]"
            >
              Mentions légales
            </Link>
            <Link
              href={site.legal.confidentialite}
              className="text-xs sm:text-sm text-white/50 hover:text-white transition-all duration-200 hover:translate-y-[-2px]"
            >
              Confidentialité
            </Link>
            <Link
              href={site.legal.cookies}
              className="text-xs sm:text-sm text-white/50 hover:text-white transition-all duration-200 hover:translate-y-[-2px]"
            >
              Cookies
            </Link>
            <Link
              href="/admin/login"
              className="text-[10px] sm:text-xs text-white/30 hover:text-white/50 transition-all duration-200"
            >
              Espace admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
