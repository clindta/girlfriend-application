-- ====================================================================
-- Girlfriend Application — Supabase Setup
-- Einmal im Supabase SQL Editor ausführen. Idempotent (kann mehrfach laufen).
-- ====================================================================

-- ====================================================================
-- 1) BEWERBUNGS-TABELLE
-- ====================================================================

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

create index if not exists gf_applications_created_at_idx
  on public.gf_applications (created_at desc);

alter table public.gf_applications enable row level security;

-- Anonyme dürfen INSERTen (Formular abschicken)
drop policy if exists "anon can insert applications" on public.gf_applications;
create policy "anon can insert applications"
  on public.gf_applications
  for insert to anon
  with check (true);

-- Eingeloggte Admins dürfen SELECT (Dashboard ansehen)
drop policy if exists "authenticated can read applications" on public.gf_applications;
create policy "authenticated can read applications"
  on public.gf_applications
  for select to authenticated
  using (true);

-- Eingeloggte Admins dürfen DELETE (Bewerbungen löschen)
drop policy if exists "authenticated can delete applications" on public.gf_applications;
create policy "authenticated can delete applications"
  on public.gf_applications
  for delete to authenticated
  using (true);

-- ====================================================================
-- 2) QUIZ-STEPS TABELLE (editierbar vom Admin-Dashboard)
-- ====================================================================

create table if not exists public.gf_quiz_steps (
  step_key      text          primary key,
  step_type     text          not null check (step_type in ('single','chips','rapid','text','message','contact')),
  sort_order    integer       not null default 0,
  question      jsonb,
  subtitle      jsonb,
  options       jsonb,
  fields        jsonb,
  placeholder   jsonb,
  min_length    integer,
  skipable      boolean       not null default false,
  updated_at    timestamptz   not null default now()
);

create index if not exists gf_quiz_steps_sort_idx
  on public.gf_quiz_steps (sort_order asc);

alter table public.gf_quiz_steps enable row level security;

-- Jeder darf das Quiz lesen (Formular muss die Schritte laden können)
drop policy if exists "anyone can read quiz" on public.gf_quiz_steps;
create policy "anyone can read quiz"
  on public.gf_quiz_steps
  for select to anon, authenticated
  using (true);

-- Nur Eingeloggte dürfen schreiben
drop policy if exists "authenticated can write quiz" on public.gf_quiz_steps;
create policy "authenticated can write quiz"
  on public.gf_quiz_steps
  for all to authenticated
  using (true)
  with check (true);

-- ====================================================================
-- 3) RPC für das Formular: Quiz-Schritte abrufen
-- ====================================================================

create or replace function public.get_gf_quiz_steps()
returns setof public.gf_quiz_steps
language sql
stable
security definer
set search_path = public
as $$
  select * from public.gf_quiz_steps order by sort_order asc, step_key asc;
$$;

grant execute on function public.get_gf_quiz_steps() to anon, authenticated;

-- ====================================================================
-- 4) STORAGE BUCKET für Voice/Video-Nachrichten
-- ====================================================================

insert into storage.buckets (id, name, public)
values ('gf-voice-messages', 'gf-voice-messages', true)
on conflict (id) do nothing;

drop policy if exists "anon can upload voice" on storage.objects;
create policy "anon can upload voice"
  on storage.objects
  for insert to anon
  with check (bucket_id = 'gf-voice-messages');

drop policy if exists "public can read voice" on storage.objects;
create policy "public can read voice"
  on storage.objects
  for select to public
  using (bucket_id = 'gf-voice-messages');

drop policy if exists "authenticated can delete voice" on storage.objects;
create policy "authenticated can delete voice"
  on storage.objects
  for delete to authenticated
  using (bucket_id = 'gf-voice-messages');

-- ====================================================================
-- 5) AUTH-SETUP-HINWEIS
-- ====================================================================
-- Damit du dich im Admin-Dashboard einloggen kannst:
--   1) Supabase Dashboard → Authentication → Users → "Add user" → "Create new user"
--   2) Email + Passwort vergeben. "Auto Confirm User" aktivieren.
--   3) Optional: Authentication → Providers → Email → "Allow new users to sign up" AUS,
--      damit niemand sonst Accounts anlegen kann.
-- ====================================================================

-- Done. Teste mit:
--   select count(*) from public.gf_applications;
--   select count(*) from public.gf_quiz_steps;
