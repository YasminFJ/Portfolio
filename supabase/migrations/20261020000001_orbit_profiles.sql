-- Esquema de ORBIT: perfil de jugador y progreso guardado.
-- Aplicada al proyecto Supabase "portfolio" (ref jbjincheriznduglwxbv).

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
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

create policy "Cada usuario solo actualiza su propio perfil"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "Cada usuario crea su propio perfil"
  on public.profiles for insert to authenticated
  with check ((select auth.uid()) = id);

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

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Mantiene updated_at al día en cada cambio de perfil.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- La función del trigger no debe poder llamarse vía /rest/v1/rpc.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
