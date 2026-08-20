-- Run this file in your Supabase project:
--   Supabase Dashboard -> SQL Editor -> paste and Run.
-- It creates the tables used by the portfolio backend and seeds default data.

-- ============ USERS ============
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password text not null,
  role text not null default 'visitor' check (role in ('admin', 'visitor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ PROJECTS ============
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  technologies text[] not null default '{}',
  github_url text,
  live_url text,
  image text,
  "order" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ MESSAGES ============
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ PROFILES (single row) ============
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Seble Mengistu',
  title text not null default 'Full Stack Developer',
  bio text not null default 'I craft clean, purposeful web experiences using the MERN stack.',
  skills text[] not null default '{"JavaScript","React","Node.js","Express","MongoDB","HTML & CSS","Git","REST APIs"}',
  github text not null default 'https://github.com',
  linkedin text not null default 'https://linkedin.com',
  email text not null default 'seblemen94@gmail.com',
  avatar text not null default '',
  location text not null default 'Addis Ababa, Ethiopia',
  years_experience integer not null default 1,
  telegram text not null default '',
  instagram text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ VISITORS (single row) ============
create table if not exists public.visitors (
  id uuid primary key default gen_random_uuid(),
  count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ EXPERIENCES ============
create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null default '',
  duration text not null default '',
  type text not null default 'Education',
  achievements text not null default '',
  "order" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ SERVICES ============
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'fa-code',
  title text not null,
  description text not null default '',
  details text not null default '',
  "order" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ SEED DEFAULT ROWS ============
insert into public.profiles (id) values (gen_random_uuid()) on conflict do nothing;

insert into public.visitors (id, count) values (gen_random_uuid(), 0) on conflict do nothing;

-- Enable RLS but allow the backend (service role) full access.
alter table public.users enable row level security;
alter table public.projects enable row level security;
alter table public.messages enable row level security;
alter table public.profiles enable row level security;
alter table public.visitors enable row level security;
alter table public.experiences enable row level security;
alter table public.services enable row level security;

-- ============ VIEWS ============
create table if not exists public.views (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null default '',
  created_at timestamptz not null default now()
);

alter table public.views enable row level security;
