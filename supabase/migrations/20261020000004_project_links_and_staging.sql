-- Project websites as a list (e.g. Díaz y Asociados has a USA and a LATAM site)
-- and a distinct "staging" status. Additive; no data removed.
alter table public.projects
  add column if not exists links jsonb not null default '[]'::jsonb;

comment on column public.projects.links is
  'Public websites: [{label, url, status?, note?}]. Each renders a "Visit …" button. Never list unauthorised staging URLs.';

alter table public.projects drop constraint if exists projects_status_check;
alter table public.projects add constraint projects_status_check
  check (status in ('live', 'in_development', 'staging', 'in_review', 'proposal', 'personal'));
