-- ====================================================================
-- Girlfriend Application — Supabase Setup
-- Einmal im Supabase SQL Editor ausführen.
-- ====================================================================

-- 1) TABELLE
create table if not exists public.gf_applications (
  id                    uuid          primary key default gen_random_uuid(),
  created_at            timestamptz   not null default now(),
  name                  text          not null,
  kontakt               text          not null,
  typ                   text,
  adjektive             text[],
  sonntag               text,
  rapid_lieblingswort   text,
  rapid_ohrwurm         text,
  rapid_bag             text,
  greenflags            text,
  interesse             text,
  love_lang             text,
  happy                 text,
  happy_text            text,
  date_wahl             text,
  date_text             text,
  comms                 text,
  universe              text,
  rueckfrage            text,
  message_type          text,
  message_text          text,
  message_url           text,
  message_duration_sec  integer,
  user_agent            text,
  referrer_url          text
);

-- Index für schnelles Sortieren im Dashboard
create index if not exists gf_applications_created_at_idx
  on public.gf_applications (created_at desc);

-- ====================================================================
-- 2) ROW LEVEL SECURITY
-- ====================================================================

alter table public.gf_applications enable row level security;

-- Anonyme Nutzer dürfen INSERTen (Formular abschicken), aber NICHT lesen.
-- Nur du im Dashboard (service_role) siehst die Einträge.
drop policy if exists "anyone can insert applications" on public.gf_applications;
create policy "anyone can insert applications"
  on public.gf_applications
  for insert
  to anon
  with check (true);

-- ====================================================================
-- 3) STORAGE BUCKET für Voice/Video
-- ====================================================================

insert into storage.buckets (id, name, public)
values ('gf-voice-messages', 'gf-voice-messages', true)
on conflict (id) do nothing;

-- Anon darf hochladen
drop policy if exists "anon can upload voice" on storage.objects;
create policy "anon can upload voice"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'gf-voice-messages');

-- Public lesen (damit du den Link in der DB-Zeile öffnen kannst)
drop policy if exists "public can read voice" on storage.objects;
create policy "public can read voice"
  on storage.objects
  for select
  to public
  using (bucket_id = 'gf-voice-messages');

-- ====================================================================
-- Done. Teste mit dem Formular — du solltest hier Zeilen sehen:
--   select * from public.gf_applications order by created_at desc;
-- ====================================================================
