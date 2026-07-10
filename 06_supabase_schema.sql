-- Supabase schema for 그 장면 해석 리포트 관리자 MVP
-- Apply in Supabase SQL editor.
-- This schema keeps the MVP admin-only and blocks public table access through RLS.

create extension if not exists "uuid-ossp";

create table if not exists admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text,
  created_at timestamptz default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = auth.uid()
  );
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists customers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  source_channel text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists submissions (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references customers(id) on delete cascade,
  relationship_type text,
  scene_text text not null,
  actual_words text,
  interpretation text,
  emotion text,
  reaction text,
  unsaid_words text,
  desired_change text,
  status text default 'form_submitted' check (
    status in (
      'form_submitted',
      'risk_hold',
      'analysis_ready',
      'ai_analysis_done',
      'report_draft_ready',
      'quality_failed',
      'needs_human_review',
      'approved',
      'pdf_generated',
      'sent',
      'archived'
    )
  ),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists analyses (
  id uuid primary key default uuid_generate_v4(),
  submission_id uuid references submissions(id) on delete cascade,
  risk_level text check (risk_level in ('safe', 'caution', 'high')),
  risk_reason text,
  allow_report_generation boolean default true,
  scene_code text,
  cognitive_code text,
  behavior_code text,
  pattern_code text,
  pattern_name text,
  scene_summary text,
  facts jsonb,
  interpretations jsonb,
  emotion_flow jsonb,
  hidden_need text,
  object_relation_note text,
  community_hook text,
  recommended_archive_prompt text,
  growth_direction text,
  quality_score integer,
  raw_ai_outputs jsonb default '{}'::jsonb,
  parse_error text,
  model_name text,
  prompt_version text default 'v1',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists reports (
  id uuid primary key default uuid_generate_v4(),
  submission_id uuid references submissions(id) on delete cascade,
  email_subject text,
  email_body text,
  pdf_page_1 text,
  pdf_page_2 text,
  pdf_page_3 text,
  pdf_page_4 text,
  pdf_page_5 text,
  pdf_url text,
  review_status text default 'draft' check (
    review_status in ('draft', 'needs_human_review', 'approved', 'rewrite')
  ),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_submissions_customer_id on submissions(customer_id);
create index if not exists idx_submissions_status on submissions(status);
create index if not exists idx_analyses_submission_id on analyses(submission_id);
create index if not exists idx_analyses_pattern_code on analyses(pattern_code);
create index if not exists idx_reports_submission_id on reports(submission_id);

drop trigger if exists set_customers_updated_at on customers;
create trigger set_customers_updated_at
before update on customers
for each row execute function public.set_updated_at();

drop trigger if exists set_submissions_updated_at on submissions;
create trigger set_submissions_updated_at
before update on submissions
for each row execute function public.set_updated_at();

drop trigger if exists set_analyses_updated_at on analyses;
create trigger set_analyses_updated_at
before update on analyses
for each row execute function public.set_updated_at();

drop trigger if exists set_reports_updated_at on reports;
create trigger set_reports_updated_at
before update on reports
for each row execute function public.set_updated_at();

alter table admin_profiles enable row level security;
alter table customers enable row level security;
alter table submissions enable row level security;
alter table analyses enable row level security;
alter table reports enable row level security;

drop policy if exists "admins can read admin profiles" on admin_profiles;
create policy "admins can read admin profiles"
on admin_profiles for select
using (public.is_admin());

drop policy if exists "admins can manage customers" on customers;
create policy "admins can manage customers"
on customers for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admins can manage submissions" on submissions;
create policy "admins can manage submissions"
on submissions for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admins can manage analyses" on analyses;
create policy "admins can manage analyses"
on analyses for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admins can manage reports" on reports;
create policy "admins can manage reports"
on reports for all
using (public.is_admin())
with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('scene-reports', 'scene-reports', false)
on conflict (id) do nothing;

drop policy if exists "admins can manage report pdfs" on storage.objects;
create policy "admins can manage report pdfs"
on storage.objects for all
using (bucket_id = 'scene-reports' and public.is_admin())
with check (bucket_id = 'scene-reports' and public.is_admin());
