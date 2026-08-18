-- Esquema de ORBIT: perfil de jugador y progreso guardado.
-- Ejecutar en Supabase: Project → SQL Editor → New query → pegar y ejecutar.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null,
  xp integer not null default 0,
  discovered_planets text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Row Level Security: cada persona solo puede leer y modificar su propia fila.
alter table public.profiles enable row level security;

create policy "Los perfiles son visibles para su dueño"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Cada usuario solo actualiza su propio perfil"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Cada usuario crea su propio perfil"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Crea automáticamente una fila de perfil cuando alguien se registra.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Mantiene updated_at al día en cada cambio de perfil.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();
