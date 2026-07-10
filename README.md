# 그 장면 해석 리포트 자동화 구축 소스팩 v1

Codex 투입용 프로젝트 소스팩입니다.  
목표는 고객용 SaaS가 아니라, 운영자가 관계 장면 리포트를 생성하고 검토하는 관리자용 내부 MVP를 만드는 것입니다.

## 프로젝트 주소

- GitHub Pages 허브: https://immegigi.github.io/scene-report-automation/
- GitHub 저장소: https://github.com/immegigi/scene-report-automation

GitHub Pages 주소는 프로젝트 문서와 진행 허브로 사용합니다.  
실제 관리자 MVP는 OpenAI API, Supabase Auth, Supabase Storage가 필요하므로 Vercel 같은 서버 실행 환경 배포를 기본 방향으로 둡니다.

## 프로젝트 목적

「그 장면 해석 리포트」는 고객이 제출한 관계 장면 하나를 바탕으로,
인지심리학과 대상관계이론을 결합해 관계 인지 루프와 S-C-B 패턴 코드를 분석하고,
5페이지 PDF 리포트와 이메일 본문을 생성하는 관리자용 자동화 시스템입니다.

## 핵심 고객 경험

> “내가 왜 그 장면에서 그렇게 흔들렸는지 정확히 읽혔다.”

## 자동화의 진짜 목적

1. 고객의 관계 장면을 구조화한다.
2. 고객의 해석 패턴을 S-C-B 코드로 데이터화한다.
3. 개인화된 리포트 품질을 일정하게 재현한다.
4. 「관계 장면 아카이브」로 이어질 기록 욕구를 만든다.

## 포함 파일

- `01_project_sourcepack.md` : 프로젝트 전체 소스팩
- `02_codex_phase1_admin_mvp.md` : Codex 1차 명령어
- `03_codex_phase2_ai_pipeline.md` : Codex 2차 명령어
- `04_codex_phase3_pdf_report.md` : Codex 3차 명령어
- `05_ai_prompts.md` : AI 프롬프트 6종
- `06_supabase_schema.sql` : Supabase DB 스키마
- `07_report_template.md` : 5페이지 리포트 템플릿
- `08_sample_customer_inputs.json` : 테스트용 고객 입력 3개
- `09_quality_checklist.md` : 리포트 품질 체크리스트
- `10_new_chat_command.md` : 새 채팅 시작 명령어

## Codex 적용 순서

1. `02_codex_phase1_admin_mvp.md`
2. `03_codex_phase2_ai_pipeline.md`
3. `04_codex_phase3_pdf_report.md`
4. `05_ai_prompts.md`
5. `06_supabase_schema.sql`
6. `07_report_template.md`

## 로컬 실행

```bash
pnpm install
pnpm dev
```

기본 주소:

```text
http://localhost:3000
```

현재 1차 MVP에는 고객/제출 목록, 제출 상세, 단계별 AI 파이프라인 버튼, 리포트 에디터, PDF 미리보기 화면이 포함되어 있습니다. 샘플 데이터로 전체 흐름을 먼저 확인할 수 있습니다.

## 검토 및 실행 보조 문서

- `11_codex_development_plan_review.md` : Codex 명령어 확인 및 개발계획 검토보고서
- `docs/codex_final_command.md` : 새 Codex 작업에 붙여 넣을 최종 압축 명령어
- `docs/deployment_notes.md` : GitHub Pages와 실제 앱 배포 기준
- `docs/github_issues.md` : GitHub Issue 등록안
- `.github/ISSUE_TEMPLATE/development_task.md` : 개발 작업 이슈 템플릿

## 개발 착수 전 확인할 것

- 관리자 인증은 Supabase Auth로 확정
- 위험 신호 `safe / caution / high` 후속 처리 확정
- AI 원문 응답과 JSON 파싱 오류 저장 필드 추가
- PDF 생성 성공 시에만 상태값 변경
- Supabase RLS와 PDF Storage 접근 정책 검토
