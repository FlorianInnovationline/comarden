'use client';

import { useEffect, useRef, useState } from 'react';
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

  // Parallax effect for image
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      setMousePosition({ x, y });
    };

    const handleScroll = () => {
      if (!imageRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
      const parallaxY = scrollProgress * 30;
      
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${parallaxY}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[55vh] sm:min-h-[60vh] lg:min-h-[65vh] xl:min-h-[60vh] flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#0a1f3f] via-[#0f2a52] to-[#0a1f3f]"
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
        className={`relative z-10 w-full lg:w-[45%] flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 lg:py-10 xl:py-12 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}
      >
        {/* Badge with glow effect */}
        <div
          className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 sm:px-3.5 sm:py-1.5 mb-3 sm:mb-4 w-fit transition-all duration-700 delay-200 shadow-lg shadow-accent/10 ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'
          } hover:bg-white/15 hover:border-white/30 hover:shadow-accent/20 hover:scale-105`}
        >
          <span className="text-white text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
            REVÊTEMENT DE FAÇADE
          </span>
        </div>

        {/* Main Title */}
        <h2
          className={`text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-white leading-tight mb-2 sm:mb-3 transition-all duration-1000 delay-300 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="block bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent drop-shadow-lg">
            BARDAGE
          </span>
          <span className="block text-accent drop-shadow-lg">PROFESSIONNEL</span>
        </h2>

        {/* Description */}
        <p
          className={`text-white/80 text-xs sm:text-sm md:text-sm lg:text-base leading-relaxed mb-3 sm:mb-5 max-w-xl transition-all duration-1000 delay-500 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Les bardages et revêtements de façade Comarden transforment vos bâtiments avec des matériaux
          durables et esthétiques. Grâce à notre expertise technique et notre large gamme de produits,
          nous vous accompagnons dans la création de façades modernes, performantes et durables qui
          valorisent votre patrimoine architectural.
        </p>

        {/* Feature Blocks with staggered animation */}
        <div className="space-y-2 sm:space-y-2.5 mb-3 sm:mb-5">
          {/* Feature 1 */}
          <div
            className={`group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2.5 sm:p-3 transition-all duration-500 ease-out overflow-hidden ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: isVisible ? '700ms' : '0ms' }}
          >
            {/* Hover gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-start gap-2 sm:gap-2.5">
              <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-accent/20">
                <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-sm sm:text-base mb-0.5 group-hover:text-accent transition-colors duration-300">
                  PERSONNALISATION
                </h3>
                <p className="text-white/70 text-[11px] sm:text-xs leading-snug group-hover:text-white/80 transition-colors duration-300">
                  Une seule limite : votre imagination ! Solutions sur mesure adaptées à votre projet.
                </p>
              </div>
            </div>
            
            {/* Shine effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Feature 2 */}
          <div
            className={`group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2.5 sm:p-3 transition-all duration-500 ease-out overflow-hidden ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: isVisible ? '850ms' : '0ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-start gap-2 sm:gap-2.5">
              <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-accent/20">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-sm sm:text-base mb-0.5 group-hover:text-accent transition-colors duration-300">
                  QUALITÉ & DURABILITÉ
                </h3>
                <p className="text-white/70 text-[11px] sm:text-xs leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  Matériaux sélectionnés pour une façade résistante et durable dans le temps.
                </p>
              </div>
            </div>
            
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Feature 3 */}
          <div
            className={`group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2.5 sm:p-3 transition-all duration-500 ease-out overflow-hidden ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: isVisible ? '1000ms' : '0ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-start gap-2 sm:gap-2.5">
              <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-accent/20">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-sm sm:text-base mb-0.5 group-hover:text-accent transition-colors duration-300">
                  ESTHÉTIQUE MODERNE
                </h3>
                <p className="text-white/70 text-[11px] sm:text-xs leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  Création de façades distinctives qui valorisent votre architecture.
                </p>
              </div>
            </div>
            
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>

        {/* CTA Buttons with enhanced animations */}
        <div
          className={`flex flex-col sm:flex-row gap-2.5 sm:gap-3 transition-all duration-1000 delay-1100 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Button
            href="/contact"
            size="lg"
            className="group relative bg-accent text-primary-dark hover:bg-accent-light h-10 sm:h-11 lg:h-12 px-5 sm:px-6 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/40 flex items-center justify-center gap-2 w-full sm:w-auto overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 transition-transform duration-300 group-hover:scale-110" />
            <span className="relative z-10">CONTACTEZ-NOUS</span>
          </Button>
          <Button
            href="/produits"
            variant="outline"
            size="lg"
            className="group relative border-white/30 text-white bg-white/5 hover:bg-white/10 hover:border-white/40 h-10 sm:h-11 lg:h-12 px-5 sm:px-6 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-md flex items-center justify-center gap-2 w-full sm:w-auto overflow-hidden shadow-lg hover:shadow-xl"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:translate-y-[-2px]" />
            <span className="relative z-10">VOIR NOS PRODUITS</span>
          </Button>
        </div>
      </div>

      {/* Right Section - Image with parallax */}
      <div
        className={`relative w-full lg:w-[55%] min-h-[35vh] sm:min-h-[40vh] lg:min-h-full transition-all duration-1000 delay-300 ease-out ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}
      >
        {/* Single smooth gradient overlay - blends image into dark blue panel, no diagonal artifacts */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, transparent 0%, rgba(10,31,63,0.4) 35%, rgba(10,31,63,0.9) 65%, #0a1f3f 100%)',
          }}
        />

        {/* Image Container with parallax */}
        <div ref={imageRef} className="relative w-full h-full transition-transform duration-300 ease-out">
          {/* Subtle accent tint */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent z-[1] pointer-events-none" />
          
          {/* Placeholder Image - Modern facade architecture */}
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-out"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop")',
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) scale(1.05)`,
            }}
          >
            {/* Subtle darkening for readability */}
            <div className="absolute inset-0 bg-black/15" />
          </div>

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
