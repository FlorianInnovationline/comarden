-- ============================================================================
-- Comarden - Migration 016: site analytics for comarden-events.be
-- ----------------------------------------------------------------------------
-- Cookieless, privacy-first traffic tracking:
--   - no cookies, no localStorage identifier, no raw IP stored
--   - `visitor_hash` is sha256(ip + user-agent + day + secret), rotated daily,
--     so a visitor cannot be followed across days and the value cannot be
--     reversed to an IP. This is the same approach used by Plausible/Fathom
--     and is not personal data under GDPR when the salt rotates.
--
-- Writes are public (the site is anonymous); reads are admin-only.
-- ============================================================================

begin;

create table if not exists public.site_events (
  id             bigserial primary key,
  site           text        not null default 'comarden-events',
  -- 'pageview' or 'click'
  type           text        not null check (type in ('pageview', 'click')),
  -- normalised path, e.g. /shop/produit/stratogrip-t300-22l
  path           text        not null,
  -- for clicks: what was activated, e.g. 'commander' or 'brand:soprema'
  label          text,
  referrer_host  text,
  device         text        check (device is null or device in ('mobile','tablet','desktop')),
  visitor_hash   text,
  session_id     text,
  created_at     timestamptz not null default now()
);

create index if not exists idx_site_events_created  on public.site_events(created_at desc);
create index if not exists idx_site_events_type_day on public.site_events(type, created_at desc);
create index if not exists idx_site_events_path     on public.site_events(path);

alter table public.site_events enable row level security;

-- Anyone may record an event (the public site is anonymous).
drop policy if exists site_events_insert_public on public.site_events;
create policy site_events_insert_public on public.site_events
  for insert with check (true);

-- Only admins may read the collected data.
drop policy if exists site_events_select_admin on public.site_events;
create policy site_events_select_admin on public.site_events
  for select using (public.is_admin());

-- ===========================================================================
-- Aggregation
-- ---------------------------------------------------------------------------
-- One SECURITY INVOKER function returning the whole dashboard as jsonb, so the
-- admin needs a single round trip. Because it runs as the caller, the RLS
-- policy above still applies: anon gets zeros, the service role sees the data.
-- ===========================================================================

create or replace function public.stats_dashboard(
  p_from timestamptz,
  p_to   timestamptz,
  p_site text default 'comarden-events'
)
returns jsonb
language sql
stable
as $$
  with scoped as (
    select *
    from public.site_events
    where site = p_site
      and created_at >= p_from
      and created_at <  p_to
  ),
  views as (select * from scoped where type = 'pageview'),
  clicks as (select * from scoped where type = 'click')
  select jsonb_build_object(
    'totals', (
      select jsonb_build_object(
        'views',    (select count(*) from views),
        'visitors', (select count(distinct visitor_hash) from views where visitor_hash is not null),
        'sessions', (select count(distinct session_id)  from views where session_id  is not null),
        'clicks',   (select count(*) from clicks)
      )
    ),
    'timeseries', coalesce((
      select jsonb_agg(row_to_json(t))
      from (
        select to_char(date_trunc('day', created_at), 'YYYY-MM-DD') as day,
               count(*)                                             as views,
               count(distinct visitor_hash)                         as visitors
        from views
        group by 1
        order by 1
      ) t
    ), '[]'::jsonb),
    'top_paths', coalesce((
      select jsonb_agg(row_to_json(t))
      from (
        select path,
               count(*)                     as views,
               count(distinct visitor_hash) as visitors
        from views
        group by 1
        order by 2 desc
        limit 20
      ) t
    ), '[]'::jsonb),
    'top_clicks', coalesce((
      select jsonb_agg(row_to_json(t))
      from (
        select coalesce(label, '(sans libellé)') as label,
               count(*)                          as clicks
        from clicks
        group by 1
        order by 2 desc
        limit 20
      ) t
    ), '[]'::jsonb),
    'top_referrers', coalesce((
      select jsonb_agg(row_to_json(t))
      from (
        select referrer_host as host, count(*) as views
        from views
        where referrer_host is not null and referrer_host <> ''
        group by 1
        order by 2 desc
        limit 12
      ) t
    ), '[]'::jsonb),
    'devices', coalesce((
      select jsonb_agg(row_to_json(t))
      from (
        select coalesce(device, 'inconnu') as device, count(*) as views
        from views
        group by 1
        order by 2 desc
      ) t
    ), '[]'::jsonb)
  );
$$;

commit;
