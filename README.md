# Comarden Website

Premium B2B website for Comarden, a Belgian construction materials supplier.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (icons)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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

