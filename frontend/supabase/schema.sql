-- OAK Foundation Event Attendance Platform
-- Event dates: 9-11 November 2026

create extension if not exists "uuid-ossp";

do $$
begin
  create type user_role as enum ('partner', 'oak_staff', 'coordination_team', 'presenter', 'observer');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type registration_status as enum ('registered', 'cancelled');
exception
  when duplicate_object then null;
end $$;


do $$
begin
  create type attendance_status as enum ('not_checked_in', 'checked_in');
exception
  when duplicate_object then null;
end $$;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  role user_role not null default 'observer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists participants (
  id uuid primary key default uuid_generate_v4(),
  first_name text not null,
  last_name text not null,
  organization text not null,
  sub_partner text,
  role user_role not null,
  email text not null unique,
  phone text,
  dietary_requirements text,
  accessibility_requirements text,
  travel_requirements text,
  accommodation_requirements text,
  registration_id text not null unique,
  registration_date timestamptz not null default now(),
  registration_status registration_status not null default 'registered',
  qr_code_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists attendance (
  id uuid primary key default uuid_generate_v4(),
  participant_id uuid not null unique references participants(id) on delete cascade,
  attendance_status attendance_status not null default 'not_checked_in',
  check_in_time timestamptz,
  check_in_date date,
  checked_in_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists programme_sessions (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  session_date date not null,
  start_time time not null,
  end_time time not null,
  location text,
  presenter_name text,
  presenter_organization text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists partners (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  region text,
  logo_url text,
  tags text[],
  about text,
  website_url text,
  contact_name text,
  contact_email text,
  partner_since integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_participants_role on participants(role);
create index if not exists idx_participants_qr_code on participants(qr_code_id);
create index if not exists idx_attendance_status on attendance(attendance_status);
create index if not exists idx_programme_sessions_date on programme_sessions(session_date);
create index if not exists idx_partners_name on partners(name);

alter table profiles enable row level security;
alter table participants enable row level security;
alter table attendance enable row level security;
alter table programme_sessions enable row level security;
alter table partners enable row level security;

drop policy if exists "profiles can read own profile" on profiles;
drop policy if exists "anyone can register" on participants;
drop policy if exists "coordination can read participants" on participants;
drop policy if exists "coordination can read attendance" on attendance;
drop policy if exists "coordination can manage attendance" on attendance;
drop policy if exists "programme publicly readable" on programme_sessions;
drop policy if exists "partners publicly readable" on partners;

create policy "profiles can read own profile"
on profiles for select to authenticated
using (id = auth.uid());

create policy "anyone can register"
on participants for insert to anon, authenticated
with check (registration_status = 'registered');

create policy "coordination can read participants"
on participants for select to authenticated
using (exists (
  select 1 from profiles
  where profiles.id = auth.uid()
    and profiles.role = 'coordination_team'
));

create policy "coordination can read attendance"
on attendance for select to authenticated
using (exists (
  select 1 from profiles
  where profiles.id = auth.uid()
    and profiles.role = 'coordination_team'
));

create policy "coordination can manage attendance"
on attendance for all to authenticated
using (exists (
  select 1 from profiles
  where profiles.id = auth.uid()
    and profiles.role = 'coordination_team'
))
with check (exists (
  select 1 from profiles
  where profiles.id = auth.uid()
    and profiles.role = 'coordination_team'
));

create policy "programme publicly readable"
on programme_sessions for select to anon, authenticated
using (true);

create policy "partners publicly readable"
on partners for select to anon, authenticated
using (true);
