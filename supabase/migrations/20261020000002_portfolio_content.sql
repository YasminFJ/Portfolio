-- Contenido editable del portfolio (Fase 1: solo estructura, sin datos).
-- Lectura pública únicamente de lo marcado como publicado.
-- No hay políticas de escritura: se edita desde el panel de Supabase
-- (o, más adelante, desde un panel privado en el servidor con service_role).

-- Proyectos (también sirven para las fichas individuales vía slug)
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  body text,                          -- contenido largo de la ficha (markdown)
  url text,                           -- web publicada
  repo_url text,
  cover_image text,                   -- ruta dentro del bucket portfolio-media
  tags text[] not null default '{}',
  featured boolean not null default false,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tecnologías / habilidades agrupadas por categoría
create table if not exists public.technologies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (category, name)
);

-- Trayectoria: formación y experiencia profesional
create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  place text not null,
  period text not null,               -- texto visible, ej. "2022 — 2024"
  start_date date,
  end_date date,
  description text,
  tags text[] not null default '{}',
  type text not null check (type in ('formacion', 'trabajo')),
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Textos sueltos editables (hero, sobre mí, contacto...) como clave → JSON
create table if not exists public.site_content (
  key text primary key,
  value jsonb not null,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.technologies enable row level security;
alter table public.experience enable row level security;
alter table public.site_content enable row level security;

create policy "Proyectos publicados visibles para todos"
  on public.projects for select to anon, authenticated using (published);
create policy "Tecnologías publicadas visibles para todos"
  on public.technologies for select to anon, authenticated using (published);
create policy "Experiencia publicada visible para todos"
  on public.experience for select to anon, authenticated using (published);
create policy "Contenido publicado visible para todos"
  on public.site_content for select to anon, authenticated using (published);

create index if not exists projects_published_order_idx on public.projects (published, sort_order);
create index if not exists technologies_published_order_idx on public.technologies (published, category, sort_order);
create index if not exists experience_published_order_idx on public.experience (published, sort_order);

create trigger projects_set_updated_at before update on public.projects
  for each row execute procedure public.set_updated_at();
create trigger technologies_set_updated_at before update on public.technologies
  for each row execute procedure public.set_updated_at();
create trigger experience_set_updated_at before update on public.experience
  for each row execute procedure public.set_updated_at();
create trigger site_content_set_updated_at before update on public.site_content
  for each row execute procedure public.set_updated_at();

-- Bucket público para imágenes del portfolio (solo lectura pública;
-- las subidas se hacen desde el panel de Supabase).
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;
