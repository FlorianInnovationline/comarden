# 📁 Comarden Project Structure Guide

This guide explains where everything goes when you generate components with V0.

## 🗂️ Directory Structure

```
COMARDEN1/
├── app/                          # Next.js App Router (pages)
│   ├── layout.tsx                # Root layout (Header + Footer wrapper)
│   ├── page.tsx                 # Homepage (/)
│   ├── globals.css              # Global styles
│   │
│   ├── produits/
│   │   └── page.tsx            # Products page (/produits)
│   │
│   ├── services/
│   │   └── page.tsx            # Services page (/services)
│   │
│   ├── presentation/
│   │   └── page.tsx            # About page (/presentation)
│   │
│   ├── formations/
│   │   └── page.tsx            # Training page (/formations)
│   │
│   ├── actu/
│   │   ├── page.tsx            # News list (/actu)
│   │   └── [id]/
│   │       └── page.tsx        # Individual article (/actu/1, /actu/2, etc.)
│   │
│   └── contact/
│       └── page.tsx            # Contact page (/contact)
│
├── components/
│   ├── layout/                  # Site-wide layout components
│   │   ├── Header.tsx          # Navigation header (used everywhere)
│   │   └── Footer.tsx          # Footer (used everywhere)
│   │
│   ├── sections/                # Homepage sections (ONLY used on homepage)
│   │   ├── Hero.tsx            # Hero section
│   │   ├── Pillars.tsx         # 3 pillar cards
│   │   ├── Benefits.tsx        # "Pourquoi Comarden" list
│   │   ├── Locations.tsx       # Bertrix + Naninne cards
│   │   ├── NewsPreview.tsx     # 3 news cards preview
│   │   └── CTA.tsx             # Call-to-action band
│   │
│   └── ui/                      # Reusable UI primitives
│       ├── Button.tsx          # Button component
│       └── Card.tsx            # Card component
│
└── lib/
    └── utils.ts                 # Utility functions (cn helper)
```

## 🎯 Component Organization Rules

### 1. **Layout Components** (`components/layout/`)
- **Used by:** ALL pages (via `app/layout.tsx`)
- **Examples:** Header, Footer
- **When to modify:** When you want changes across the entire site

### 2. **Section Components** (`components/sections/`)
- **Used by:** ONLY the homepage (`app/page.tsx`)
- **Examples:** Hero, Pillars, Benefits, Locations, NewsPreview, CTA
- **When to modify:** When you want to change homepage sections

### 3. **Page-Specific Components**
- **Location:** Create new folders in `components/` for each page
- **Naming:** Use the page name (e.g., `components/produits/`, `components/services/`)
- **Examples:**
  - `components/produits/ProductGrid.tsx` → Used in `/produits`
  - `components/services/ServiceCard.tsx` → Used in `/services`
  - `components/contact/ContactForm.tsx` → Used in `/contact`

### 4. **UI Components** (`components/ui/`)
- **Used by:** ANYWHERE (reusable primitives)
- **Examples:** Button, Card, Input, Select, etc.
- **When to add:** When V0 generates a reusable component you want to use across pages

## 📝 How to Integrate V0 Components

### Scenario 1: V0 generates a component for `/produits` page

**Step 1:** Create the component file
```
components/produits/ProductCard.tsx  (or whatever V0 names it)
```

**Step 2:** Import and use in the page
```tsx
// app/produits/page.tsx
import ProductCard from "@/components/produits/ProductCard";

export default function ProduitsPage() {
  return (
    <div>
      <h1>Nos Produits</h1>
      <ProductCard />
    </div>
  );
}
```

### Scenario 2: V0 generates a reusable UI component

**Step 1:** Put it in `components/ui/`
```
components/ui/Input.tsx
components/ui/Select.tsx
```

**Step 2:** Use it anywhere
```tsx
import Input from "@/components/ui/Input";
```

### Scenario 3: V0 generates a full page layout

**Option A:** Replace the entire page file
```tsx
// app/produits/page.tsx
// Paste V0's entire page code here
```

**Option B:** Break it into components
```
components/produits/ProductHeader.tsx
components/produits/ProductGrid.tsx
components/produits/ProductFilters.tsx

// app/produits/page.tsx
import ProductHeader from "@/components/produits/ProductHeader";
import ProductGrid from "@/components/produits/ProductGrid";
import ProductFilters from "@/components/produits/ProductFilters";
```

## 🔍 Quick Reference: Which Component Goes Where?

| V0 Generates... | Put it in... | Import in... |
|----------------|--------------|--------------|
| Navigation/Header | `components/layout/Header.tsx` | `app/layout.tsx` |
| Footer | `components/layout/Footer.tsx` | `app/layout.tsx` |
| Homepage hero | `components/sections/Hero.tsx` | `app/page.tsx` |
| Products list | `components/produits/` | `app/produits/page.tsx` |
| Services cards | `components/services/` | `app/services/page.tsx` |
| Contact form | `components/contact/` | `app/contact/page.tsx` |
| Reusable button | `components/ui/Button.tsx` | Anywhere |
| Reusable card | `components/ui/Card.tsx` | Anywhere |

## 🚨 Important Notes

1. **Don't modify `components/sections/` for non-homepage pages** - Those are homepage-only
2. **Page routes = folder names** - `/produits` → `app/produits/page.tsx`
3. **Use `@/` alias** - All imports use `@/components/...` not `../components/...`
4. **Keep layout components separate** - Header/Footer stay in `components/layout/`

## 📋 Checklist When Adding V0 Components

- [ ] Identify which page it's for
- [ ] Create appropriate folder (`components/[pagename]/`)
- [ ] Copy V0 code to new file
- [ ] Check imports (use `@/` alias)
- [ ] Import component in the page file
- [ ] Test that it renders correctly
