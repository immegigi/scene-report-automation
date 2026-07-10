export type SubmissionStatus =
  | "form_submitted"
  | "risk_hold"
  | "analysis_ready"
  | "ai_analysis_done"
  | "report_draft_ready"
  | "quality_failed"
  | "needs_human_review"
  | "approved"
  | "pdf_generated"
  | "sent"
  | "archived";

export type RiskLevel = "safe" | "caution" | "high";

export type Customer = {
  id: string;
  name: string;
  email: string;
  sourceChannel: string;
  createdAt: string;
};

export type Submission = {
  id: string;
  customerId: string;
  relationshipType: string;
  sceneText: string;
  actualWords: string;
  interpretation: string;
  emotion: string;
  reaction: string;
  unsaidWords: string;
  desiredChange: string;
  status: SubmissionStatus;
  createdAt: string;
};

export type Analysis = {
  submissionId: string;
  riskLevel: RiskLevel;
  riskReason: string;
  sceneCode: string;
  cognitiveCode: string;
  behaviorCode: string;
  patternCode: string;
  patternName: string;
  sceneSummary: string;
  facts: string[];
  interpretations: string[];
  emotionFlow: string[];
  hiddenNeed: string;
  objectRelationNote: string;
  communityHook: string;
  recommendedArchivePrompt: string;
  growthDirection: string;
  qualityScore: number;
};

export type Report = {
  submissionId: string;
  emailSubject: string;
  emailBody: string;
  pdfPage1: string;
  pdfPage2: string;
  pdfPage3: string;
  pdfPage4: string;
  pdfPage5: string;
  pdfUrl: string;
  reviewStatus: "draft" | "needs_human_review" | "approved";
};
