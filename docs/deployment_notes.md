# 배포 기준 메모

## 기준 주소

- GitHub Pages 허브: https://immegigi.github.io/scene-report-automation/
- GitHub 저장소: https://github.com/immegigi/scene-report-automation

## 주소 역할

GitHub Pages 주소는 프로젝트 문서, 개발계획, 이슈 흐름을 보여주는 허브로 사용한다.

실제 관리자 MVP 앱은 GitHub Pages에 직접 올리는 방식보다 Vercel 또는 유사한 서버 실행 환경에 배포하는 편이 적절하다.

이유:

- OpenAI API 키를 브라우저에 노출하면 안 된다.
- Supabase Auth와 관리자 권한 검증이 필요하다.
- PDF 생성은 Playwright/Puppeteer 같은 서버 런타임 의존성이 있다.
- Supabase Storage 업로드와 signed URL 처리가 필요하다.

## 권장 배포 구조

1. GitHub Pages
   - 문서 허브
   - 개발계획 공유
   - Codex 투입 명령어 보관
   - 이슈/작업 링크 안내

2. Vercel 또는 서버 실행 환경
   - Next.js 관리자 MVP 실행
   - OpenAI API route/server action 실행
   - 관리자 인증
   - PDF 생성
   - Supabase 연동

3. Supabase
   - 고객/제출/분석/리포트 데이터 저장
   - 관리자 인증
   - PDF Storage
   - RLS 정책

## 다음 진행 순서

1. 현재 GitHub Pages 주소를 프로젝트 허브로 고정한다.
2. Issue 1부터 Supabase 스키마와 보안 정책을 정리한다.
3. Issue 2~5 순서로 관리자 MVP를 구현한다.
4. 개발 앱이 준비되면 별도 앱 URL을 README와 Pages 허브에 추가한다.
5. GitHub Pages에는 최종 앱 링크와 운영 문서만 노출한다.
