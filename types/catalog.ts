// Catalog Reader Types

export interface CatalogProduct {
  id: string;
  sku: string;
  name: string;
  brand?: string;
  category?: string;
  tags: string[];
  descriptionShort?: string;
  price: number;
  promoPrice?: number;
  currency: string;
  images: string[];
  stock?: number;
  urlSlug: string; // Main website product URL
  productUrl?: string; // Full URL to product page
  lastUpdated: string;
}

export interface CatalogEdition {
  id: string;
  title: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  theme?: {
    primaryColor?: string;
    accentColor?: string;
    backgroundImage?: string;
  };
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

export type PageTemplateType = 'HERO' | 'SPLIT_2' | 'GRID_4' | 'GRID_8' | 'STORY' | 'CATEGORY';

export interface CatalogSlot {
  slotId: string;
  productSku?: string;
  customTitle?: string;
  customBadge?: string; // "NEW", "PROMO", etc.
  hotspotPosition?: { x: number; y: number }; // For HERO pages
  overridePrice?: number;
  ctaLink?: string;
  imageOverride?: string;
}

export interface CatalogPage {
  id: string;
  editionId: string;
  index: number; // Page number (1-based)
  templateType: PageTemplateType;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  slots: CatalogSlot[];
  metadata?: Record<string, any>;
}

export interface CatalogData {
  edition: CatalogEdition;
  pages: CatalogPage[];
  products: CatalogProduct[];
}

// Voice Assistant Types

export type VoiceCommandType = 
  | 'SEARCH' 
  | 'FILTER' 
  | 'NAVIGATE' 
  | 'OPEN_PRODUCT' 
  | 'COMPARE' 
  | 'CART_ADD' 
  | 'CART_REMOVE' 
  | 'ANSWER_POLICY';

export interface VoiceCommand {
  type: VoiceCommandType;
  payload: {
    keywords?: string;
    category?: string;
    brand?: string;
    color?: string;
    minPrice?: number;
    maxPrice?: number;
    promoOnly?: boolean;
    pageNumber?: number;
    productSku?: string;
    resultIndex?: number;
    productSkus?: string[]; // For compare
    question?: string; // For policy Q&A
  };
}

export interface VoiceResponse {
  command: VoiceCommand;
  reply: string;
  suggestions?: string[];
}

// Import/Export Types

export interface ImportResult {
  totalRows: number;
  created: number;
  updated: number;
  skipped: number;
  errors: Array<{
    row: number;
    message: string;
    data?: any;
  }>;
}

export interface CSVMapping {
  [csvColumn: string]: keyof CatalogProduct | 'skip';
}
