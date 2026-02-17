"use client";

import Image from 'next/image';
import { Sparkles, TrendingUp, Star } from 'lucide-react';
import type { CatalogPage, CatalogProduct } from '@/types/catalog';
import { formatPrice } from '@/lib/shop/utils';

interface CatalogPageViewProps {
  page: CatalogPage;
  products: CatalogProduct[];
  onProductClick: (product: CatalogProduct) => void;
  token: string;
}

// Placeholder images - can be replaced later
const PLACEHOLDER_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
  product: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  catalog: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
};

export default function CatalogPageView({
  page,
  products,
  onProductClick,
  token,
}: CatalogPageViewProps) {
  const getProduct = (sku?: string) => {
    if (!sku) return null;
    return products.find(p => p.sku === sku) || null;
  };

  const getImageUrl = (imageUrl?: string, fallback: string = PLACEHOLDER_IMAGES.product) => {
    if (!imageUrl || imageUrl.startsWith('/images/')) {
      return fallback;
    }
    return imageUrl;
  };

  const renderSlot = (slot: typeof page.slots[0], index: number, variant: 'default' | 'large' | 'compact' = 'default') => {
    const product = getProduct(slot.productSku);
    const displayPrice = slot.overridePrice ?? product?.price ?? 0;
    const displayImage = getImageUrl(slot.imageOverride ?? product?.images[0]);
    const displayTitle = slot.customTitle ?? product?.name ?? 'Produit';
    const hasPromo = product?.promoPrice && product.promoPrice < product.price;
    const discountPercent = hasPromo && product ? Math.round(((product.price - product.promoPrice!) / product.price) * 100) : 0;

    const sizeClasses = {
      default: 'p-0',
      large: 'p-4 sm:p-6 md:p-8 lg:p-10',
      compact: 'p-2 sm:p-3',
    };

    return (
      <div
        key={slot.slotId}
        className={`relative group cursor-pointer ${sizeClasses[variant]} transition-all duration-300`}
        onClick={() => product && onProductClick(product)}
      >
        <div className="relative w-full">
          {/* Premium Image Container */}
          <div className={`relative aspect-square bg-gradient-to-br from-neutral/30 to-neutral/10 overflow-hidden shadow-md sm:shadow-lg group-hover:shadow-xl transition-all duration-300 ${
            variant === 'default' 
              ? 'rounded-2xl mb-3' 
              : variant === 'large' 
                ? 'rounded-2xl sm:rounded-3xl mb-3 sm:mb-4' 
                : 'rounded-xl mb-2'
          }`}>
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none" />
            
            <Image
              src={displayImage}
              alt={displayTitle}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            
            {/* Premium Badges */}
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 flex flex-col gap-1.5 sm:gap-2">
              {slot.customBadge && (
                <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-accent to-accent/90 text-primary text-[10px] sm:text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                  {slot.customBadge}
                </div>
              )}
              {hasPromo && (
                <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  -{discountPercent}%
                </div>
              )}
            </div>

            {/* Hover Overlay - Desktop only */}
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-4 pointer-events-none">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full">
                <p className="text-white text-sm font-semibold mb-2 line-clamp-2">
                  {displayTitle}
                </p>
                <div className="flex items-center gap-2">
                  {hasPromo ? (
                    <>
                      <span className="text-accent font-bold text-base">
                        {formatPrice(Math.round(product!.promoPrice! * 100), product!.currency)}
                      </span>
                      <span className="text-white/70 text-xs line-through">
                        {formatPrice(Math.round(product!.price * 100), product!.currency)}
                      </span>
                    </>
                  ) : (
                    <span className="text-white font-bold text-base">
                      {formatPrice(Math.round(displayPrice * 100), product?.currency || 'EUR')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Product Info - Always visible on mobile, hidden on desktop hover */}
          <div className="lg:group-hover:opacity-0 lg:group-hover:hidden transition-all duration-300">
            <h3 className={`font-bold text-primary mb-1 line-clamp-2 leading-tight ${
              variant === 'default' 
                ? 'text-sm lg:text-base' 
                : variant === 'large' 
                  ? 'text-base sm:text-lg' 
                  : 'text-xs sm:text-sm'
            }`}>
              {displayTitle}
            </h3>
            {product?.brand && (
              <p className={`text-muted-foreground mb-1.5 line-clamp-1 ${
                variant === 'default' 
                  ? 'text-xs' 
                  : variant === 'large' 
                    ? 'text-xs sm:text-sm' 
                    : 'text-[10px] sm:text-xs'
              }`}>
                {product.brand}
              </p>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              {hasPromo ? (
                <>
                  <span className={`text-accent font-bold ${
                    variant === 'default' 
                      ? 'text-base lg:text-lg' 
                      : variant === 'large' 
                        ? 'text-lg sm:text-xl' 
                        : 'text-sm sm:text-base'
                  }`}>
                    {formatPrice(Math.round(product!.promoPrice! * 100), product!.currency)}
                  </span>
                  <span className={`text-muted-foreground line-through ${
                    variant === 'default' 
                      ? 'text-xs' 
                      : variant === 'large' 
                        ? 'text-xs sm:text-sm' 
                        : 'text-[10px] sm:text-xs'
                  }`}>
                    {formatPrice(Math.round(product!.price * 100), product!.currency)}
                  </span>
                </>
              ) : (
                <span className={`text-primary font-bold ${
                  variant === 'default' 
                    ? 'text-base lg:text-lg' 
                    : variant === 'large' 
                      ? 'text-lg sm:text-xl' 
                      : 'text-sm sm:text-base'
                }`}>
                  {formatPrice(Math.round(displayPrice * 100), product?.currency || 'EUR')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  switch (page.templateType) {
    case 'HERO':
      return (
        <div
          className="w-full h-full relative flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: page.backgroundImage ? `url(${getImageUrl(page.backgroundImage, PLACEHOLDER_IMAGES.hero)})` : undefined,
            backgroundColor: page.backgroundColor || 'transparent',
          }}
        >
          {/* Premium Background Overlay */}
          {page.backgroundImage && (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/95" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.1),transparent_50%)]" />
            </>
          )}

          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          </div>

          {/* Content - Mobile Optimized */}
          <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-5xl w-full">
            {page.title && (
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-5 md:mb-6 drop-shadow-2xl leading-[1.1] animate-fade-in-up">
                {page.title}
              </h1>
            )}
            {page.subtitle && (
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/95 drop-shadow-lg font-light mb-6 sm:mb-8 md:mb-10 animate-fade-in-up px-2" style={{ animationDelay: '0.2s' }}>
                {page.subtitle}
              </p>
            )}
          </div>

          {/* Premium Hotspots - Desktop: Positioned, Mobile: Hidden (replaced by bottom buttons) */}
          {page.slots.map((slot, index) => {
            if (!slot.hotspotPosition) return null;
            const product = getProduct(slot.productSku);
            
            return (
              <button
                key={slot.slotId}
                className="hidden lg:block absolute z-20 group/hotspot animate-fade-in-scale"
                style={{
                  left: `${slot.hotspotPosition.x}%`,
                  top: `${slot.hotspotPosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${index * 0.1}s`,
                }}
                onClick={() => product && onProductClick(product)}
                aria-label={product?.name || 'Produit'}
              >
                <div className="relative">
                  {/* Pulse Rings */}
                  <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
                  <div className="absolute inset-0 rounded-full bg-accent/20 animate-pulse" />
                  
                  {/* Main Button */}
                  <div className="relative w-10 h-10 sm:w-12 sm:h-14 rounded-full bg-gradient-to-br from-accent to-accent/80 border-4 border-white shadow-2xl group-hover/hotspot:scale-125 transition-transform duration-300 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-6 text-primary" />
                  </div>
                </div>
              </button>
            );
          })}
          
          {/* Mobile: Clean Floating Action Buttons at Bottom */}
          <div className="lg:hidden absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3 px-4">
            {page.slots.slice(0, 2).map((slot, index) => {
              const product = getProduct(slot.productSku);
              if (!product) return null;
              
              return (
                <button
                  key={slot.slotId}
                  onClick={() => onProductClick(product)}
                  className="group/btn relative px-4 py-2.5 bg-white/95 backdrop-blur-md rounded-full shadow-xl border-2 border-accent/30 hover:border-accent active:scale-95 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-primary text-xs font-bold line-clamp-1 max-w-[100px] sm:max-w-[120px]">
                      {product.name.split(' ').slice(0, 2).join(' ')}
                    </span>
                  </div>
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 rounded-full bg-accent/20 opacity-0 group-hover/btn:opacity-100 blur-md transition-opacity duration-300 -z-10" />
                </button>
              );
            })}
          </div>
        </div>
      );

    case 'SPLIT_2':
      return (
        <div className="w-full h-full p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {page.slots.slice(0, 2).map((slot, index) => (
            <div key={slot.slotId} className="flex flex-col justify-center animate-fade-in-scale" style={{ animationDelay: `${index * 0.1}s` }}>
              {renderSlot(slot, index, 'large')}
            </div>
          ))}
        </div>
      );

    case 'GRID_4':
      return (
        <div className="w-full h-full p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          {page.slots.slice(0, 4).map((slot, index) => (
            <div key={slot.slotId} className="animate-fade-in-scale flex flex-col justify-start" style={{ animationDelay: `${index * 0.05}s` }}>
              {renderSlot(slot, index, 'default')}
            </div>
          ))}
        </div>
      );

    case 'GRID_8':
      return (
        <div className="w-full h-full p-2 sm:p-3 md:p-4 lg:p-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
          {page.slots.slice(0, 8).map((slot, index) => (
            <div key={slot.slotId} className="animate-fade-in-scale flex flex-col" style={{ animationDelay: `${index * 0.03}s` }}>
              {renderSlot(slot, index, 'compact')}
            </div>
          ))}
        </div>
      );

    case 'STORY':
      return (
        <div className="w-full h-full p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col">
          <div className="mb-6 sm:mb-8 md:mb-12 animate-fade-in-up">
            {page.title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-primary mb-3 sm:mb-4 leading-tight">
                {page.title}
              </h2>
            )}
            {page.subtitle && (
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                {page.subtitle}
              </p>
            )}
          </div>
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {page.slots.slice(0, 3).map((slot, index) => (
              <div key={slot.slotId} className="animate-fade-in-scale" style={{ animationDelay: `${index * 0.1}s` }}>
                {renderSlot(slot, index, 'default')}
              </div>
            ))}
          </div>
        </div>
      );

    case 'CATEGORY':
      return (
        <div className="w-full h-full flex flex-col overflow-hidden">
          {/* Premium Header Section */}
          {page.title && (
            <div className="flex-shrink-0 px-6 lg:px-8 xl:px-10 py-4 lg:py-5 xl:py-6 bg-gradient-to-b from-white via-white to-neutral/5 border-b border-border/30">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-1 h-8 lg:h-10 xl:h-12 bg-gradient-to-b from-accent to-accent/70 rounded-full shadow-sm" />
                <h2 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-black text-primary tracking-tight">
                  {page.title}
                </h2>
                <div className="ml-auto hidden lg:flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-full">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {page.slots.length} produit{page.slots.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Desktop: Premium Grid Layout with Perfect Spacing */}
          <div className="hidden lg:block flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-6 lg:p-8 xl:p-10 2xl:p-12">
              <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 xl:gap-7 2xl:gap-8">
                {page.slots.map((slot, index) => (
                  <div 
                    key={slot.slotId} 
                    className="animate-fade-in-scale transform transition-all duration-300 hover:scale-[1.02]" 
                    style={{ animationDelay: `${index * 0.02}s` }}
                  >
                    {renderSlot(slot, index, 'default')}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile/Tablet: Compact Grid */}
          <div className="lg:hidden flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-4 overflow-y-auto custom-scrollbar">
            {page.slots.map((slot, index) => (
              <div key={slot.slotId} className="animate-fade-in-scale" style={{ animationDelay: `${index * 0.03}s` }}>
                {renderSlot(slot, index, 'compact')}
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-full p-8 flex items-center justify-center">
          <p className="text-muted-foreground">Template non supporté</p>
        </div>
      );
  }
}
