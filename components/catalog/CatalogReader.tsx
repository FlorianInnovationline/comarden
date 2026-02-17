"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search, X, ShoppingBag, Mic, Filter, Grid3x3, BookOpen } from 'lucide-react';
import type { CatalogData, CatalogProduct } from '@/types/catalog';
import CatalogPageView from './CatalogPageView';
import QuickViewModal from './QuickViewModal';
import ShopThisPageDrawer from './ShopThisPageDrawer';
import VoiceAssistant from './VoiceAssistant';
import { useCart } from '@/lib/shop/cart';

interface CatalogReaderProps {
  token: string;
  editionId?: string;
}

export default function CatalogReader({ token, editionId }: CatalogReaderProps) {
  const [data, setData] = useState<CatalogData | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'catalog' | 'grid'>('catalog');
  const [filters, setFilters] = useState<{
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    promoOnly?: boolean;
  }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const { addToCart } = useCart();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load catalog data
  useEffect(() => {
    const url = editionId 
      ? `/api/catalog/edition/${editionId}?t=${token}`
      : `/api/catalog/current?t=${token}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load catalog:', err);
        setLoading(false);
      });
  }, [token, editionId]);

  // Handle page navigation
  const goToPage = useCallback((pageIndex: number) => {
    if (!data) return;
    
    if (pageIndex === -1) {
      pageIndex = currentPage + 1;
    } else if (pageIndex === -2) {
      pageIndex = currentPage - 1;
    }
    
    const isDesktop = window.innerWidth >= 1024;
    const pagesPerView = isDesktop ? 2 : 1;
    const maxPage = Math.ceil(data.pages.length / pagesPerView) - 1;
    const newPage = Math.max(0, Math.min(pageIndex, maxPage));
    setCurrentPage(newPage);
    
    if (containerRef.current) {
      if (isMobile) {
        // Horizontal scroll for mobile/tablet (book-like)
        const pageWidth = window.innerWidth;
        containerRef.current.scrollTo({
          left: newPage * pageWidth,
          behavior: 'smooth',
        });
      } else {
        // Vertical scroll for desktop
        const pageHeight = window.innerHeight;
        containerRef.current.scrollTo({
          top: newPage * pageHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [data, currentPage, isMobile]);

  // Touch gestures for mobile (horizontal swipe like a book)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const diff = touchStartX.current - touchEndX.current;
    const minSwipe = 50;
    
    if (Math.abs(diff) > minSwipe) {
      if (diff > 0) {
        // Swipe left = next page (like turning a book page)
        goToPage(currentPage + 1);
      } else {
        // Swipe right = previous page
        goToPage(currentPage - 1);
      }
    }
    
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (searchOpen || filtersOpen) return;
      
      if (e.key === 'ArrowRight' || (isMobile && e.key === 'ArrowDown')) {
        e.preventDefault();
        goToPage(currentPage + 1);
      } else if (e.key === 'ArrowLeft' || (isMobile && e.key === 'ArrowUp')) {
        e.preventDefault();
        goToPage(currentPage - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, goToPage, searchOpen, filtersOpen, isMobile]);

  // Calculate pagesPerView - Define before use (use useMemo to ensure it's always defined)
  const pagesPerView = useMemo(() => (isMobile ? 1 : 2), [isMobile]);

  // Apply filters and search - Define before use
  const filteredPages = useMemo(() => {
    if (!data?.pages) return [];
    
    return data.pages.filter(page => {
      if (!searchQuery && !filters.category && !filters.brand && !filters.minPrice && !filters.maxPrice && !filters.promoOnly) {
        return true;
      }

      return page.slots.some(slot => {
        if (!slot.productSku) return false;
        const product = data.products.find(p => p.sku === slot.productSku);
        if (!product) return false;

        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchesSearch = 
            product.name.toLowerCase().includes(query) ||
            product.descriptionShort?.toLowerCase().includes(query) ||
            product.brand?.toLowerCase().includes(query) ||
            product.tags.some(tag => tag.toLowerCase().includes(query));
          if (!matchesSearch) return false;
        }

        if (filters.category && product.category !== filters.category) return false;
        if (filters.brand && product.brand !== filters.brand) return false;
        if (filters.minPrice && product.price < filters.minPrice) return false;
        if (filters.maxPrice && product.price > filters.maxPrice) return false;
        if (filters.promoOnly && !product.promoPrice) return false;

        return true;
      });
    });
  }, [data, searchQuery, filters]);

  // Scroll handling - Less aggressive for desktop
  useEffect(() => {
    const container = containerRef.current;
    if (!container || viewMode === 'grid' || !data) return;

    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      // Clear previous timeout
      clearTimeout(scrollTimeout);
      
      // Debounce scroll updates for smoother experience
      scrollTimeout = setTimeout(() => {
        if (isMobile) {
          // Horizontal scroll for mobile
          const pageWidth = window.innerWidth;
          const scrollLeft = container.scrollLeft;
          const newPage = Math.round(scrollLeft / pageWidth);
          if (newPage !== currentPage && newPage >= 0) {
            setCurrentPage(newPage);
          }
        } else {
          // Vertical scroll for desktop - use proximity instead of exact match
          const pageHeight = window.innerHeight;
          const scrollTop = container.scrollTop;
          const threshold = 0.3; // 30% threshold for page change
          const newPage = Math.floor(scrollTop / pageHeight + threshold);
          
          if (newPage !== currentPage && newPage >= 0) {
            const maxPage = Math.ceil((filteredPages.length / pagesPerView) - 1);
            if (newPage <= maxPage) {
              setCurrentPage(newPage);
            }
          }
        }
      }, 100); // Debounce for 100ms
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentPage, viewMode, isMobile, filteredPages.length, pagesPerView, data]);

  // Get products for current page
  const getCurrentPageProducts = useCallback((): CatalogProduct[] => {
    if (!data) return [];
    
    const startPage = currentPage * pagesPerView;
    const endPage = Math.min(startPage + pagesPerView, data.pages.length);
    
    const products: CatalogProduct[] = [];
    for (let i = startPage; i < endPage; i++) {
      const page = data.pages[i];
      if (!page) continue;
      
      page.slots.forEach(slot => {
        if (slot.productSku) {
          const product = data.products.find(p => p.sku === slot.productSku);
          if (product) products.push(product);
        }
      });
    }
    
    return products;
  }, [data, currentPage, pagesPerView]);


  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-primary via-primary/95 to-[#0a1f3f] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 border-4 border-accent/30 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-accent rounded-full animate-spin" />
          </div>
          <p className="text-white text-lg font-medium">Chargement du catalogue...</p>
          <p className="text-white/60 text-sm mt-2">Préparation de votre expérience</p>
        </div>
      </div>
    );
  }

  if (!data || data.pages.length === 0) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-primary via-primary/95 to-[#0a1f3f] flex items-center justify-center">
        <div className="text-center px-8">
          <BookOpen className="w-16 h-16 text-accent mx-auto mb-4 opacity-50" />
          <p className="text-white text-xl font-medium">Aucun catalogue disponible</p>
          <p className="text-white/60 text-sm mt-2">Veuillez contacter l&apos;administrateur</p>
        </div>
      </div>
    );
  }

  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
  const totalPages = Math.ceil(data.pages.length / pagesPerView);
  const progress = ((currentPage + 1) / totalPages) * 100;

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-neutral via-white to-neutral/30 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Premium Top Bar with Glassmorphism - Mobile Optimized */}
      <div className={`absolute top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-lg ${
        isMobile ? 'lg:bg-white/80' : ''
      }`}>
        <div className={`px-4 sm:px-6 lg:px-8 ${isMobile ? 'py-2.5' : 'py-3 sm:py-4'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="hidden sm:block w-px h-6 bg-border/50" />
              <h1 className={`${isMobile ? 'text-sm' : 'text-base sm:text-lg'} font-bold text-primary tracking-tight`}>
                {data.edition.title}
              </h1>
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-primary">
                  Page {currentPage + 1} / {totalPages}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className={`${isMobile ? 'p-1.5' : 'p-2'} rounded-xl bg-white/60 hover:bg-white transition-all duration-200 hover:scale-105 relative`}
                aria-label="Filtres"
              >
                <Filter className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-primary`} />
                {(filters.category || filters.promoOnly || filters.minPrice || filters.maxPrice) && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-accent rounded-full" />
                )}
              </button>
              
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`${isMobile ? 'p-1.5' : 'p-2'} rounded-xl bg-white/60 hover:bg-white transition-all duration-200 hover:scale-105`}
                aria-label="Rechercher"
              >
                <Search className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-primary`} />
              </button>
              
              <button
                onClick={() => setDrawerOpen(true)}
                className={`${isMobile ? 'p-1.5' : 'p-2'} rounded-xl bg-accent/20 hover:bg-accent/30 transition-all duration-200 hover:scale-105 relative`}
                aria-label="Acheter cette page"
              >
                <ShoppingBag className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-accent`} />
                {getCurrentPageProducts().length > 0 && (
                  <span className={`absolute ${isMobile ? '-top-0.5 -right-0.5 min-w-[14px] h-[14px] text-[9px]' : '-top-1 -right-1 min-w-[18px] h-[18px] text-[10px]'} bg-accent text-primary font-bold rounded-full flex items-center justify-center px-0.5`}>
                    {getCurrentPageProducts().length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Search Bar - Mobile Optimized */}
      {searchOpen && (
        <div className={`absolute ${isMobile ? 'top-[57px]' : 'top-[73px] sm:top-[81px]'} left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-xl animate-slide-down`}>
          <div className={`px-4 sm:px-6 lg:px-8 ${isMobile ? 'py-3' : 'py-4'}`}>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-muted-foreground`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className={`w-full ${isMobile ? 'pl-10 pr-3 py-2 text-sm' : 'pl-12 pr-4 py-3 text-sm sm:text-base'} bg-white/80 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all`}
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral/50 rounded-lg transition-colors`}
                  >
                    <X className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-muted-foreground`} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Filters Panel - Mobile Optimized */}
      {filtersOpen && (
        <div className={`absolute ${isMobile ? 'top-[57px]' : 'top-[73px] sm:top-[81px]'} left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-xl animate-slide-down`}>
          <div className={`px-4 sm:px-6 lg:px-8 ${isMobile ? 'py-3' : 'py-4'}`}>
            <div className={`max-w-4xl mx-auto ${isMobile ? 'grid grid-cols-1 gap-2' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'}`}>
              <select
                value={filters.category || ''}
                onChange={(e) => setFilters({ ...filters, category: e.target.value || undefined })}
                className={`${isMobile ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm'} bg-white/80 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50`}
              >
                <option value="">Toutes les catégories</option>
                {Array.from(new Set(data.products.map(p => p.category).filter(Boolean))).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              <select
                value={filters.brand || ''}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value || undefined })}
                className={`${isMobile ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm'} bg-white/80 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50`}
              >
                <option value="">Toutes les marques</option>
                {Array.from(new Set(data.products.map(p => p.brand).filter(Boolean))).map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              
              <label className={`flex items-center gap-2 sm:gap-3 ${isMobile ? 'px-3 py-2' : 'px-4 py-2.5'} bg-white/80 border border-border/50 rounded-xl cursor-pointer hover:bg-white transition-colors`}>
                <input
                  type="checkbox"
                  checked={filters.promoOnly || false}
                  onChange={(e) => setFilters({ ...filters, promoOnly: e.target.checked || undefined })}
                  className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-accent rounded focus:ring-accent`}
                />
                <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-primary`}>Promotions uniquement</span>
              </label>
              
              <button
                onClick={() => setFilters({})}
                className={`${isMobile ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm'} bg-neutral/50 hover:bg-neutral border border-border/50 rounded-xl font-medium text-primary transition-colors`}
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Container - Horizontal on mobile, Vertical on desktop */}
      <div
        ref={containerRef}
        className={`h-full ${
          isMobile 
            ? 'catalog-horizontal-scroll overflow-x-scroll overflow-y-hidden snap-x snap-mandatory scroll-smooth' 
            : 'overflow-y-scroll overflow-x-hidden scroll-smooth'
        }`}
        style={{
          scrollPaddingTop: !isMobile && (searchOpen || filtersOpen) ? (window.innerWidth >= 640 ? '185px' : '177px') : 0,
          paddingTop: isMobile 
            ? (searchOpen || filtersOpen ? '140px' : '57px') 
            : (searchOpen || filtersOpen ? (window.innerWidth >= 640 ? '185px' : '177px') : '73px'),
          paddingBottom: isMobile ? '80px' : '100px',
        }}
      >
        <div className={isMobile ? 'flex' : 'flex flex-col'}>
          {filteredPages.map((page, index) => {
            // Calculate the actual page group for desktop (2 pages per view)
            const pageGroupIndex = Math.floor(index / pagesPerView);
            const isFirstPageInGroup = index % pagesPerView === 0;
            
            if (isFirstPageInGroup) {
              const nextPageIndex = index + 1;
              const nextPage = nextPageIndex < filteredPages.length ? filteredPages[nextPageIndex] : null;
              
              return (
                <div
                  key={page.id}
                  className={`relative ${
                    isMobile 
                      ? 'min-w-full flex-shrink-0 snap-start' 
                      : 'min-h-screen flex'
                  }`}
                  style={isMobile ? { width: '100vw', height: '100vh' } : { height: '100vh' }}
                >
                  {/* Page Number Indicator - Left */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-white text-xs font-bold">
                    {page.index}
                  </div>
                  
                  {/* Left Page (or full page on mobile) */}
                  <div className={`w-full ${isDesktop ? 'w-1/2' : ''} h-full overflow-hidden`}>
                    <CatalogPageView
                      page={page}
                      products={data.products}
                      onProductClick={setSelectedProduct}
                      token={token}
                    />
                  </div>
                  
                  {/* Right Page (Desktop only) */}
                  {isDesktop && nextPage && (
                    <>
                      {/* Premium Divider */}
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent z-10" />
                      
                      {/* Right Page Number Indicator */}
                      <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-white text-xs font-bold">
                        {nextPage.index}
                      </div>
                      
                      {/* Right Page */}
                      <div className="w-1/2 h-full overflow-hidden ml-auto">
                        <CatalogPageView
                          page={nextPage}
                          products={data.products}
                          onProductClick={setSelectedProduct}
                          token={token}
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Premium Navigation Arrows */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 0}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 group"
        aria-label="Page précédente"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-accent transition-colors" />
      </button>
      
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 group"
        aria-label="Page suivante"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-accent transition-colors" />
      </button>

      {/* Premium Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-t border-white/20 shadow-lg">
        <div className="h-1 bg-neutral/30 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent via-accent/90 to-accent transition-all duration-500 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>
        
        {/* Page Dots */}
        <div className="flex justify-center gap-1.5 sm:gap-2 py-3 px-4">
          {Array.from({ length: Math.min(totalPages, 15) }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentPage 
                  ? 'w-8 sm:w-10 h-2 bg-accent shadow-lg shadow-accent/50' 
                  : 'w-2 h-2 bg-border hover:bg-primary/30'
              }`}
              aria-label={`Aller à la page ${i + 1}`}
            />
          ))}
          {totalPages > 15 && (
            <span className="text-xs text-muted-foreground ml-2 flex items-center">
              +{totalPages - 15}
            </span>
          )}
        </div>
      </div>

      {/* Modals */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product) => {
            const shopProduct = {
              id: product.id,
              title: product.name,
              slug: product.urlSlug,
              description: product.descriptionShort,
              price_cents: Math.round(product.price * 100),
              currency: product.currency,
              stock: product.stock || 0,
              is_active: true,
              images: product.images,
              tags: product.tags,
              created_at: product.lastUpdated,
              updated_at: product.lastUpdated,
            };
            addToCart(shopProduct, 1);
            setSelectedProduct(null);
          }}
        />
      )}

      <ShopThisPageDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        products={getCurrentPageProducts()}
        token={token}
      />

      {/* Voice Assistant */}
      <VoiceAssistant
        catalogData={data}
        onNavigate={goToPage}
        onFilter={setFilters}
        onSearch={setSearchQuery}
        onOpenProduct={setSelectedProduct}
        token={token}
      />
    </div>
  );
}
