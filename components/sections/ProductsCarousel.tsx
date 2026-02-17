"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/shop";
import { formatPrice } from "@/lib/shop/utils";
import { ShoppingBag, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductsCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Fetch products on client side
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products?active=true");
        if (response.ok) {
          const data = await response.json();
          // Take first 12 products for the carousel
          setProducts(data.slice(0, 12));
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    }
    fetchProducts();
  }, []);

  // Auto-scroll animation with seamless loop
  useEffect(() => {
    if (!scrollRef.current || products.length === 0 || isPaused) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const scrollContainer = scrollRef.current;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame
    // Use average item width for smooth looping (responsive sizes: w-36 to w-52)
    const avgItemWidth = 180; // Average of 144px to 208px
    const gap = 24; // gap-6 = 24px
    const totalItemWidth = avgItemWidth + gap;
    const halfPoint = (products.length * totalItemWidth) / 2;

    const animate = () => {
      if (isPaused) {
        animationFrameRef.current = null;
        return;
      }
      
      scrollPosition += scrollSpeed;
      
      // Reset to start for seamless loop
      if (scrollPosition >= halfPoint) {
        scrollPosition = 0;
        scrollContainer.scrollLeft = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [products, isPaused]);

  // Manual scroll functions
  const scrollLeft = () => {
    if (!scrollRef.current) return;
    setIsPaused(true); // Pause auto-scroll when manually scrolling
    const scrollAmount = 300; // Scroll by ~1.5 items
    scrollRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
    // Resume auto-scroll after a delay if not hovered
    setTimeout(() => {
      if (!showArrows) {
        setIsPaused(false);
      }
    }, 2000);
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    setIsPaused(true); // Pause auto-scroll when manually scrolling
    const scrollAmount = 300; // Scroll by ~1.5 items
    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
    // Resume auto-scroll after a delay if not hovered
    setTimeout(() => {
      if (!showArrows) {
        setIsPaused(false);
      }
    }, 2000);
  };

  if (products.length === 0) {
    return null; // Don't show carousel if no products
  }

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-white to-neutral/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-3">
            Nos produits phares
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre sélection de produits de qualité
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => {
            setIsPaused(true);
            setShowArrows(true);
          }}
          onMouseLeave={() => {
            setIsPaused(false);
            setShowArrows(false);
          }}
        >
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2.5 sm:p-3 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border border-border/50 group ${
              showArrows ? 'opacity-100 translate-x-0' : 'opacity-60 translate-x-0'
            }`}
            aria-label="Scroll left"
            onMouseEnter={() => setShowArrows(true)}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-accent transition-colors" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2.5 sm:p-3 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border border-border/50 group ${
              showArrows ? 'opacity-100 translate-x-0' : 'opacity-60 translate-x-0'
            }`}
            aria-label="Scroll right"
            onMouseEnter={() => setShowArrows(true)}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-accent transition-colors" />
          </button>
          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* Render products twice for seamless loop */}
            {[...products, ...products].map((product, index) => {
              const imageUrl = product.images?.[0] || "/images/placeholder-product.jpg";
              
              return (
                <Link
                  key={`${product.id}-${index}`}
                  href={`/shop/produit/${product.slug}`}
                  className="group flex-shrink-0 w-36 sm:w-40 md:w-44 lg:w-52"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-neutral/20 border border-border/50">
                    {/* Square product image */}
                    <Image
                      src={imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 144px, (max-width: 768px) 160px, (max-width: 1024px) 176px, 208px"
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                    
                    {/* Product info overlay - bottom */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-accent font-bold text-lg">
                        {formatPrice(product.price_cents, product.currency)}
                      </p>
                    </div>

                    {/* Quick view badge */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                      <div className="bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-xl">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
        </div>

        {/* View all products link */}
        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors group"
          >
            <ShoppingBag className="w-4 h-4" />
            Voir tous les produits
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
