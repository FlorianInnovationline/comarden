import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Palette,
  Zap,
  Leaf,
  Ruler,
  CheckCircle,
  ArrowRight,
  Clock,
  Truck,
  Wrench,
  Building2,
  Home,
  Hotel,
  Landmark,
  PenTool,
  MapPin,
  HelpCircle,
} from "lucide-react";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";
import FacadeShowcase from "@/components/sections/FacadeShowcase";

export const metadata: Metadata = {
  title: "Façade STACBOND — Panneaux composites aluminium - Comarden",
  description:
    "Panneaux composites aluminium STACBOND en stock chez Comarden Naninne et Bertrix. Découpe sur mesure, ossature aluminium, plus de 100 finitions. Bardage professionnel en Wallonie.",
};

const atouts = [
  {
    icon: Shield,
    title: "Sécurité incendie certifiée",
    text: "Les panneaux STACBOND répondent aux normes européennes et belges les plus strictes. La version A2 est entièrement incombustible ; la version FR est difficilement inflammable et ne produit pas de gouttelettes enflammées.",
  },
  {
    icon: Zap,
    title: "Légèreté et rapidité de pose",
    text: "Nettement plus légers que d\u2019autres matériaux de revêtement, les panneaux STACBOND sont simples à transporter, découper et installer. Un avantage concret pour optimiser vos délais de chantier.",
  },
  {
    icon: Leaf,
    title: "Performance énergétique — jusqu\u2019à -30 %",
    text: "Utilisés en façade ventilée, les panneaux créent une lame d\u2019air isolante qui réduit la demande énergétique du bâtiment de plus de 30 %. Un atout pour les certifications LEED, BREEAM ou les primes Région Wallonne.",
  },
  {
    icon: Ruler,
    title: "Durabilité et résistance",
    text: "L\u2019aluminium résiste naturellement à la corrosion, à l\u2019humidité et aux environnements exposés. Les traitements de surface sans chrome assurent une durabilité maximale. Couleurs éclatantes dans le temps grâce à la résistance UV.",
  },
  {
    icon: Palette,
    title: "Plus de 100 finitions disponibles",
    text: "Couleurs RAL, Pantone ou NCS, imitations bois, pierre, béton, métal ou acier Corten, textures mate ou brillante. Éléments plats ou cassettes : liberté totale de conception pour les architectes.",
  },
  {
    icon: Leaf,
    title: "Éco-responsabilité",
    text: "Matériaux recyclés dans le noyau, recyclables à 100 %. En accord avec les exigences de circularité et de \u2018cradle to cradle\u2019 des cahiers des charges belges.",
  },
];

const servicePoints = [
  "Panneaux STACBOND disponibles en stock immédiat à Naninne (Namur) et Bertrix",
  "Découpe et façonnage sur mesure dans nos ateliers — éléments plats ou cassettes",
  "Ossature aluminium laqué noir disponible en stock pour fixation non apparente",
  "Tous les accessoires de pose en un seul lieu",
  "Livraison partout en Belgique francophone : Wallonie, Bruxelles, Luxembourg, Namur, Hainaut, Brabant Wallon et Liège",
  "Conseils techniques personnalisés de nos équipes expertes en bardage et façades",
  "Réponse garantie sous 8 heures ouvrables pour toute demande de devis",
];

const projects = [
  { icon: Home, title: "Résidentiel neuf", text: "Bardage de maisons contemporaines, villas, habitations unifamiliales avec finition architecturale haut de gamme." },
  { icon: Building2, title: "Rénovation de façade", text: "Amélioration thermique et esthétique d\u2019immeubles existants. Solution légère qui ne surcharge pas la structure." },
  { icon: Hotel, title: "Bâtiments commerciaux & tertiaires", text: "Bureaux, hôtels, commerces, centres logistiques : image de marque assurée." },
  { icon: Landmark, title: "Bâtiments publics & institutionnels", text: "Écoles, hôpitaux, équipements sportifs. Conformité incendie garantie avec la gamme A2." },
  { icon: PenTool, title: "Projets architecturaux sur mesure", text: "Formes complexes, volumes, sous-faces, bandeaux. Liberté totale pour les bureaux d\u2019études." },
];

const faq = [
  { q: "Où acheter des panneaux STACBOND en Belgique ?", a: "Comarden propose les panneaux composites aluminium STACBOND en stock dans ses deux négoces : à Naninne (Namur) pour le centre et nord de la Wallonie, et à Bertrix pour la province de Luxembourg. Livraison disponible partout en Belgique francophone." },
  { q: "Quelle est la différence entre STACBOND A2 et STACBOND FR ?", a: "Le STACBOND A2 possède une âme minérale incombustible avec un classement A2-s1,d0 — utilisé sur les bâtiments soumis à des exigences incendie élevées. Le STACBOND FR dispose d\u2019une âme ignifuge avec un classement B-s1,d0 — adapté au bardage résidentiel neuf ou en rénovation." },
  { q: "Comarden peut-il découper les panneaux STACBOND sur mesure ?", a: "Oui. Comarden dispose d\u2019un atelier de découpe dédié aux panneaux de façade. Nous réalisons la découpe, le façonnage en cassettes et proposons l\u2019ossature aluminium laqué noir pour une pose propre et sans fixation apparente." },
  { q: "Les panneaux STACBOND conviennent-ils à la rénovation en Wallonie ?", a: "Absolument. Légers et faciles à poser, les panneaux STACBOND sont parfaitement adaptés à la rénovation de façades existantes sans surcharger la structure du bâtiment. Ils améliorent la performance thermique de l\u2019enveloppe, ouvrant droit aux primes énergie de la Région Wallonne." },
  { q: "Combien de coloris sont disponibles ?", a: "Plus de 100 finitions : couleurs RAL, Pantone, NCS, imitations bois, pierre, béton, métal ou acier Corten, dans différents niveaux de brillance. Des teintes sur mesure sont également réalisables." },
];

const clipsGoAccessories = [
  { name: "Rive 100 mm, longueur 3 m", color: "Noir 9005", type: "Rive" },
  { name: "Rive 70 mm, longueur 3 m", color: "Noir 9005", type: "Rive" },
  { name: "Arrêt 100 mm", color: "Noir 9005", type: "Arrêt" },
  { name: "Arrêt 70 mm", color: "Noir 9005", type: "Arrêt" },
  { name: "Coin intérieur 100 mm 30\u00d730", color: "Noir 9005", type: "Coin intérieur" },
  { name: "Coin extérieur 100 mm 30\u00d730", color: "Noir 9005", type: "Coin extérieur" },
  { name: "Raccord 100 mm", color: "Noir 9005", type: "Raccord" },
  { name: "Profil base 3 m", color: "BRUT", type: "Profilé de base" },
  { name: "Couvre-joint 100 mm", color: "Noir 9005", type: "Couvre-joint" },
  { name: "Easy Corner", color: "BRUT", type: "Angle" },
];

export default function FacadePage() {
  return (
    <div className="pt-20">
      {/* ── Showcase (reused from homepage) ── */}
      <FacadeShowcase />

      {/* ── Intro ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src="/images/logos/stackbond-logo.png"
                  alt="STACBOND"
                  width={180}
                  height={56}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
                <span className="text-sm font-medium text-slate-500">Nouveau service de découpe</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-6">
                Panneaux STACBOND sur mesure pour chantiers en Belgique
              </h1>
              <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                <p>
                  Chez <strong className="text-primary">Comarden</strong>, nous élargissons nos services pour accompagner les professionnels de la construction en <strong className="text-primary">Belgique</strong>, notamment à <strong className="text-primary">Bruxelles, Liège et Namur</strong>. Notre objectif : vous permettre de <strong className="text-primary">réaliser vos chantiers plus rapidement</strong>, avec des <strong className="text-primary">finitions parfaites</strong> et des <strong className="text-primary">clients pleinement satisfaits</strong>.
                </p>
                <p>
                  Grâce à nos <strong className="text-primary">machines de pointe</strong>, nous fournissons des <strong className="text-primary">panneaux de façade STACBOND sur mesure</strong>, garantissant une <strong className="text-primary">pose facile</strong>, une <strong className="text-primary">découpe précise</strong> et un <strong className="text-primary">rendement optimal</strong> sur tous vos projets résidentiels ou industriels.
                </p>
                <p>
                  Optez pour <strong className="text-primary">Comarden</strong>, votre partenaire local pour des <strong className="text-primary">chantiers efficaces et des façades de qualité</strong>, et bénéficiez de matériaux haut de gamme, adaptés à vos besoins et aux exigences de vos clients en Belgique.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Qu'est-ce que STACBOND ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                Qu&apos;est-ce qu&apos;un panneau composite aluminium STACBOND ?
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Le panneau STACBOND est composé de deux feuilles d&apos;aluminium encadrant une âme intérieure de charge minérale. Il est disponible en deux versions adaptées aux exigences réglementaires belges et européennes&nbsp;:
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal delay={50}>
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-red-100">
                    <Shield className="w-5 h-5 text-red-700" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-red-700">Incombustible</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">STACBOND A2</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Âme minérale non-combustible, classement de réaction au feu <strong>A2-s1,d0</strong> (EN 13501-1). Recommandé pour les bâtiments soumis aux exigences incendie renforcées.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100">
                    <Shield className="w-5 h-5 text-amber-700" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-700">Ignifuge</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">STACBOND FR</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Âme ignifuge en résine thermoplastique, classement <strong>B-s1,d0</strong>. Idéal pour le bardage résidentiel neuf ou en rénovation.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <p className="mt-8 text-sm text-slate-500 leading-relaxed max-w-3xl">
              Les deux versions sont recouvertes d&apos;une peinture PVDF haute résistance, garantissant une tenue parfaite aux UV, aux intempéries et au vieillissement — sans entretien contraignant.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Atouts ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4 text-center">
              Les atouts STACBOND pour vos chantiers
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto text-center mb-12">
              Un matériau de façade complet, performant et esthétique.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {atouts.map((a, i) => {
              const Icon = a.icon;
              return (
                <Reveal key={a.title} delay={i * 70}>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow h-full">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-base font-bold text-primary mb-2">{a.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{a.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Service Comarden ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_top_right,rgba(245,208,0,0.35),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-accent mb-3 block">Notre engagement</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                Le service STACBOND selon Comarden
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                Bien plus que la vente : un équipier dédié spécifiquement à la découpe des panneaux de façade.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {servicePoints.map((point, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 h-full">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/90 leading-relaxed">{point}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIPS&GO 2.0 Accessories ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-4 mb-2">
              <Image
                src="/images/logos/stackbond-logo.png"
                alt="STACBOND"
                width={140}
                height={48}
                className="h-10 w-auto object-contain"
              />
              <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                Nouveau service de découpe
              </h2>
            </div>
            <p className="text-slate-600 mb-8 max-w-3xl">
              Comarden a investi dans une toute nouvelle machine panneauteuse pour vous offrir plus de service, de qualité et de flexibilité pour vos chantiers. Découpe STACBOND, pliage et façonnage.
            </p>

            <p className="text-sm font-semibold text-primary mb-2">Accessoires CLIPS&amp;GO 2.0</p>
            <p className="text-xs text-slate-500 mb-6">
              Système 2 pièces (profilé base + bourrelet), compatible bitume 4-5 mm, joint dilatation 5 mm / 3 mm.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clipsGoAccessories.map((item, i) => (
              <Reveal key={item.name} delay={i * 50}>
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <span className="inline-flex w-fit px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 rounded mb-3">
                    ACCESSOIRE
                  </span>
                  <h3 className="font-bold text-primary text-sm sm:text-base mb-2 leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-600 mb-1">
                    <span className="font-medium">Couleur :</span> {item.color}
                  </p>
                  <p className="text-xs text-slate-600 mt-auto">
                    <span className="font-medium">Type :</span> {item.type}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projets ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4 text-center">
              Pour quels projets en Belgique ?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto text-center mb-12">
              Les panneaux STACBOND s&apos;adaptent à une très large variété de projets architecturaux.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 70}>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow h-full">
                    <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-primary mb-2">{p.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{p.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Points de vente ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4 text-center">
              Où se procurer les panneaux STACBOND ?
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-10">
            <Reveal delay={50}>
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-bold text-primary">Comarden Naninne (Namur)</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Point de vente central pour les provinces de Namur, Brabant Wallon, Hainaut et Bruxelles-Capitale.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-bold text-primary">Comarden Bertrix</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Point de vente pour la province de Luxembourg, le sud de la province de Namur et la province de Liège.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="flex items-center gap-3 bg-accent/10 rounded-xl p-4 max-w-4xl mx-auto mt-8">
              <Truck className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="text-sm text-primary font-medium">
                Livraison disponible partout en Wallonie et à Bruxelles grâce à notre propre flotte de véhicules équipés de moyens de déchargement adaptés.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-10 text-center">
              Questions fréquentes
            </h2>
          </Reveal>

          <div className="space-y-4">
            {faq.map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-bold text-primary mb-2">{item.q}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_top_right,rgba(245,208,0,0.35),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Un projet de bardage ou de façade ventilée ?
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Contactez Comarden pour un conseil personnalisé et une offre de prix sur mesure — réponse en moins de 8 heures ouvrables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-semibold px-8 py-3.5 rounded-full hover:bg-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg text-base"
              >
                Demander un devis
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+3261230345"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg text-base"
              >
                Appeler Comarden
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
