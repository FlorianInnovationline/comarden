import fs from "fs";
import path from "path";
import { RENTAL_PRODUCTS, type RentalProduct } from "./data";
import { RENTAL_SEED_IMAGES } from "./locationImages";

const DATA_DIR = path.join(process.cwd(), "data");
const OVERRIDES_FILE = path.join(DATA_DIR, "rental-product-overrides.json");
const PRODUCTS_FILE = path.join(DATA_DIR, "rental-products.json");

const SEED_IDS = new Set(RENTAL_PRODUCTS.map((p) => p.id));

export function isRentalSeedId(id: string): boolean {
  return SEED_IDS.has(id);
}

export function readRentalOverridesFile(): Record<string, Partial<RentalProduct>> {
  try {
    if (!fs.existsSync(OVERRIDES_FILE)) return {};
    const raw = fs.readFileSync(OVERRIDES_FILE, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    return parsed && typeof parsed === "object" ? (parsed as Record<string, Partial<RentalProduct>>) : {};
  } catch {
    return {};
  }
}

export function writeRentalOverrides(overrides: Record<string, Partial<RentalProduct>>) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(OVERRIDES_FILE, JSON.stringify(overrides, null, 2), "utf-8");
}

export function readCustomRentalProducts(): RentalProduct[] {
  try {
    if (!fs.existsSync(PRODUCTS_FILE)) return [];
    const raw = fs.readFileSync(PRODUCTS_FILE, "utf-8");
    return JSON.parse(raw) as RentalProduct[];
  } catch {
    return [];
  }
}

export function writeCustomRentalProducts(products: RentalProduct[]) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");
}

/**
 * Seed catalogue + per-id overrides + admin-added products (rental-products.json).
 */
export function getMergedRentalProducts(): RentalProduct[] {
  const overrides = readRentalOverridesFile();
  const seedMerged = RENTAL_PRODUCTS.map((p) => {
    const defaultImage = RENTAL_SEED_IMAGES[p.id];
    const base: RentalProduct = defaultImage
      ? { ...p, image: defaultImage }
      : { ...p };
    const o = overrides[p.id];
    if (!o) return base;
    return { ...base, ...o, id: p.id };
  });
  const custom = readCustomRentalProducts();
  return [...seedMerged, ...custom];
}
