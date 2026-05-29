# Comarden Website

Premium B2B website for Comarden, a Belgian construction materials supplier.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS**
- **Lucide React** (icons)
- **Supabase** — Postgres + Auth + Storage

## Getting Started

### Installation

```bash
npm install
```

### Configuration

Copy the env template and fill in your Supabase keys:

```bash
cp .env.local.example .env.local
```

The site also runs without Supabase (read-only seed data, admin disabled) —
useful for quick local previews.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin access

1. Apply the schema in `db/supabase-schema.sql` (Supabase SQL Editor).
2. Sign up at `/admin/login` (or via the Supabase dashboard).
3. Promote yourself in SQL:

   ```sql
   update public.profiles set role = 'admin'
   where email = 'you@example.com';
   ```

See [`ECOMMERCE_SETUP.md`](ECOMMERCE_SETUP.md) for the full walk-through.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Homepage
│   ├── produits/           # Products page
│   ├── services/           # Services page
│   ├── presentation/       # About page
│   ├── formations/         # Training page
│   ├── actu/               # News pages
│   └── contact/            # Contact page
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Homepage sections
│   └── ui/                 # Reusable UI components
└── lib/                    # Utilities
```

## Design System

- **Primary:** Deep navy/charcoal (#1a2332)
- **Accent:** Warm gold (#d4af37)
- **Neutral:** Off-white (#f8f9fa)
- **Typography:** Inter (Google Fonts)

## Catalog Reader

The site includes a premium catalog reader accessible at `/catalog-secret?t=TOKEN`. The catalog is **not linked from the main website navigation** - it's a hidden route accessible only via direct URL with token. See `/docs/CATALOG.md` for full documentation.

**Quick access:**
- Catalog: `/catalog-secret?t=catalog-secret-2024`
- Admin: `/admin/catalog` (after logging in via `/admin/login`)

## Next Steps

Use the V0 prompt in `V0_PROMPT.md` to generate alternative UI sections via V0 by Vercel.

