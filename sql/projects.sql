-- Projects table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  tech_stack jsonb,
  github_url text,
  live_url text,
  cover_image text,
  status text not null check (status in ('draft','published')),
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create index if not exists projects_status_idx on public.projects (status);

create policy "Allow select published to all"
  on public.projects
  for select
  using (status = 'published');

