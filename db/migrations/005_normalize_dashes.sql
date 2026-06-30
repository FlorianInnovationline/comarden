-- ============================================================================
-- Comarden - Migration 005: normalize fancy dashes in existing rows
-- ----------------------------------------------------------------------------
-- Replaces em dash (—), en dash (–) and Unicode minus (−) with a plain
-- hyphen (-) across products + categories (scalar text AND array columns).
-- Idempotent: safe to re-run. Run AFTER 004 so the SOPREMA rows are covered too.
-- translate(str, '—–−', '---') maps each of the 3 dash chars to '-'.
-- ============================================================================

begin;

-- Products: scalar text fields (translate() returns NULL for NULL input).
update public.products set
  title        = translate(title,        '—–−', '---'),
  description  = translate(description,   '—–−', '---'),
  lien_produit = translate(lien_produit,  '—–−', '---'),
  warning      = translate(warning,       '—–−', '---');

-- Products: array columns (preserve element order; keep original if empty/null).
update public.products set
  tags = coalesce(
    (select array_agg(translate(t, '—–−', '---') order by ord)
       from unnest(tags) with ordinality as u(t, ord)), tags),
  specs = coalesce(
    (select array_agg(translate(t, '—–−', '---') order by ord)
       from unnest(specs) with ordinality as u(t, ord)), specs),
  avantages = coalesce(
    (select array_agg(translate(t, '—–−', '---') order by ord)
       from unnest(avantages) with ordinality as u(t, ord)), avantages),
  variants = coalesce(
    (select array_agg(translate(t, '—–−', '---') order by ord)
       from unnest(variants) with ordinality as u(t, ord)), variants);

-- Categories
update public.categories set
  name        = translate(name,        '—–−', '---'),
  description = translate(description,  '—–−', '---');

commit;

-- ===========================================================================
-- Verification — expect 0 rows still containing a fancy dash
-- ===========================================================================
select count(*) as products_with_fancy_dash
from public.products
where title ~ '[—–−]' or description ~ '[—–−]'
   or array_to_string(coalesce(specs,'{}'), '|')     ~ '[—–−]'
   or array_to_string(coalesce(avantages,'{}'), '|') ~ '[—–−]'
   or array_to_string(coalesce(variants,'{}'), '|')  ~ '[—–−]'
   or array_to_string(coalesce(tags,'{}'), '|')      ~ '[—–−]';

select count(*) as categories_with_fancy_dash
from public.categories
where name ~ '[—–−]' or description ~ '[—–−]';
