"use client";

import { ArrowDown, Wrench, Package, Users } from "lucide-react";

export default function DiyHero() {
  const scrollToBuilder = () => {
    const builder = document.getElementById("diy-builder");
    builder?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToPro = () => {
    const builder = document.getElementById("diy-builder");
    builder?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      const event = new CustomEvent("scroll-to-pro");
      window.dispatchEvent(event);
    }, 500);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-40 pb-20 lg:pt-48 lg:pb-24 bg-gradient-to-b from-white via-slate-50/20 to-white overflow-hidden">
      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%231e293b" fillOpacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
      </div>
      
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title with modern styling */}
        <div className="mb-6 animate-fadeIn">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-primary mb-2 tracking-tight">
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              DO IT YOURSELF
            </span>
          </h1>
        </div>
        
        {/* Subtitle with better typography */}
        <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-fadeIn" style={{ animationDelay: "0.1s" }}>
          Vous réalisez vous-même ? Nous vous conseillons et pouvons aussi envoyer des professionnels.
        </p>

        {/* Modern CTAs with better spacing */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          <button
            onClick={scrollToBuilder}
            className="group relative px-8 py-4 bg-primary text-white rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-3xl hover:bg-primary/95 transition-all duration-500 flex items-center gap-3 focus:outline-none focus:ring-4 focus:ring-primary/30 hover:scale-105 overflow-hidden"
          >
            {/* Shimmer effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative z-10 flex items-center gap-3">
              Configurer mon projet
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </span>
          </button>
          
          <button
            onClick={scrollToPro}
            className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-primary/30 text-primary rounded-2xl font-bold text-base sm:text-lg hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/30 hover:scale-105"
          >
            Besoin d&apos;un pro rapidement
          </button>
        </div>

        {/* Modern trust badges with better design */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
          <div className="group flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-accent/40 hover:scale-105 transition-all duration-300 cursor-default">
            <div className="p-2 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
              <Wrench className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm font-semibold text-slate-700">Conseils techniques</span>
          </div>
          <div className="group flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-accent/40 hover:scale-105 transition-all duration-300 cursor-default">
            <div className="p-2 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
              <Package className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm font-semibold text-slate-700">Matériaux pros</span>
          </div>
          <div className="group flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-accent/40 hover:scale-105 transition-all duration-300 cursor-default">
            <div className="p-2 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm font-semibold text-slate-700">Intervention possible</span>
          </div>
        </div>
      </div>
    </section>
  );
}
