import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin/auth';
import { getProducts, saveProducts } from '@/lib/catalog/data';
import type { CatalogProduct, ImportResult, CSVMapping } from '@/types/catalog';

export async function POST(request: NextRequest) {
  const admin = await isAdmin();
  
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const mappingJson = formData.get('mapping') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const mapping: CSVMapping = mappingJson ? JSON.parse(mappingJson) : {
      SKU: 'sku',
      Description: 'name',
      Price: 'price',
      Promo: 'promoPrice',
      Category: 'category',
      Image: 'images',
      Brand: 'brand',
    };

    const text = await file.text();
    const lines = text.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

    const result: ImportResult = {
      totalRows: lines.length - 1,
      created: 0,
      updated: 0,
      skipped: 0,
      errors: [],
    };

    const existingProducts = getProducts();
    const productsMap = new Map(existingProducts.map(p => [p.sku, p]));

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));

      try {
        const row: Record<string, string> = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });

        const sku = row[mapping.SKU as string] || row['SKU'] || row['sku'];
        if (!sku) {
          result.skipped++;
          result.errors.push({ row: i + 1, message: 'SKU manquant' });
          continue;
        }

        const name = row[mapping.Description as string] || row['Description'] || row['name'] || '';
        const priceStr = row[mapping.Price as string] || row['Price'] || row['price'] || '0';
        const price = parseFloat(priceStr.replace(',', '.')) || 0;

        if (!name || price <= 0) {
          result.skipped++;
          result.errors.push({ row: i + 1, message: 'Données invalides (nom ou prix)' });
          continue;
        }

        const existing = productsMap.get(sku);
        const product: CatalogProduct = {
          id: existing?.id || `prod-${Date.now()}-${i}`,
          sku,
          name,
          brand: row[mapping.Brand as string] || row['Brand'] || row['brand'] || existing?.brand,
          category: row[mapping.Category as string] || row['Category'] || row['category'] || existing?.category,
          tags: existing?.tags || [],
          descriptionShort: existing?.descriptionShort,
          price,
          promoPrice: row[mapping.Promo as string] ? parseFloat(row[mapping.Promo as string].replace(',', '.')) : existing?.promoPrice,
          currency: 'EUR',
          images: row[mapping.Image as string] ? [row[mapping.Image as string]] : (existing?.images || []),
          stock: existing?.stock,
          urlSlug: existing?.urlSlug || sku.toLowerCase().replace(/\s+/g, '-'),
          lastUpdated: new Date().toISOString(),
        };

        if (existing) {
          productsMap.set(sku, { ...existing, ...product });
          result.updated++;
        } else {
          productsMap.set(sku, product);
          result.created++;
        }
      } catch (err: any) {
        result.skipped++;
        result.errors.push({ row: i + 1, message: err.message || 'Erreur de parsing' });
      }
    }

    saveProducts(Array.from(productsMap.values()));

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Import failed' },
      { status: 500 }
    );
  }
}
