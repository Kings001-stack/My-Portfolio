create table if not exists public.profile (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text,
  bio text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profile enable row level security;

create policy "Allow select profile to all"
  on public.profile
  for select
  using (true);

