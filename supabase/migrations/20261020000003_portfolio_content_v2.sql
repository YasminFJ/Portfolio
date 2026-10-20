-- Portfolio content v2: fields needed by the redesigned site and project case studies.
-- Additive only: no data is deleted. Public read stays limited to published rows;
-- there are still no write policies (editing happens in the Supabase dashboard
-- or, later, server-side with a secret key that never reaches the browser).

-- ------------------------------------------------------------------ projects
alter table public.projects
  add column if not exists sector text,
  add column if not exists status text not null default 'in_development'
    check (status in ('live', 'in_development', 'in_review', 'proposal', 'personal')),
  add column if not exists status_note text,
  add column if not exists role text,
  add column if not exists tier text not null default 'main'
    check (tier in ('featured', 'main', 'secondary')),
  add column if not exists stack text[] not null default '{}',
  add column if not exists context text,
  add column if not exists problem text,
  add column if not exists solution text,
  add column if not exists architecture text[] not null default '{}',
  add column if not exists integrations text[] not null default '{}',
  add column if not exists highlights text[] not null default '{}',
  add column if not exists verification text[] not null default '{}',
  add column if not exists internal_link text,
  add column if not exists cover_alt text;

comment on column public.projects.tags is 'Short tags shown on project cards';
comment on column public.projects.url is 'Public URL. Only set when the work is live and attributable.';
comment on column public.projects.published is 'Only published rows are readable through the public API';

-- -------------------------------------------------------------- project_media
create table if not exists public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  path text not null,               -- /public path or Supabase Storage public URL
  alt text not null,
  caption text,
  kind text not null default 'gallery' check (kind in ('cover', 'gallery')),
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.project_media enable row level security;

create policy "Media publicada de proyectos publicados"
  on public.project_media for select to anon, authenticated
  using (
    published
    and exists (select 1 from public.projects p where p.id = project_id and p.published)
  );

create index if not exists project_media_project_idx on public.project_media (project_id, sort_order);

create trigger project_media_set_updated_at before update on public.project_media
  for each row execute procedure public.set_updated_at();

-- ------------------------------------------------------------- technologies
alter table public.technologies
  add column if not exists icon text,
  add column if not exists category_order integer not null default 0;

-- --------------------------------------------------------------- experience
alter table public.experience
  add column if not exists kind text not null default 'work'
    check (kind in ('education', 'work', 'freelance')),
  add column if not exists bullets jsonb,
  add column if not exists icon text,
  add column if not exists pending_confirmation boolean not null default false;

-- ------------------------------------------------------------- site_content
-- Prepare for a second language: one row per (key, locale).
alter table public.site_content add column if not exists locale text not null default 'en';
alter table public.site_content drop constraint if exists site_content_pkey;
alter table public.site_content add primary key (key, locale);
