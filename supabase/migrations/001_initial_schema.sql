create extension if not exists "pgcrypto";

create type public.profile_role as enum (
  'owner',
  'breeder',
  'ranch_admin',
  'platform_admin'
);

create type public.verification_status as enum (
  'verified',
  'pending',
  'unverified',
  'rejected'
);

create type public.longhorn_sex as enum (
  'Bull',
  'Cow',
  'Steer',
  'Heifer'
);

create type public.listing_status as enum (
  'available',
  'pending',
  'sold'
);

create type public.event_type as enum (
  'Auction',
  'Show',
  'Sale',
  'Clinic'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  role public.profile_role not null default 'owner',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ranches (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  name text not null,
  slug text not null unique,
  location text,
  description text,
  phone text,
  website text,
  verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.longhorns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  registration_number text unique,
  dob date,
  sex public.longhorn_sex not null,
  sire_id uuid references public.longhorns(id) on delete set null,
  dam_id uuid references public.longhorns(id) on delete set null,
  breeder text,
  current_owner text,
  owner_profile_id uuid references public.profiles(id) on delete set null,
  ranch_id uuid references public.ranches(id) on delete set null,
  horn_measurement text,
  color text,
  description text,
  photos text[] not null default '{}',
  documents text[] not null default '{}',
  verification_status public.verification_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sire_and_dam_are_different check (
    sire_id is null or dam_id is null or sire_id <> dam_id
  )
);

create table public.lineage_relationships (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.longhorns(id) on delete cascade,
  parent_id uuid not null references public.longhorns(id) on delete cascade,
  relationship_type text not null check (relationship_type in ('sire', 'dam')),
  verification_status public.verification_status not null default 'pending',
  created_at timestamptz not null default now(),
  unique (child_id, relationship_type)
);

create table public.ownership_history (
  id uuid primary key default gen_random_uuid(),
  longhorn_id uuid not null references public.longhorns(id) on delete cascade,
  owner_name text not null,
  owner_profile_id uuid references public.profiles(id) on delete set null,
  ranch_id uuid references public.ranches(id) on delete set null,
  acquired_on date,
  transferred_on date,
  notes text,
  created_at timestamptz not null default now()
);

create table public.marketplace_listings (
  id uuid primary key default gen_random_uuid(),
  longhorn_id uuid not null references public.longhorns(id) on delete cascade,
  seller_profile_id uuid references public.profiles(id) on delete set null,
  title text not null,
  price text,
  location text,
  status public.listing_status not null default 'available',
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event_date date not null,
  location text,
  type public.event_type not null,
  description text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  longhorn_id uuid references public.longhorns(id) on delete cascade,
  ranch_id uuid references public.ranches(id) on delete cascade,
  uploaded_by uuid references public.profiles(id) on delete set null,
  title text not null,
  storage_path text not null,
  mime_type text,
  verification_status public.verification_status not null default 'pending',
  created_at timestamptz not null default now(),
  constraint document_has_owner check (
    longhorn_id is not null or ranch_id is not null
  )
);

create table public.verification_requests (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references public.profiles(id) on delete set null,
  target_type text not null check (target_type in ('longhorn', 'ranch', 'document')),
  longhorn_id uuid references public.longhorns(id) on delete cascade,
  ranch_id uuid references public.ranches(id) on delete cascade,
  document_id uuid references public.documents(id) on delete cascade,
  status public.verification_status not null default 'pending',
  notes text,
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create index longhorns_search_idx on public.longhorns
using gin (
  to_tsvector(
    'english',
    coalesce(name, '') || ' ' ||
    coalesce(registration_number, '') || ' ' ||
    coalesce(breeder, '') || ' ' ||
    coalesce(current_owner, '')
  )
);

create index longhorns_ranch_idx on public.longhorns(ranch_id);
create index longhorns_sire_idx on public.longhorns(sire_id);
create index longhorns_dam_idx on public.longhorns(dam_id);
create index ranches_slug_idx on public.ranches(slug);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger touch_profiles_updated_at
before update on public.profiles
for each row execute function public.touch_updated_at();

create trigger touch_ranches_updated_at
before update on public.ranches
for each row execute function public.touch_updated_at();

create trigger touch_longhorns_updated_at
before update on public.longhorns
for each row execute function public.touch_updated_at();

create trigger touch_marketplace_listings_updated_at
before update on public.marketplace_listings
for each row execute function public.touch_updated_at();

create trigger touch_events_updated_at
before update on public.events
for each row execute function public.touch_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'New member'),
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.ranches enable row level security;
alter table public.longhorns enable row level security;
alter table public.lineage_relationships enable row level security;
alter table public.ownership_history enable row level security;
alter table public.marketplace_listings enable row level security;
alter table public.events enable row level security;
alter table public.documents enable row level security;
alter table public.verification_requests enable row level security;

create policy "Profiles are readable by authenticated users"
on public.profiles for select
to authenticated
using (true);

create policy "Users update their own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Public ranches are readable"
on public.ranches for select
to anon, authenticated
using (true);

create policy "Ranch owners manage their ranches"
on public.ranches for all
to authenticated
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "Public longhorns are readable"
on public.longhorns for select
to anon, authenticated
using (true);

create policy "Owners create longhorns"
on public.longhorns for insert
to authenticated
with check (owner_profile_id is null or owner_profile_id = auth.uid());

create policy "Owners update their longhorns"
on public.longhorns for update
to authenticated
using (owner_profile_id = auth.uid())
with check (owner_profile_id = auth.uid());

create policy "Public lineage is readable"
on public.lineage_relationships for select
to anon, authenticated
using (true);

create policy "Authenticated users can manage lineage"
on public.lineage_relationships for all
to authenticated
using (true)
with check (true);

create policy "Public ownership history is readable"
on public.ownership_history for select
to anon, authenticated
using (true);

create policy "Authenticated users can manage ownership history"
on public.ownership_history for all
to authenticated
using (true)
with check (true);

create policy "Public listings are readable"
on public.marketplace_listings for select
to anon, authenticated
using (true);

create policy "Sellers manage their listings"
on public.marketplace_listings for all
to authenticated
using (seller_profile_id = auth.uid())
with check (seller_profile_id = auth.uid());

create policy "Public events are readable"
on public.events for select
to anon, authenticated
using (true);

create policy "Authenticated users can create events"
on public.events for insert
to authenticated
with check (created_by = auth.uid());

create policy "Public verified documents are readable"
on public.documents for select
to anon, authenticated
using (verification_status = 'verified' or uploaded_by = auth.uid());

create policy "Authenticated users upload documents"
on public.documents for insert
to authenticated
with check (uploaded_by = auth.uid());

create policy "Requesters read their verification requests"
on public.verification_requests for select
to authenticated
using (requester_id = auth.uid());

create policy "Authenticated users create verification requests"
on public.verification_requests for insert
to authenticated
with check (requester_id = auth.uid());

insert into storage.buckets (id, name, public)
values
  ('longhorn-photos', 'longhorn-photos', true),
  ('longhorn-documents', 'longhorn-documents', false)
on conflict (id) do nothing;

create policy "Public photo reads"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'longhorn-photos');

create policy "Authenticated photo uploads"
on storage.objects for insert
to authenticated
with check (bucket_id = 'longhorn-photos');

create policy "Authenticated document uploads"
on storage.objects for insert
to authenticated
with check (bucket_id = 'longhorn-documents');

create policy "Authenticated document reads"
on storage.objects for select
to authenticated
using (bucket_id = 'longhorn-documents');
