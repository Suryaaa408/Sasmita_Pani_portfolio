create table if not exists public.projects (
  id text primary key,
  title text not null,
  category text not null,
  image text not null,
  alt text not null,
  detail_images text[] not null default '{}',
  writeup text not null,
  tools_used text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

drop policy if exists "Public projects are readable" on public.projects;
create policy "Public projects are readable"
on public.projects
for select
using (true);

insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Project media is publicly readable" on storage.objects;
create policy "Project media is publicly readable"
on storage.objects
for select
using (bucket_id = 'project-media');
