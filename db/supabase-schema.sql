-- ============================================================================
-- Comarden — Supabase schema
-- ----------------------------------------------------------------------------
-- Run this file in the Supabase SQL Editor (one-shot).
-- It is idempotent: safe to re-run (uses `if not exists` / `create or replace`).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";  -- gen_random_uuid()

-- ---------------------------------------------------------------------------
-- Shared trigger: keep `updated_at` in sync on every UPDATE
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ===========================================================================
-- 1. profiles  — mirrors auth.users, holds role
-- ===========================================================================
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text unique not null,
  full_name   text,
  role        text not null default 'viewer'
              check (role in ('admin', 'editor', 'viewer')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile row whenever a user signs up in auth.users.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', null)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ===========================================================================
-- 2. is_admin() helper — used by every RLS policy below
-- ===========================================================================
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ===========================================================================
-- 3. Shop tables
-- ===========================================================================
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text unique not null,
  description text,
  image_url   text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists idx_categories_slug on public.categories(slug);

drop trigger if exists trg_categories_updated_at on public.categories;
create trigger trg_categories_updated_at
  before update on public.categories
  for each row execute function public.set_updated_at();

create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text unique not null,
  description  text,
  price_cents  integer not null default 0,
  currency     text not null default 'EUR',
  sku          text,
  stock        integer not null default 0,
  is_active    boolean not null default true,
  category_id  uuid references public.categories(id) on delete set null,
  images       jsonb not null default '[]'::jsonb,
  tags         text[] not null default '{}',
  brand        text,
  specs        text[],
  avantages    text[],
  variants     text[],
  lien_produit text,
  warning      text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists idx_products_category on public.products(category_id);
create index if not exists idx_products_slug     on public.products(slug);
create index if not exists idx_products_active   on public.products(is_active);

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

create table if not exists public.orders (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references auth.users(id) on delete set null,
  customer_name    text not null,
  customer_email   text not null,
  customer_phone   text,
  company          text,
  delivery_address text,
  notes            text,
  status           text not null default 'new'
                   check (status in ('new', 'confirmed', 'shipped', 'completed', 'cancelled')),
  total_cents      integer not null,
  currency         text not null default 'EUR',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index if not exists idx_orders_status     on public.orders(status);
create index if not exists idx_orders_created    on public.orders(created_at);
create index if not exists idx_orders_user       on public.orders(user_id);
create index if not exists idx_orders_email      on public.orders(customer_email);

drop trigger if exists trg_orders_updated_at on public.orders;
create trigger trg_orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

create table if not exists public.order_items (
  id                uuid primary key default gen_random_uuid(),
  order_id          uuid not null references public.orders(id) on delete cascade,
  product_id        uuid references public.products(id) on delete set null,
  product_title     text not null,
  qty               integer not null,
  unit_price_cents  integer not null,
  line_total_cents  integer not null,
  created_at        timestamptz not null default now()
);
create index if not exists idx_order_items_order on public.order_items(order_id);

create table if not exists public.promotions (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  code           text unique,
  description    text,
  discount_type  text not null check (discount_type in ('percent', 'fixed')),
  discount_value integer not null,
  starts_at      timestamptz,
  ends_at        timestamptz,
  active         boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists idx_promotions_code   on public.promotions(code);
create index if not exists idx_promotions_active on public.promotions(active);

drop trigger if exists trg_promotions_updated_at on public.promotions;
create trigger trg_promotions_updated_at
  before update on public.promotions
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- 4. Events (scaffolded — admin UI ships in a later prompt)
-- ===========================================================================
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  date        date,
  date_label  text,
  audience    text,
  location    text,
  horaires    text,
  status      text not null default 'upcoming'
              check (status in ('upcoming', 'past')),
  teaser      text,
  intro       text,
  partners    jsonb not null default '[]'::jsonb,
  media       jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists idx_events_slug   on public.events(slug);
create index if not exists idx_events_status on public.events(status);
create index if not exists idx_events_date   on public.events(date);

drop trigger if exists trg_events_updated_at on public.events;
create trigger trg_events_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- 5. Jobs (postings + applications)
-- ===========================================================================
create table if not exists public.job_postings (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  location    text,
  description text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists idx_job_postings_slug   on public.job_postings(slug);
create index if not exists idx_job_postings_active on public.job_postings(is_active);

drop trigger if exists trg_job_postings_updated_at on public.job_postings;
create trigger trg_job_postings_updated_at
  before update on public.job_postings
  for each row execute function public.set_updated_at();

create table if not exists public.job_applications (
  id                          uuid primary key default gen_random_uuid(),
  job_slug                    text references public.job_postings(slug) on delete set null,
  nom                         text,
  prenom                      text,
  email                       text,
  telephone                   text,
  localite                    text,
  code_postal                 text,
  date_naissance              date,
  poste_actuel                text,
  disponible_a_partir_du      date,
  permis_b                    boolean,
  competences_commerciales    text,
  connaissances_techniques    text,
  experience_comptoir         integer,
  experience_route            integer,
  mot_sur_vous                text,
  cv_url                      text,
  lettre_url                  text,
  consentement_rgpd           boolean not null default false,
  status                      text not null default 'new'
                              check (status in ('new', 'reviewing', 'contacted', 'rejected', 'hired')),
  created_at                  timestamptz not null default now()
);
create index if not exists idx_job_applications_status   on public.job_applications(status);
create index if not exists idx_job_applications_job_slug on public.job_applications(job_slug);
create index if not exists idx_job_applications_created  on public.job_applications(created_at);

-- ===========================================================================
-- 6. Row-Level Security
-- ===========================================================================
alter table public.profiles         enable row level security;
alter table public.categories       enable row level security;
alter table public.products         enable row level security;
alter table public.orders           enable row level security;
alter table public.order_items      enable row level security;
alter table public.promotions       enable row level security;
alter table public.events           enable row level security;
alter table public.job_postings     enable row level security;
alter table public.job_applications enable row level security;

-- -- profiles ---------------------------------------------------------------
drop policy if exists profiles_select_self      on public.profiles;
drop policy if exists profiles_select_admin     on public.profiles;
drop policy if exists profiles_update_self_safe on public.profiles;
drop policy if exists profiles_update_admin     on public.profiles;
drop policy if exists profiles_insert_admin     on public.profiles;

create policy profiles_select_self on public.profiles
  for select using (id = auth.uid());

create policy profiles_select_admin on public.profiles
  for select using (public.is_admin());

-- Users may update their own row but NOT change their role.
create policy profiles_update_self_safe on public.profiles
  for update using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from public.profiles p where p.id = auth.uid()));

create policy profiles_update_admin on public.profiles
  for update using (public.is_admin()) with check (public.is_admin());

create policy profiles_insert_admin on public.profiles
  for insert with check (public.is_admin());

-- -- categories -------------------------------------------------------------
drop policy if exists categories_select_public on public.categories;
drop policy if exists categories_write_admin   on public.categories;

create policy categories_select_public on public.categories
  for select using (true);

create policy categories_write_admin on public.categories
  for all using (public.is_admin()) with check (public.is_admin());

-- -- products ---------------------------------------------------------------
drop policy if exists products_select_public_active on public.products;
drop policy if exists products_select_admin_all     on public.products;
drop policy if exists products_write_admin          on public.products;

create policy products_select_public_active on public.products
  for select using (is_active = true);

create policy products_select_admin_all on public.products
  for select using (public.is_admin());

create policy products_write_admin on public.products
  for all using (public.is_admin()) with check (public.is_admin());

-- -- promotions -------------------------------------------------------------
drop policy if exists promotions_select_public_active on public.promotions;
drop policy if exists promotions_select_admin_all     on public.promotions;
drop policy if exists promotions_write_admin          on public.promotions;

create policy promotions_select_public_active on public.promotions
  for select using (active = true);

create policy promotions_select_admin_all on public.promotions
  for select using (public.is_admin());

create policy promotions_write_admin on public.promotions
  for all using (public.is_admin()) with check (public.is_admin());

-- -- orders -----------------------------------------------------------------
-- Anyone may create an order (including guests/anon, e.g. the checkout form).
-- Owner may read their own (by user_id OR matching email when not logged in).
-- Admins may read/write all.
drop policy if exists orders_insert_public  on public.orders;
drop policy if exists orders_select_owner   on public.orders;
drop policy if exists orders_select_admin   on public.orders;
drop policy if exists orders_write_admin    on public.orders;

create policy orders_insert_public on public.orders
  for insert with check (true);

create policy orders_select_owner on public.orders
  for select using (
    user_id = auth.uid()
    or (auth.jwt() ->> 'email') = customer_email
  );

create policy orders_select_admin on public.orders
  for select using (public.is_admin());

create policy orders_write_admin on public.orders
  for update using (public.is_admin()) with check (public.is_admin());

-- -- order_items ------------------------------------------------------------
drop policy if exists order_items_insert_public on public.order_items;
drop policy if exists order_items_select_owner  on public.order_items;
drop policy if exists order_items_select_admin  on public.order_items;
drop policy if exists order_items_write_admin   on public.order_items;

create policy order_items_insert_public on public.order_items
  for insert with check (true);

create policy order_items_select_owner on public.order_items
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and (o.user_id = auth.uid() or (auth.jwt() ->> 'email') = o.customer_email)
    )
  );

create policy order_items_select_admin on public.order_items
  for select using (public.is_admin());

create policy order_items_write_admin on public.order_items
  for update using (public.is_admin()) with check (public.is_admin());

-- -- events -----------------------------------------------------------------
drop policy if exists events_select_public on public.events;
drop policy if exists events_write_admin   on public.events;

create policy events_select_public on public.events
  for select using (true);

create policy events_write_admin on public.events
  for all using (public.is_admin()) with check (public.is_admin());

-- -- job_postings ----------------------------------------------------------
drop policy if exists job_postings_select_public_active on public.job_postings;
drop policy if exists job_postings_select_admin_all     on public.job_postings;
drop policy if exists job_postings_write_admin          on public.job_postings;

create policy job_postings_select_public_active on public.job_postings
  for select using (is_active = true);

create policy job_postings_select_admin_all on public.job_postings
  for select using (public.is_admin());

create policy job_postings_write_admin on public.job_postings
  for all using (public.is_admin()) with check (public.is_admin());

-- -- job_applications ------------------------------------------------------
-- Public INSERT (anyone can apply, from main site OR events mini-site, no auth).
-- SELECT / UPDATE / DELETE: admins only.
drop policy if exists job_applications_insert_public on public.job_applications;
drop policy if exists job_applications_select_admin on public.job_applications;
drop policy if exists job_applications_update_admin on public.job_applications;
drop policy if exists job_applications_delete_admin on public.job_applications;

create policy job_applications_insert_public on public.job_applications
  for insert with check (true);

create policy job_applications_select_admin on public.job_applications
  for select using (public.is_admin());

create policy job_applications_update_admin on public.job_applications
  for update using (public.is_admin()) with check (public.is_admin());

create policy job_applications_delete_admin on public.job_applications
  for delete using (public.is_admin());

-- ===========================================================================
-- 7. Storage buckets (optional — also creatable from the Dashboard UI)
-- ----------------------------------------------------------------------------
-- Each bucket is created if missing; policies wire up the access rules.
-- ===========================================================================

-- `cvs` — PRIVATE: anyone may upload, only admins may read/delete.
insert into storage.buckets (id, name, public)
  values ('cvs', 'cvs', false)
  on conflict (id) do nothing;

drop policy if exists "cvs_insert_public" on storage.objects;
drop policy if exists "cvs_select_admin"  on storage.objects;
drop policy if exists "cvs_delete_admin"  on storage.objects;

create policy "cvs_insert_public" on storage.objects
  for insert with check (bucket_id = 'cvs');

create policy "cvs_select_admin" on storage.objects
  for select using (bucket_id = 'cvs' and public.is_admin());

create policy "cvs_delete_admin" on storage.objects
  for delete using (bucket_id = 'cvs' and public.is_admin());

-- `event-media` — PUBLIC: anyone reads, only admins write.
insert into storage.buckets (id, name, public)
  values ('event-media', 'event-media', true)
  on conflict (id) do nothing;

drop policy if exists "event_media_select_public" on storage.objects;
drop policy if exists "event_media_write_admin"   on storage.objects;

create policy "event_media_select_public" on storage.objects
  for select using (bucket_id = 'event-media');

create policy "event_media_write_admin" on storage.objects
  for all using (bucket_id = 'event-media' and public.is_admin())
  with check (bucket_id = 'event-media' and public.is_admin());

-- `product-images` — PUBLIC: anyone reads, only admins write.
insert into storage.buckets (id, name, public)
  values ('product-images', 'product-images', true)
  on conflict (id) do nothing;

drop policy if exists "product_images_select_public" on storage.objects;
drop policy if exists "product_images_write_admin"   on storage.objects;

create policy "product_images_select_public" on storage.objects
  for select using (bucket_id = 'product-images');

create policy "product_images_write_admin" on storage.objects
  for all using (bucket_id = 'product-images' and public.is_admin())
  with check (bucket_id = 'product-images' and public.is_admin());

-- ===========================================================================
-- Done. Next steps:
--   1. Sign up the first admin via /admin/login (or Supabase Auth dashboard).
--   2. Promote them:
--        update public.profiles set role = 'admin' where email = 'you@example.com';
-- ===========================================================================
