// Shop utility functions

export function formatPrice(cents: number, currency: string = 'EUR'): string {
  const amount = cents / 100;
  return new Intl.NumberFormat('fr-BE', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function calculateDiscount(
  priceCents: number,
  discountType: 'percent' | 'fixed',
  discountValue: number
): number {
  if (discountType === 'percent') {
    return Math.round(priceCents * (discountValue / 100));
  }
  return Math.min(discountValue, priceCents);
}

export function getStockStatus(stock: number): {
  label: string;
  color: string;
  available: boolean;
} {
  if (stock === 0) {
    return { label: 'Rupture de stock', color: 'text-red-600', available: false };
  }
  if (stock < 10) {
    return { label: 'Stock limité', color: 'text-orange-600', available: true };
  }
  return { label: 'En stock', color: 'text-green-600', available: true };
}
