'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Sparkles, Palette, Award, Download, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function FacadeShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (!section) return;
    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, []);

  // Mouse-only parallax (no scroll: scroll was shifting the container and causing the top gap)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[50vh] sm:min-h-[54vh] lg:min-h-[57vh] flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#0a1f3f] via-[#0f2a52] to-[#0a1f3f] lg:items-stretch"
      style={{ isolation: 'isolate' }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f3f] via-[#0f2a52] to-[#0a1f3f]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.1),transparent_50%)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(212,175,55,0.05),transparent_50%)] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.4"%3E%3Cpath d="M50 50c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zM30 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm40 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zM30 80c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm40 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* Left Section - Content */}
      <div
        className={`relative z-10 w-full lg:w-[45%] flex flex-col justify-center px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-5 sm:py-6 lg:py-8 xl:py-10 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}
      >
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1 sm:px-3 sm:py-1 mb-2.5 sm:mb-3 w-fit transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'
          } hover:bg-white/15 hover:border-white/30 hover:shadow-accent/20 hover:scale-105`}
        >
          <span className="text-white text-xs sm:text-sm font-semibold tracking-wider uppercase">
            REVÊTEMENT DE FAÇADE
          </span>
        </div>

        {/* Main Title + STACBOND logo (white/red theme to match red overlay) */}
        <div
          className={`flex flex-wrap items-end gap-3 sm:gap-4 mb-2 sm:mb-2.5 transition-all duration-1000 delay-300 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight">
            <span className="block bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent drop-shadow-lg">
              BARDAGE
            </span>
            <span className="block text-white drop-shadow-lg">PROFESSIONNEL</span>
          </h2>
          {/* STACBOND logo - mix-blend-multiply makes white background blend into dark panel */}
          <div className="relative h-8 sm:h-9 md:h-10 flex-shrink-0 [mix-blend-mode:multiply]" style={{ minWidth: '115px' }}>
            <Image
              src="/images/logos/stackbond-logo.png"
              alt="STACBOND"
              width={140}
              height={44}
              className="object-contain object-left-bottom w-auto h-full"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Description */}
        <p
          className={`text-white/75 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-5 max-w-xl transition-all duration-1000 delay-500 ease-out line-clamp-3 sm:line-clamp-none ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Les bardages et revêtements de façade Comarden transforment vos bâtiments avec des matériaux
          durables et esthétiques. Grâce à notre expertise technique et notre large gamme de produits,
          nous vous accompagnons dans la création de façades modernes, performantes et durables.
        </p>

        {/* Feature Blocks */}
        <div className="space-y-2 sm:space-y-2.5 mb-3 sm:mb-4">
          {/* Feature 1 */}
          <div
            className={`group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 sm:p-4 transition-all duration-500 ease-out overflow-hidden ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: isVisible ? '700ms' : '0ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-start gap-2 sm:gap-2.5">
              <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-xs sm:text-sm mb-0.5 group-hover:text-white transition-colors duration-300">
                  PERSONNALISATION
                </h3>
                <p className="text-white/60 text-[10px] sm:text-[11px] leading-snug group-hover:text-white/70 transition-colors duration-300">
                  Une seule limite : votre imagination ! Solutions sur mesure adaptées à votre projet.
                </p>
              </div>
            </div>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>

          {/* Feature 2 */}
          <div
            className={`group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-2.5 sm:p-3 transition-all duration-500 ease-out overflow-hidden ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: isVisible ? '850ms' : '0ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-start gap-2 sm:gap-2.5">
              <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-xs sm:text-sm mb-0.5 group-hover:text-white transition-colors duration-300">
                  QUALITÉ & DURABILITÉ
                </h3>
                <p className="text-white/60 text-[10px] sm:text-[11px] leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                  Matériaux sélectionnés pour une façade résistante et durable dans le temps.
                </p>
              </div>
            </div>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>

          {/* Feature 3 */}
          <div
            className={`group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-2 sm:p-2.5 transition-all duration-500 ease-out overflow-hidden ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: isVisible ? '1000ms' : '0ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-start gap-1.5 sm:gap-2">
              <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/90 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-xs sm:text-sm mb-0.5 group-hover:text-white transition-colors duration-300">
                  ESTHÉTIQUE MODERNE
                </h3>
                <p className="text-white/60 text-[10px] sm:text-[11px] leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                  Création de façades distinctives qui valorisent votre architecture.
                </p>
              </div>
            </div>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>
        </div>

        {/* CTA Buttons - red/white theme to match overlay */}
        <div
          className={`flex flex-col sm:flex-row gap-2.5 sm:gap-3 transition-all duration-1000 delay-1100 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Button
            href="/contact"
            size="lg"
            className="group relative bg-red-600 hover:bg-red-500 text-white h-10 sm:h-11 px-5 sm:px-6 text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-900/30 flex items-center justify-center gap-2 w-full sm:w-auto overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10" />
            <span className="relative z-10">CONTACTEZ-NOUS</span>
          </Button>
          <Button
            href="/produits"
            variant="outline"
            size="lg"
            className="group relative border-white/40 text-white bg-white/5 hover:bg-white/10 hover:border-white/50 h-9 sm:h-10 px-4 sm:px-5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 hover:scale-[1.02] backdrop-blur-md flex items-center justify-center gap-2 w-full sm:w-auto overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10" />
            <span className="relative z-10">VOIR NOS PRODUITS</span>
          </Button>
        </div>
      </div>

      {/* Right Section - Image: absolute top 0 → bottom 0, fills section height */}
      <div
        className={`relative w-full min-h-[28vh] sm:min-h-[32vh] overflow-hidden
          lg:absolute lg:top-0 lg:right-0 lg:bottom-0 lg:w-[55%] lg:min-h-0
          transition-all duration-1000 delay-300 ease-out ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}
      >
        <div ref={imageRef} className="absolute inset-0 w-full h-full overflow-hidden" style={{ minHeight: '100%' }}>
          {/* Background image - cover, top-aligned, transform origin top to avoid gap */}
          <div
            className="absolute inset-0 bg-no-repeat bg-cover transition-transform duration-500 ease-out"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop")',
              backgroundPosition: 'center top',
              backgroundSize: 'cover',
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) scale(1.05)`,
              transformOrigin: 'center top',
            }}
          />
          {/* Full-coverage red transparent overlay (STACBOND style) - no gap, extends edge to edge */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, rgba(180,35,35,0.2) 0%, rgba(180,35,35,0.45) 35%, rgba(180,35,35,0.5) 65%, #0a1f3f 100%)',
            }}
          />

          {/* Floating decorative elements with enhanced animations */}
          <div 
            className="absolute top-12 right-12 lg:top-20 lg:right-20 w-24 h-24 lg:w-32 lg:h-32 border-2 border-accent/30 rounded-full animate-pulse-slow hidden md:block backdrop-blur-sm bg-accent/5"
            style={{ 
              transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />
          <div 
            className="absolute bottom-20 right-16 lg:bottom-32 lg:right-32 w-16 h-16 lg:w-24 lg:h-24 border-2 border-white/20 rounded-full animate-pulse-slow hidden md:block backdrop-blur-sm bg-white/5"
            style={{ 
              animationDelay: '1s',
              transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />
          
          {/* Glowing accent dots */}
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-accent rounded-full animate-pulse-slow hidden lg:block shadow-lg shadow-accent/50" />
          <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-accent/60 rounded-full animate-pulse-slow hidden lg:block shadow-lg shadow-accent/40" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
    </section>
  );
}
