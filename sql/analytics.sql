-- Analytics table
create table if not exists public.analytics (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  action text not null,
  created_at timestamptz not null default now()
);

alter table public.analytics enable row level security;

create index if not exists analytics_page_idx on public.analytics (page);
create index if not exists analytics_action_idx on public.analytics (action);

