-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 0. PROFILES (Users public data)
-- Note: Supabase handles auth in auth.users. This table links to it.
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  avatar_url text,
  role text default 'user', -- 'admin', 'editor', 'user'
  updated_at timestamptz,
  created_at timestamptz default now()
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Policy: Public profiles are viewable by everyone
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

-- Policy: Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on signup
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();



-- 1. BLOG POSTS (Actualités)
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  image_url text,
  category text,
  author text default 'Horeb Group',
  is_published boolean default true,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Enable RLS for posts
alter table public.posts enable row level security;

-- Policy: Everyone can read published posts
create policy "Public posts are viewable by everyone"
  on public.posts for select
  using ( is_published = true );

-- Policy: Only authenticated users (admins) can insert/update/delete
-- Note: You will need to setup Auth later for admin management
create policy "Admins can manage posts"
  on public.posts for all
  using ( auth.role() = 'authenticated' );


-- 2. CONTACTS (Messages de contact)
create table public.contacts (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status text default 'new', -- new, read, archived
  created_at timestamptz default now()
);

-- Enable RLS for contacts
alter table public.contacts enable row level security;

-- Policy: Anyone (anon) can insert a new contact message
create policy "Anyone can submit a contact form"
  on public.contacts for insert
  with check ( true );

-- Policy: Only admins can view messages
create policy "Admins can view contact messages"
  on public.contacts for select
  using ( auth.role() = 'authenticated' );


-- 3. QUOTE REQUESTS (Demandes de devis)
create table public.quote_requests (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text not null,
  company text,
  service_category text not null, -- BTP, Services Généraux, etc.
  project_details text not null,
  budget_range text,
  status text default 'pending', -- pending, processing, completed
  created_at timestamptz default now()
);

-- Enable RLS for quote requests
alter table public.quote_requests enable row level security;

-- Policy: Anyone (anon) can submit a quote request
create policy "Anyone can submit a quote request"
  on public.quote_requests for insert
  with check ( true );

-- Policy: Only admins can view quote requests
create policy "Admins can view quote requests"
  on public.quote_requests for select
  using ( auth.role() = 'authenticated' );


-- 4. PROJECTS / REALISATIONS (Nos Réalisations)
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  description text,
  image_url text,
  service_category text not null, -- BTP, Import-Export, Services Généraux, Electricité-Info
  client_name text,
  completion_date date,
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- Enable RLS for projects
alter table public.projects enable row level security;

-- Policy: Everyone can view projects
create policy "Public projects are viewable by everyone"
  on public.projects for select
  using ( true );

-- Policy: Only admins can manage projects
create policy "Admins can manage projects"
  on public.projects for all
  using ( auth.role() = 'authenticated' );


-- STORAGE BUCKETS (Optional but recommended for blog images)
-- insert into storage.buckets (id, name, public) values ('blog-images', 'blog-images', true);
-- create policy "Public Access" on storage.objects for select using ( bucket_id = 'blog-images' );
-- create policy "Admin Upload" on storage.objects for insert using ( bucket_id = 'blog-images' and auth.role() = 'authenticated' );
