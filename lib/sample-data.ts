import type { Analysis, Customer, Report, Submission } from "./types";

export const customers: Customer[] = [
  {
    id: "customer-01",
    name: "샘플A",
    email: "sample-a@example.com",
    sourceChannel: "인스타그램",
    createdAt: "2026-07-10"
  },
  {
    id: "customer-02",
    name: "샘플B",
    email: "sample-b@example.com",
    sourceChannel: "뉴스레터",
    createdAt: "2026-07-10"
  },
  {
    id: "customer-03",
    name: "샘플C",
    email: "sample-c@example.com",
    sourceChannel: "기존 고객",
    createdAt: "2026-07-10"
  }
];

export const submissions: Submission[] = [
  {
    id: "submission-01",
    customerId: "customer-01",
    relationshipType: "썸/연애 초반",
    sceneText:
      "상대가 평소보다 답장이 늦고 답장도 짧아졌다. 전에는 이모티콘도 많았는데 오늘은 '응 알겠어' 정도로 끝났다.",
    actualWords: "응 알겠어. 나중에 얘기하자.",
    interpretation: "나한테 식은 것 같다. 내가 귀찮아진 것 같다.",
    emotion: "불안, 서운함, 초조함",
    reaction: "계속 카톡을 확인했고 장문을 쓰고 싶었지만 참았다.",
    unsaidWords: "나 이제 별로야?",
    desiredChange: "매달리지 않으면서 내 마음을 말하고 싶다.",
    status: "report_draft_ready",
    createdAt: "2026-07-10"
  },
  {
    id: "submission-02",
    customerId: "customer-02",
    relationshipType: "연애 관계",
    sceneText:
      "서운한 일이 있었는데 말하면 분위기가 안 좋아질까 봐 괜찮다고 했다. 그런데 집에 와서 계속 생각나고 눈물이 났다.",
    actualWords: "괜찮아. 별일 아니야.",
    interpretation: "내가 말하면 상대가 나를 피곤한 사람으로 볼 것 같다.",
    emotion: "서운함, 외로움, 억울함",
    reaction: "괜찮은 척하고 혼자 울었다.",
    unsaidWords: "사실 그 말이 나한테는 꽤 아팠어.",
    desiredChange: "서운함을 공격처럼 말하지 않고 차분하게 말하고 싶다.",
    status: "analysis_ready",
    createdAt: "2026-07-10"
  },
  {
    id: "submission-03",
    customerId: "customer-03",
    relationshipType: "장기 연애",
    sceneText:
      "다툼이 생기면 항상 내가 먼저 풀려고 한다. 상대는 말이 없고 나는 계속 설명하고 분위기를 수습한다.",
    actualWords: "상대는 '지금 말하기 싫어'라고 했고, 나는 계속 미안하다고 했다.",
    interpretation: "내가 먼저 풀지 않으면 이 관계가 끝날 것 같다.",
    emotion: "불안, 책임감, 지침",
    reaction: "계속 사과하고 설명하며 상대 기분을 살폈다.",
    unsaidWords: "나도 힘들고, 나만 수습하는 것 같아.",
    desiredChange: "관계 문제를 혼자 책임지지 않고 싶다.",
    status: "form_submitted",
    createdAt: "2026-07-10"
  }
];

export const analyses: Record<string, Analysis> = {
  "submission-01": {
    submissionId: "submission-01",
    riskLevel: "safe",
    riskReason: "자해, 폭력, 협박, 스토킹 등 고위험 신호가 감지되지 않았습니다.",
    sceneCode: "S01",
    cognitiveCode: "C03",
    behaviorCode: "B01",
    patternCode: "S01-C03-B01",
    patternName: "답장 온도탐지형",
    sceneSummary:
      "상대의 답장 속도와 말투 변화가 관계의 온도 변화처럼 느껴진 장면입니다.",
    facts: ["답장이 평소보다 늦었습니다.", "답장 문장이 짧아졌습니다."],
    interpretations: ["상대가 식은 것 같다고 해석했습니다.", "내가 귀찮아진 것 같다고 느꼈습니다."],
    emotionFlow: ["불안", "서운함", "초조함"],
    hiddenNeed: "상대 마음 안에서 내가 사라지지 않았다는 감각을 확인받고 싶은 마음",
    objectRelationNote:
      "따뜻하게 반응하던 상대가 갑자기 멀어진 사람처럼 경험되며 관계의 안전감이 흔들렸을 수 있습니다.",
    communityHook:
      "비슷한 장면은 흘려보내지 말고 모아보는 편이 좋습니다.",
    recommendedArchivePrompt: "답장 시간과 말투가 마음에 크게 남았던 다음 장면을 기록해보세요.",
    growthDirection:
      "상대 마음을 맞히기보다, 내 마음이 어떤 속도로 해석을 시작하는지 먼저 확인합니다.",
    qualityScore: 92
  }
};

export const reports: Record<string, Report> = {
  "submission-01": {
    submissionId: "submission-01",
    emailSubject: "[날빛코칭] 그 장면 해석 리포트가 도착했습니다",
    emailBody:
      "상대의 답장이 늦고 짧아졌던 장면에서 마음이 빠르게 불안 쪽으로 움직였습니다. 이번 리포트는 상대 마음을 맞히는 글이 아니라, 그 장면을 내 마음이 어떻게 해석했는지 살펴보는 기록입니다.",
    pdfPage1:
      "당신이 흔들린 건 단순히 답장이 늦어졌기 때문만은 아닙니다. 그 장면에서 마음은 '상대가 식은 것 같다'는 해석 쪽으로 빠르게 움직였습니다.",
    pdfPage2:
      "자극: 답장 지연과 짧아진 말투\n주의: 답장 시간과 문장 길이에 고정됨\n해석: 내가 귀찮아진 것 같음\n감정: 불안, 서운함, 초조함\n반응: 확인하고 싶지만 참음",
    pdfPage3:
      "패턴 코드: S01-C03-B01\n패턴명: 답장 온도탐지형\n상대의 짧은 반응이 관계 전체의 온도처럼 느껴질 때, 마음은 안전한 관계인지 빠르게 확인하려고 합니다.",
    pdfPage4:
      "바로 보내지 않는 편이 좋은 말: 나 이제 별로야?\n부드러운 요청 문장: 오늘 답장이 조금 짧게 느껴져서 내가 혼자 불안해졌어.\n명확한 확인 문장: 지금 대화할 여유가 있는지 알려주면 좋겠어.\n경계 문장: 답이 늦을 수는 있지만, 계속 애매하게 느껴지면 나도 내 마음을 지키고 싶어.",
    pdfPage5:
      "오늘의 장면:\n실제로 일어난 일:\n내가 붙인 해석:\n감정:\n반응:\n하고 싶었지만 못 한 말:\n다음에 바꿔볼 문장:\n\n이번 리포트는 끝이 아니라 첫 번째 관계 장면 기록입니다. 비슷한 장면은 흘려보내지 말고 모아보는 편이 좋습니다. 모인 장면은 감정의 증거가 아니라 나를 이해하는 자료가 됩니다.",
    pdfUrl: "",
    reviewStatus: "needs_human_review"
  }
};
