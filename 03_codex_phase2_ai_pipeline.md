# Codex 2차 명령어: AI 파이프라인 구축

기존 Next.js + Supabase 관리자 MVP에 OpenAI API 기반 AI 파이프라인을 추가해줘.

## 목표

고객이 제출한 관계 장면을 기반으로 다음 단계를 실행한다.

1. 위험 신호 판별
2. 장면 구조화
3. 관계 인지 루프 분석
4. S-C-B 코드 생성
5. 리포트 초안 생성
6. 품질 점검

각 단계는 별도의 API route 또는 server action으로 구현한다.
한 번에 모든 것을 처리하지 말고 단계별 버튼으로 실행 가능하게 만든다.

---

## 핵심 분석 모델

관계 장면은 다음의 관계 인지 루프로 분석한다.

자극 → 주의 → 해석 → 감정 → 반응

예시:

상대의 답장이 늦어짐
→ 답장 시간과 말투에 주의가 고정됨
→ 나에게 식은 것 같다고 해석함
→ 불안, 서운함, 초조함이 올라옴
→ 확인하고 싶지만 참거나 장문을 쓰고 싶어짐

---

## 대상관계 해석 반영

리포트에는 대상관계적 해석도 포함한다.

해석 관점:

- 고객은 이 장면에서 상대를 어떤 사람으로 경험했는가?
- 고객은 이 장면에서 자신을 어떤 사람으로 느꼈는가?
- 관계가 안전하게 느껴졌는가, 사라질 것처럼 느껴졌는가?
- 따뜻한 상대와 차가운 상대 사이에서 마음이 오갔는가?
- 고객은 사실 무엇을 확인받고 싶었는가?

단, 고객-facing 문장에서는 대상관계이론 용어를 과하게 쓰지 말고 쉬운 관계 경험 언어로 풀어라.

---

## S-C-B 코드 체계

S는 관계 장면 코드다.

- S01 답장 지연
- S02 말투 변화
- S03 침묵/읽씹
- S04 표현 부족
- S05 약속 회피
- S06 갈등 회피
- S07 잠수 합리화
- S08 비교/질투
- S09 반복 수습
- S10 이별 예감

C는 인지 필터 코드다.

- C01 거절예측
- C02 가치판정
- C03 온도탐지
- C04 의미확대
- C05 자기비난
- C06 과잉책임
- C07 희망합리화
- C08 증거수집

B는 행동 반응 코드다.

- B01 확인요구
- B02 장문설명
- B03 침묵
- B04 쿨한척
- B05 선제거리두기
- B06 수습노동
- B07 흔적추적
- B08 자기검열

분석 결과는 S-C-B 코드로 저장한다.

예시:

S01-C02-B01
답장 지연 × 가치판정 × 확인요구

---

## AI 단계별 출력

### Step 1. 위험 신호 판별

감지 항목:

- 자해/자살 암시
- 신체 폭력
- 협박
- 스토킹
- 성폭력
- 미성년자 위험
- 불법 요청
- 상대 조종/복수 요청
- 심각한 위기 표현

출력 JSON:

```json
{
  "risk_level": "safe | caution | high",
  "risk_reason": "...",
  "allow_report_generation": true
}
```

위험 신호가 있으면 status를 risk_hold로 바꾸고 리포트 생성을 막아라.

---

### Step 2. 장면 구조화

출력 JSON:

```json
{
  "scene_summary": "...",
  "facts": ["..."],
  "interpretations": ["..."],
  "emotions": ["..."],
  "reaction": "...",
  "unsaid_words": "...",
  "hidden_need": "...",
  "relationship_context": "..."
}
```

---

### Step 3. 인지 루프 분석

출력 JSON:

```json
{
  "stimulus": "...",
  "attention": "...",
  "interpretation": "...",
  "emotion": "...",
  "response": "...",
  "cognitive_filter": "...",
  "object_relation_note": "..."
}
```

---

### Step 4. S-C-B 코드 생성

출력 JSON:

```json
{
  "scene_code": "S01",
  "cognitive_code": "C02",
  "behavior_code": "B01",
  "pattern_code": "S01-C02-B01",
  "pattern_name": "답장 가치판정형",
  "growth_direction": "..."
}
```

---

### Step 5. 리포트 생성

출력 JSON:

```json
{
  "email_subject": "...",
  "email_body": "...",
  "pdf_page_1": "...",
  "pdf_page_2": "...",
  "pdf_page_3": "...",
  "pdf_page_4": "...",
  "pdf_page_5": "..."
}
```

---

### Step 6. 품질 점검

출력 JSON:

```json
{
  "quality_score": 92,
  "failed_checks": [],
  "rewrite_instructions": [],
  "approval_recommendation": "needs_human_review | approved | rewrite"
}
```

## 구현 요구

- 각 단계 버튼을 제출 상세 화면에 추가한다.
- 실행 결과를 analyses 또는 reports 테이블에 저장한다.
- 각 단계 실행 중 로딩 상태를 표시한다.
- 오류 발생 시 관리자에게 오류 메시지를 보여준다.
- AI 결과 JSON 파싱 실패 시 재시도 또는 원문 확인 기능을 둔다.
