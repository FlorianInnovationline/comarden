# E-commerce & Admin Setup Guide

This guide covers the data layer (Supabase) and admin authentication for the
Comarden main site. The site runs in two modes:

1. **Configured mode** — Supabase URL + keys present → real data, real auth.
2. **Fallback mode** — no Supabase env vars → read-only seed data from
   `lib/shop/seed.ts`. Useful for quick local previews. Admin features are
   disabled in this mode.

---

## 1. Create a Supabase project

1. Sign up at <https://supabase.com>.
2. Create a new project. Recommended region: **eu-central-1 (Frankfurt)** for
   Belgian latency.
3. Copy the **Project URL**, **anon public key**, and **service role key**
   (Project Settings → API).

## 2. Environment variables

Copy `.env.local.example` → `.env.local` and fill in your Supabase values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...   # SERVER-ONLY — never imported client-side
```

In **Vercel** → Project → Settings → Environment Variables, add the same three
keys. Mark `SUPABASE_SERVICE_ROLE_KEY` as **production-only** if you can; it
must never reach the browser bundle.

Never commit real keys. Only `.env.local.example` is tracked.

## 3. Apply the schema

In the Supabase dashboard, open **SQL Editor → New query**, paste the entire
contents of [`db/supabase-schema.sql`](db/supabase-schema.sql), and run it.

This creates:

- `profiles` (mirrors `auth.users`, holds `role`)
- `categories`, `products`, `orders`, `order_items`, `promotions`
- `events`, `job_postings`, `job_applications` (scaffolded for later prompts)
- The `is_admin()` helper used by every RLS policy
- A trigger that auto-creates a `profiles` row when someone signs up
- RLS policies on every table (public reads where appropriate; admin writes;
  public `INSERT` on `job_applications`)
- Storage buckets `cvs`, `event-media`, `product-images` (with policies)

The file is idempotent — safe to re-run.

## 4. Storage buckets

`db/supabase-schema.sql` creates these for you, but if you prefer the
dashboard:

| Bucket           | Visibility | Purpose                          | Insert       | Read         | Delete |
| ---------------- | ---------- | -------------------------------- | ------------ | ------------ | ------ |
| `cvs`            | Private    | CV + lettre uploads from jobs    | anyone       | admin only   | admin  |
| `event-media`    | Public     | Event photos / videos            | admin only   | public       | admin  |
| `product-images` | Public     | Shop product images              | admin only   | public       | admin  |

If you create the buckets through the UI, also apply the matching policies
from the schema file (search for `storage.objects` inside it).

## 5. Create your first admin

There's intentionally no "make me admin" button — admin status is set in SQL.

1. Sign up at <https://your-site/admin/login> with the credentials you want
   to use. (Or create a user in **Authentication → Users → Add user** from the
   Supabase dashboard.)
2. The trigger automatically inserts a `profiles` row with `role = 'viewer'`.
3. In the SQL Editor, promote yourself:

   ```sql
   update public.profiles
   set role = 'admin'
   where email = 'you@example.com';
   ```

4. Sign in again at `/admin/login`. You should now reach `/admin`.

## 6. How the data layer works

- **Reads** (`lib/shop/queries.ts`): exposes `getProducts`, `getCategories`,
  `getProductBySlug`, `getProductById`, `getCategoryBySlug`, `getOrders`,
  `getPromotions`. Each function uses the server-side Supabase client when
  env vars are set, and falls back to `lib/shop/seed.ts` when they are not.
- **Writes**: orders are inserted through `createOrder()`. Product CRUD is
  exposed via `/api/products` (POST) and `/api/products/[id]` (PUT). Both
  routes are gated by middleware when nested under `/api/admin/*`; the
  public `/api/products` endpoints currently accept anonymous reads but
  rely on RLS to forbid writes outside an admin session.
- **Clients**:
  - `lib/supabase/client.ts` — browser/client components (anon key)
  - `lib/supabase/server.ts` — Server Components, Route Handlers, Server
    Actions, middleware (anon key + cookie session)
  - `lib/supabase/admin.ts` — service-role key, bypasses RLS, **server-only**

## 7. Admin authentication flow

```
User → /admin/login → Supabase signInWithPassword (browser)
                  ↓
                  /api/admin/whoami → checks profiles.role = 'admin'
                  ↓
                  redirect to /admin (or back to ?next=…)
```

`middleware.ts` enforces the same rule on every `/admin/*` and `/api/admin/*`
request: no session → redirect/401, session but not admin → redirect/403.

`isAdmin()` and `getCurrentAdmin()` from `lib/admin/auth.ts` are available to
Server Components / Route Handlers for any extra in-code checks.

## 8. Public shop & checkout

Routes unchanged from the previous setup:

- `/shop`, `/shop/categorie/[slug]`, `/shop/produit/[slug]` — public reads
- `/cart`, `/checkout` — client-side cart, server-side order creation
- `/admin`, `/admin/products`, `/admin/orders`, `/admin/promotions`, etc. — gated

## 9. Mini-site (events) integration — coming later

The `events` and `job_applications` tables, their RLS policies, and the
`cvs` + `event-media` buckets are in place. The actual mini-site wiring,
events admin CRUD, and `/api/jobs/apply` route ship in a follow-up prompt.

## 10. CORS

Supabase serves CORS automatically when the mini-site queries with the anon
key. If we later add custom Next.js routes that the mini-site needs to call
cross-origin, use `lib/cors.ts` (already scaffolded with allowed origins).

## 11. Fallback mode (no Supabase)

If `NEXT_PUBLIC_SUPABASE_URL` is missing, the site keeps booting:

- Reads return seed data from `lib/shop/seed.ts`.
- Admin login shows a clear "Supabase not configured" notice.
- All admin pages return 503 (middleware refuses to grant access).
- Order creation logs to the console instead of persisting.

This is intentional — useful for static previews / Storybook-style dev.
