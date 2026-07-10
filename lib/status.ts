import type { SubmissionStatus } from "./types";

export const statusLabels: Record<SubmissionStatus, string> = {
  form_submitted: "접수됨",
  risk_hold: "위험 보류",
  analysis_ready: "분석 가능",
  ai_analysis_done: "AI 분석 완료",
  report_draft_ready: "리포트 초안",
  quality_failed: "품질 미달",
  needs_human_review: "검토 필요",
  approved: "승인됨",
  pdf_generated: "PDF 생성",
  sent: "발송됨",
  archived: "보관됨"
};

export const statusTone: Record<SubmissionStatus, string> = {
  form_submitted: "neutral",
  risk_hold: "danger",
  analysis_ready: "info",
  ai_analysis_done: "info",
  report_draft_ready: "warning",
  quality_failed: "danger",
  needs_human_review: "warning",
  approved: "success",
  pdf_generated: "success",
  sent: "success",
  archived: "neutral"
};
