# Codex 1차 명령어: 관리자 MVP 뼈대 구축

Next.js, Supabase를 사용해서 「그 장면 해석 리포트」 관리자용 MVP 웹앱의 기본 뼈대를 만들어줘.

## 앱 목적

이 앱은 고객이 제출한 관계 장면 데이터를 기반으로
인지심리학과 대상관계이론을 결합한 관계장면 리포트를 생성하는 내부 관리자 도구다.

고객용 SaaS가 아니다. 관리자용 MVP다.

이번 1차 버전에서는 다음 기능만 만든다.

## 포함 기능

1. 고객 등록
2. 관계 장면 제출 등록
3. 제출 목록 보기
4. 제출 상세 보기
5. 상태값 관리
6. 리포트 에디터 화면 틀
7. PDF 미리보기 화면 틀

## 제외 기능

- 고객 로그인
- 결제 연동
- 이메일 자동 발송
- 커뮤니티 자동 가입
- 구독 결제
- 복잡한 통계 대시보드

## 기술 스택

- Frontend: Next.js
- DB: Supabase
- Auth: 관리자용 단순 인증 또는 Supabase Auth
- Styling: 기본 Tailwind CSS

## 관리자 화면

화면은 다음 5개로 만든다.

1. 대시보드
2. 제출 목록
3. 제출 상세
4. 리포트 에디터
5. PDF 미리보기

## DB 테이블

테이블은 4개로 시작한다.

### customers

- id
- name
- email
- source_channel
- created_at

### submissions

- id
- customer_id
- relationship_type
- scene_text
- actual_words
- interpretation
- emotion
- reaction
- unsaid_words
- desired_change
- status
- created_at

### analyses

- id
- submission_id
- risk_level
- risk_reason
- scene_code
- cognitive_code
- behavior_code
- pattern_code
- pattern_name
- scene_summary
- facts
- interpretations
- emotion_flow
- hidden_need
- object_relation_note
- community_hook
- recommended_archive_prompt
- growth_direction
- quality_score
- created_at

### reports

- id
- submission_id
- email_subject
- email_body
- pdf_page_1
- pdf_page_2
- pdf_page_3
- pdf_page_4
- pdf_page_5
- pdf_url
- review_status
- created_at

## 상태값

다음 status를 사용한다.

- form_submitted
- risk_hold
- analysis_ready
- ai_analysis_done
- report_draft_ready
- quality_failed
- needs_human_review
- approved
- pdf_generated
- sent
- archived

## 구현 우선순위

1. Supabase 스키마 생성
2. 고객 등록 화면
3. 제출 등록 화면
4. 제출 목록 화면
5. 제출 상세 화면
6. 상태값 변경
7. 리포트 에디터 UI 틀
8. PDF 미리보기 UI 틀

예쁜 UI보다 동작하는 MVP를 우선해라.
