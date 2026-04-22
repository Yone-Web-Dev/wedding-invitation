-- Wedding invite: wishes + RSVPs (no login)
-- Run this in Supabase > SQL Editor.

create extension if not exists pgcrypto;

-- =========================
-- Tables
-- =========================

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 0),
  message text not null check (char_length(trim(message)) > 0),
  created_at timestamptz not null default now()
);

create index if not exists wishes_created_at_idx on public.wishes (created_at desc);

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 0),
  phone text not null check (char_length(trim(phone)) > 0),
  attending boolean not null,
  guest_count integer not null default 0 check (guest_count >= 0),
  created_at timestamptz not null default now()
);

create index if not exists rsvps_created_at_idx on public.rsvps (created_at desc);

-- =========================
-- Realtime (for wishes wall)
-- =========================

alter publication supabase_realtime add table public.wishes;

-- =========================
-- Row Level Security (RLS)
-- =========================

alter table public.wishes enable row level security;
alter table public.rsvps enable row level security;

-- Wishes: anyone can read + insert (no updates/deletes)
drop policy if exists "wishes_select_public" on public.wishes;
create policy "wishes_select_public"
on public.wishes
for select
to anon, authenticated
using (true);

drop policy if exists "wishes_insert_public" on public.wishes;
create policy "wishes_insert_public"
on public.wishes
for insert
to anon, authenticated
with check (true);

-- RSVPs: anyone can insert (no reads/updates/deletes)
drop policy if exists "rsvps_insert_public" on public.rsvps;
create policy "rsvps_insert_public"
on public.rsvps
for insert
to anon, authenticated
with check (true);

