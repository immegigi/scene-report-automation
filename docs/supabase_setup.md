# Supabase 설정 메모

## 1. 프로젝트 생성

Supabase에서 새 프로젝트를 만든 뒤 SQL editor에 `06_supabase_schema.sql` 내용을 실행한다.

생성되는 주요 항목:

- `admin_profiles`
- `customers`
- `submissions`
- `analyses`
- `reports`
- `scene-reports` Storage bucket
- 관리자 전용 RLS 정책

## 2. 관리자 등록

첫 관리자는 Supabase Auth에서 사용자를 만든 뒤, 해당 사용자의 `id`와 이메일을 `admin_profiles`에 넣는다.

```sql
insert into public.admin_profiles (user_id, email, display_name)
values ('AUTH_USER_ID', 'admin@example.com', '운영자');
```

`AUTH_USER_ID`는 Supabase Auth Users 화면에서 확인한다.

## 3. 환경변수

`.env.example`을 복사해 `.env.local`을 만들고 값을 채운다.

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAILS=
OPENAI_API_KEY=
```

주의:

- `NEXT_PUBLIC_` 값은 브라우저에 노출될 수 있다.
- `SUPABASE_SERVICE_ROLE_KEY`와 `OPENAI_API_KEY`는 서버 전용으로만 사용한다.
- 현재 1차 앱은 환경변수가 없으면 샘플 데이터 모드로 실행된다.

## 4. 현재 연결 상태

1차 MVP는 Supabase 연결 준비만 되어 있다.

- 환경변수가 없으면 샘플 데이터로 화면을 확인한다.
- 환경변수가 있으면 다음 단계에서 실제 CRUD와 Auth 연결을 붙인다.

## 5. 다음 구현 순서

1. Supabase Auth 로그인 화면 추가
2. 관리자 이메일 allowlist 확인
3. `customers` / `submissions` 실제 조회 연결
4. 상태 변경 저장 연결
5. AI 결과와 리포트 저장 연결
