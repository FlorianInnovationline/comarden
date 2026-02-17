// Catalog Data Repository
// Uses JSON files for now, can be swapped to DB later

import type { CatalogProduct, CatalogEdition, CatalogPage, CatalogData } from '@/types/catalog';

// Server-only functions
function getDataPath(filename: string): string {
  if (typeof window !== 'undefined') return '';
  const path = require('path');
  return path.join(process.cwd(), 'data', 'catalog', filename);
}

function ensureDataDir(): void {
  if (typeof window !== 'undefined') return;
  const fs = require('fs');
  const path = require('path');
  const dataPath = path.join(process.cwd(), 'data', 'catalog');
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true });
  }
}

export function getProducts(): CatalogProduct[] {
  if (typeof window !== 'undefined') return [];
  
  try {
    ensureDataDir();
    const fs = require('fs');
    const filePath = getDataPath('products.json');
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading products:', err);
    return [];
  }
}

export function saveProducts(products: CatalogProduct[]): void {
  if (typeof window !== 'undefined') return;
  
  try {
    ensureDataDir();
    const fs = require('fs');
    const filePath = getDataPath('products.json');
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving products:', err);
  }
}

export function getProductBySku(sku: string): CatalogProduct | null {
  const products = getProducts();
  return products.find(p => p.sku === sku) || null;
}

export function getEditions(): CatalogEdition[] {
  if (typeof window !== 'undefined') return [];
  
  try {
    ensureDataDir();
    const fs = require('fs');
    const filePath = getDataPath('editions.json');
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading editions:', err);
    return [];
  }
}

export function saveEdition(edition: CatalogEdition): void {
  if (typeof window !== 'undefined') return;
  
  try {
    ensureDataDir();
    const fs = require('fs');
    const editions = getEditions();
    const index = editions.findIndex(e => e.id === edition.id);
    if (index >= 0) {
      editions[index] = edition;
    } else {
      editions.push(edition);
    }
    const filePath = getDataPath('editions.json');
    fs.writeFileSync(filePath, JSON.stringify(editions, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving edition:', err);
  }
}

export function getPages(editionId: string): CatalogPage[] {
  if (typeof window !== 'undefined') return [];
  
  try {
    ensureDataDir();
    const fs = require('fs');
    const filePath = getDataPath(`pages_${editionId}.json`);
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content).sort((a: CatalogPage, b: CatalogPage) => a.index - b.index);
  } catch (err) {
    console.error('Error reading pages:', err);
    return [];
  }
}

export function savePages(editionId: string, pages: CatalogPage[]): void {
  if (typeof window !== 'undefined') return;
  
  try {
    ensureDataDir();
    const fs = require('fs');
    const filePath = getDataPath(`pages_${editionId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(pages, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving pages:', err);
  }
}

export function getPublishedEdition(): CatalogEdition | null {
  const editions = getEditions();
  return editions.find(e => e.status === 'published') || null;
}

export function getCatalogData(editionId?: string): CatalogData | null {
  const edition = editionId 
    ? getEditions().find(e => e.id === editionId) || getPublishedEdition()
    : getPublishedEdition();
  
  if (!edition) return null;
  
  const pages = getPages(edition.id);
  const products = getProducts();
  
  return {
    edition,
    pages,
    products,
  };
}
