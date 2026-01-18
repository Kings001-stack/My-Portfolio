-- Messages table
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'unread' check (status in ('unread','read')),
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

create index if not exists messages_status_idx on public.messages (status);

