-- Supabase schema for 그 장면 해석 리포트 관리자 MVP

create extension if not exists "uuid-ossp";

create table if not exists customers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  source_channel text,
  created_at timestamptz default now()
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
  status text default 'form_submitted',
  created_at timestamptz default now()
);

create table if not exists analyses (
  id uuid primary key default uuid_generate_v4(),
  submission_id uuid references submissions(id) on delete cascade,
  risk_level text,
  risk_reason text,
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
  created_at timestamptz default now()
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
  review_status text default 'draft',
  created_at timestamptz default now()
);

create index if not exists idx_submissions_customer_id on submissions(customer_id);
create index if not exists idx_submissions_status on submissions(status);
create index if not exists idx_analyses_submission_id on analyses(submission_id);
create index if not exists idx_analyses_pattern_code on analyses(pattern_code);
create index if not exists idx_reports_submission_id on reports(submission_id);
