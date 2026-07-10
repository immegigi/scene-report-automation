"use client";

import {
  AlertTriangle,
  Archive,
  CheckCircle2,
  Clipboard,
  Download,
  FileText,
  Layers3,
  Loader2,
  Mail,
  Plus,
  Save,
  ShieldCheck,
  Sparkles,
  UserRound
} from "lucide-react";
import { useMemo, useState } from "react";
import { analyses as initialAnalyses, customers as initialCustomers, reports as initialReports, submissions as initialSubmissions } from "@/lib/sample-data";
import { statusLabels, statusTone } from "@/lib/status";
import type { Analysis, Customer, Report, RiskLevel, Submission, SubmissionStatus } from "@/lib/types";

const workflowSteps = [
  "위험 신호 판별",
  "장면 구조화",
  "인지 루프 분석",
  "S-C-B 코드 생성",
  "리포트 초안 생성",
  "품질 점검"
];

const statusOptions = Object.entries(statusLabels) as Array<[SubmissionStatus, string]>;

function createAnalysis(submission: Submission): Analysis {
  const isConflictAvoidance = submission.sceneText.includes("괜찮다") || submission.sceneText.includes("분위기");
  const isOverResponsibility = submission.sceneText.includes("먼저 풀") || submission.sceneText.includes("수습");

  if (isOverResponsibility) {
    return {
      submissionId: submission.id,
      riskLevel: "safe",
      riskReason: "고위험 신호가 감지되지 않았습니다.",
      sceneCode: "S09",
      cognitiveCode: "C06",
      behaviorCode: "B06",
      patternCode: "S09-C06-B06",
      patternName: "관계 수습 과잉책임형",
      sceneSummary: "갈등이 생겼을 때 관계를 혼자 수습해야 한다고 느낀 장면입니다.",
      facts: ["상대는 지금 말하기 싫다고 했습니다.", "고객은 계속 사과하고 설명했습니다."],
      interpretations: ["내가 먼저 풀지 않으면 관계가 끝날 것 같다고 해석했습니다."],
      emotionFlow: ["불안", "책임감", "지침"],
      hiddenNeed: "관계를 혼자 붙들지 않아도 된다는 안전감",
      objectRelationNote: "상대의 침묵이 관계를 끝낼 수 있는 신호처럼 경험되며, 고객은 자신을 관계의 유일한 수습자로 느꼈을 수 있습니다.",
      communityHook: "모인 장면은 감정의 증거가 아니라 나를 이해하는 자료가 됩니다.",
      recommendedArchivePrompt: "갈등 뒤 내가 먼저 수습하려 했던 장면을 기록해보세요.",
      growthDirection: "관계 전체를 혼자 책임지는 대신, 내가 감당할 몫과 상대에게 남겨둘 몫을 구분합니다.",
      qualityScore: 88
    };
  }

  if (isConflictAvoidance) {
    return {
      submissionId: submission.id,
      riskLevel: "safe",
      riskReason: "고위험 신호가 감지되지 않았습니다.",
      sceneCode: "S06",
      cognitiveCode: "C01",
      behaviorCode: "B04",
      patternCode: "S06-C01-B04",
      patternName: "서운함 억제 회피형",
      sceneSummary: "서운함을 말하면 관계 분위기가 나빠질까 봐 괜찮은 척한 장면입니다.",
      facts: ["서운한 일이 있었습니다.", "고객은 괜찮다고 말했습니다."],
      interpretations: ["말하면 피곤한 사람으로 보일 것 같다고 해석했습니다."],
      emotionFlow: ["서운함", "외로움", "억울함"],
      hiddenNeed: "서운함을 말해도 관계가 무너지지 않는다는 감각",
      objectRelationNote: "상대가 나를 부담스러워할 수 있다는 예상 때문에, 고객은 자신의 감정을 뒤로 물렸을 수 있습니다.",
      communityHook: "비슷한 장면은 흘려보내지 말고 모아보는 편이 좋습니다.",
      recommendedArchivePrompt: "괜찮다고 말했지만 마음이 남았던 장면을 기록해보세요.",
      growthDirection: "공격하지 않으면서도 내 감정의 크기를 줄이지 않는 문장을 연습합니다.",
      qualityScore: 90
    };
  }

  return {
    submissionId: submission.id,
    riskLevel: "safe",
    riskReason: "고위험 신호가 감지되지 않았습니다.",
    sceneCode: "S01",
    cognitiveCode: "C03",
    behaviorCode: "B01",
    patternCode: "S01-C03-B01",
    patternName: "답장 온도탐지형",
    sceneSummary: "상대의 답장 속도와 말투 변화가 관계의 온도 변화처럼 느껴진 장면입니다.",
    facts: ["답장이 평소보다 늦었습니다.", "답장 문장이 짧아졌습니다."],
    interpretations: ["상대가 식은 것 같다고 해석했습니다.", "내가 귀찮아진 것 같다고 느꼈습니다."],
    emotionFlow: ["불안", "서운함", "초조함"],
    hiddenNeed: "상대 마음 안에서 내가 사라지지 않았다는 감각",
    objectRelationNote: "따뜻하게 반응하던 상대가 갑자기 멀어진 사람처럼 경험되며 관계의 안전감이 흔들렸을 수 있습니다.",
    communityHook: "비슷한 장면은 흘려보내지 말고 모아보는 편이 좋습니다.",
    recommendedArchivePrompt: "답장 시간과 말투가 마음에 크게 남았던 다음 장면을 기록해보세요.",
    growthDirection: "상대 마음을 맞히기보다, 내 마음이 어떤 속도로 해석을 시작하는지 먼저 확인합니다.",
    qualityScore: 92
  };
}

function createReport(submission: Submission, analysis: Analysis): Report {
  return {
    submissionId: submission.id,
    emailSubject: "[날빛코칭] 그 장면 해석 리포트가 도착했습니다",
    emailBody: `${analysis.sceneSummary}\n\n이번 리포트는 상대 마음을 맞히는 글이 아니라, 그 장면을 내 마음이 어떻게 해석했는지 살펴보는 기록입니다.\n\n패턴 코드: ${analysis.patternCode}\n다음에 써볼 문장: 오늘 그 장면에서 내가 조금 흔들렸다는 걸 차분히 말해보고 싶어.`,
    pdfPage1: `당신의 장면\n\n${submission.sceneText}\n\n실제로 일어난 일과 내가 붙인 해석이 빠르게 붙으면서 마음이 커졌을 수 있습니다.`,
    pdfPage2: `관계 인지 루프\n\n자극: ${submission.actualWords}\n주의: 상대의 말투와 반응에 마음이 고정됨\n해석: ${submission.interpretation}\n감정: ${submission.emotion}\n반응: ${submission.reaction}`,
    pdfPage3: `내 마음이 반복해서 만드는 관계 장면\n\nS-C-B 코드: ${analysis.patternCode}\n패턴명: ${analysis.patternName}\n\n${analysis.objectRelationNote}\n\n반복될 때는 상대의 마음을 확인하기 전에 내 해석이 먼저 커질 수 있습니다.`,
    pdfPage4: `다음 대화 문장\n\n바로 보내지 않는 편이 좋은 말: ${submission.unsaidWords}\n\n부드러운 요청 문장: 오늘 그 장면에서 내 마음이 조금 크게 움직였어.\n\n명확한 확인 문장: 지금 이 이야기를 나눌 여유가 있는지 알려주면 좋겠어.\n\n경계 문장: 계속 애매하게 느껴지면 나도 내 마음을 지키는 선택을 하고 싶어.`,
    pdfPage5: `다음 장면 기록지\n\n오늘의 장면:\n실제로 일어난 일:\n내가 붙인 해석:\n감정:\n반응:\n하고 싶었지만 못 한 말:\n다음에 바꿔볼 문장:\n\n이번 리포트는 끝이 아니라 첫 번째 관계 장면 기록입니다.\n비슷한 장면은 흘려보내지 말고 모아보는 편이 좋습니다.\n모인 장면은 감정의 증거가 아니라 나를 이해하는 자료가 됩니다.`,
    pdfUrl: "",
    reviewStatus: analysis.qualityScore >= 90 ? "approved" : "needs_human_review"
  };
}

function nextStatusAfterStep(stepIndex: number): SubmissionStatus {
  if (stepIndex === 0) return "analysis_ready";
  if (stepIndex < 4) return "ai_analysis_done";
  if (stepIndex === 4) return "report_draft_ready";
  return "needs_human_review";
}

function riskBadge(level: RiskLevel) {
  const labels: Record<RiskLevel, string> = {
    safe: "안전",
    caution: "주의",
    high: "고위험"
  };
  return labels[level];
}

export default function AdminDashboard() {
  const [customerList, setCustomerList] = useState<Customer[]>(initialCustomers);
  const [submissionList, setSubmissionList] = useState<Submission[]>(initialSubmissions);
  const [analysisMap, setAnalysisMap] = useState<Record<string, Analysis>>(initialAnalyses);
  const [reportMap, setReportMap] = useState<Record<string, Report>>(initialReports);
  const [selectedId, setSelectedId] = useState(initialSubmissions[0].id);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [activePage, setActivePage] = useState<keyof Pick<Report, "pdfPage1" | "pdfPage2" | "pdfPage3" | "pdfPage4" | "pdfPage5">>("pdfPage1");
  const [toast, setToast] = useState("");
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newScene, setNewScene] = useState("");

  const selectedSubmission = submissionList.find((submission) => submission.id === selectedId) ?? submissionList[0];
  const selectedCustomer = customerList.find((customer) => customer.id === selectedSubmission.customerId) ?? customerList[0];
  const selectedAnalysis = analysisMap[selectedSubmission.id];
  const selectedReport = reportMap[selectedSubmission.id];

  const counts = useMemo(() => {
    return {
      total: submissionList.length,
      pending: submissionList.filter((item) => item.status !== "approved" && item.status !== "pdf_generated").length,
      approved: submissionList.filter((item) => item.status === "approved" || item.status === "pdf_generated").length,
      risk: submissionList.filter((item) => item.status === "risk_hold").length
    };
  }, [submissionList]);

  function updateSubmissionStatus(id: string, status: SubmissionStatus) {
    setSubmissionList((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
  }

  function runStep(index: number) {
    setActiveStep(index);
    window.setTimeout(() => {
      const analysis = analysisMap[selectedSubmission.id] ?? createAnalysis(selectedSubmission);
      setAnalysisMap((items) => ({ ...items, [selectedSubmission.id]: analysis }));

      if (index >= 4) {
        setReportMap((items) => ({
          ...items,
          [selectedSubmission.id]: items[selectedSubmission.id] ?? createReport(selectedSubmission, analysis)
        }));
      }

      updateSubmissionStatus(selectedSubmission.id, nextStatusAfterStep(index));
      setActiveStep(null);
      setToast(`${workflowSteps[index]} 완료`);
    }, 450);
  }

  function updateReport(field: keyof Report, value: string) {
    if (!selectedReport) return;
    setReportMap((items) => ({
      ...items,
      [selectedSubmission.id]: {
        ...selectedReport,
        [field]: value
      }
    }));
  }

  function addSubmission() {
    if (!newCustomerName.trim() || !newScene.trim()) return;

    const customer: Customer = {
      id: `customer-${Date.now()}`,
      name: newCustomerName.trim(),
      email: "pending@example.com",
      sourceChannel: "관리자 입력",
      createdAt: "2026-07-10"
    };
    const submission: Submission = {
      id: `submission-${Date.now()}`,
      customerId: customer.id,
      relationshipType: "미분류",
      sceneText: newScene.trim(),
      actualWords: "",
      interpretation: "",
      emotion: "",
      reaction: "",
      unsaidWords: "",
      desiredChange: "",
      status: "form_submitted",
      createdAt: "2026-07-10"
    };

    setCustomerList((items) => [customer, ...items]);
    setSubmissionList((items) => [submission, ...items]);
    setSelectedId(submission.id);
    setNewCustomerName("");
    setNewScene("");
    setToast("새 제출이 등록되었습니다");
  }

  async function copyText(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    setToast(`${label} 복사 완료`);
  }

  function markPdfGenerated() {
    if (!selectedReport) return;
    setReportMap((items) => ({
      ...items,
      [selectedSubmission.id]: {
        ...selectedReport,
        reviewStatus: "approved",
        pdfUrl: "local-preview"
      }
    }));
    updateSubmissionStatus(selectedSubmission.id, "pdf_generated");
    setToast("PDF 생성 상태로 변경되었습니다");
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <span className="brand-mark">날빛</span>
          <div>
            <h1>그 장면 해석 리포트</h1>
            <p>관리자 MVP</p>
          </div>
        </div>

        <div className="metric-grid">
          <div className="metric">
            <span>전체</span>
            <strong>{counts.total}</strong>
          </div>
          <div className="metric">
            <span>진행</span>
            <strong>{counts.pending}</strong>
          </div>
          <div className="metric">
            <span>승인</span>
            <strong>{counts.approved}</strong>
          </div>
          <div className="metric">
            <span>보류</span>
            <strong>{counts.risk}</strong>
          </div>
        </div>

        <section className="quick-add">
          <div className="section-title">
            <Plus size={16} />
            <span>제출 등록</span>
          </div>
          <input
            aria-label="고객 이름"
            placeholder="고객 이름"
            value={newCustomerName}
            onChange={(event) => setNewCustomerName(event.target.value)}
          />
          <textarea
            aria-label="관계 장면"
            placeholder="관계 장면"
            value={newScene}
            onChange={(event) => setNewScene(event.target.value)}
          />
          <button className="primary-button" type="button" onClick={addSubmission}>
            <Plus size={16} />
            등록
          </button>
        </section>

        <section className="submission-list">
          <div className="section-title">
            <Layers3 size={16} />
            <span>제출 목록</span>
          </div>
          {submissionList.map((submission) => {
            const customer = customerList.find((item) => item.id === submission.customerId);
            const isActive = submission.id === selectedSubmission.id;
            return (
              <button
                className={isActive ? "submission-item active" : "submission-item"}
                key={submission.id}
                onClick={() => setSelectedId(submission.id)}
                type="button"
              >
                <span className="submission-name">{customer?.name ?? "이름 없음"}</span>
                <span className={`status-pill ${statusTone[submission.status]}`}>{statusLabels[submission.status]}</span>
                <span className="submission-scene">{submission.sceneText}</span>
              </button>
            );
          })}
        </section>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">관계 장면 상세</p>
            <h2>{selectedCustomer.name}</h2>
          </div>
          <div className="top-actions">
            <select
              aria-label="상태 변경"
              value={selectedSubmission.status}
              onChange={(event) => updateSubmissionStatus(selectedSubmission.id, event.target.value as SubmissionStatus)}
            >
              {statusOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => setToast("저장되었습니다")}>
              <Save size={16} />
              저장
            </button>
          </div>
        </header>

        <div className="content-grid">
          <section className="detail-surface">
            <div className="section-title large">
              <UserRound size={18} />
              <span>고객 정보</span>
            </div>
            <div className="info-grid">
              <div>
                <span>이메일</span>
                <strong>{selectedCustomer.email}</strong>
              </div>
              <div>
                <span>유입</span>
                <strong>{selectedCustomer.sourceChannel}</strong>
              </div>
              <div>
                <span>관계 유형</span>
                <strong>{selectedSubmission.relationshipType}</strong>
              </div>
              <div>
                <span>접수일</span>
                <strong>{selectedSubmission.createdAt}</strong>
              </div>
            </div>

            <div className="scene-block">
              <span>제출 장면</span>
              <p>{selectedSubmission.sceneText}</p>
            </div>

            <div className="split-fields">
              <label>
                실제 말/행동
                <textarea readOnly value={selectedSubmission.actualWords} />
              </label>
              <label>
                고객 해석
                <textarea readOnly value={selectedSubmission.interpretation} />
              </label>
              <label>
                감정
                <textarea readOnly value={selectedSubmission.emotion} />
              </label>
              <label>
                반응
                <textarea readOnly value={selectedSubmission.reaction} />
              </label>
            </div>
          </section>

          <section className="workflow-surface">
            <div className="section-title large">
              <Sparkles size={18} />
              <span>AI 파이프라인</span>
            </div>
            <div className="workflow-list">
              {workflowSteps.map((step, index) => (
                <button className="workflow-step" key={step} onClick={() => runStep(index)} type="button">
                  <span>{index + 1}</span>
                  <strong>{step}</strong>
                  {activeStep === index ? <Loader2 className="spin" size={16} /> : <CheckCircle2 size={16} />}
                </button>
              ))}
            </div>

            {selectedAnalysis ? (
              <div className="analysis-box">
                <div className="risk-row">
                  <span className={`risk-badge ${selectedAnalysis.riskLevel}`}>
                    <ShieldCheck size={15} />
                    {riskBadge(selectedAnalysis.riskLevel)}
                  </span>
                  <strong>{selectedAnalysis.patternCode}</strong>
                </div>
                <h3>{selectedAnalysis.patternName}</h3>
                <p>{selectedAnalysis.sceneSummary}</p>
                <dl>
                  <div>
                    <dt>핵심 욕구</dt>
                    <dd>{selectedAnalysis.hiddenNeed}</dd>
                  </div>
                  <div>
                    <dt>성장 방향</dt>
                    <dd>{selectedAnalysis.growthDirection}</dd>
                  </div>
                </dl>
                <div className="quality-score">
                  <span>품질 점수</span>
                  <strong>{selectedAnalysis.qualityScore}</strong>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <AlertTriangle size={18} />
                <span>분석 결과 대기</span>
              </div>
            )}
          </section>
        </div>
      </section>

      <aside className="report-panel">
        <header className="report-header">
          <div>
            <p className="eyebrow">리포트 에디터</p>
            <h2>5페이지 PDF 원고</h2>
          </div>
          <span className="status-pill warning">{selectedReport?.reviewStatus ?? "draft"}</span>
        </header>

        {selectedReport ? (
          <>
            <div className="email-tools">
              <label>
                이메일 제목
                <input value={selectedReport.emailSubject} onChange={(event) => updateReport("emailSubject", event.target.value)} />
              </label>
              <label>
                이메일 본문
                <textarea value={selectedReport.emailBody} onChange={(event) => updateReport("emailBody", event.target.value)} />
              </label>
              <div className="button-row">
                <button type="button" onClick={() => copyText(selectedReport.emailSubject, "제목")}>
                  <Clipboard size={16} />
                  제목
                </button>
                <button type="button" onClick={() => copyText(selectedReport.emailBody, "본문")}>
                  <Mail size={16} />
                  본문
                </button>
              </div>
            </div>

            <div className="page-tabs">
              {(["pdfPage1", "pdfPage2", "pdfPage3", "pdfPage4", "pdfPage5"] as const).map((pageKey, index) => (
                <button
                  className={activePage === pageKey ? "active" : ""}
                  key={pageKey}
                  onClick={() => setActivePage(pageKey)}
                  type="button"
                >
                  {index + 1}p
                </button>
              ))}
            </div>

            <textarea
              className="report-editor"
              value={selectedReport[activePage]}
              onChange={(event) => updateReport(activePage, event.target.value)}
            />

            <div className="pdf-preview">
              <div className="paper">
                <span className="paper-title">{activePage.replace("pdfPage", "")}페이지</span>
                <pre>{selectedReport[activePage]}</pre>
                <span className="paper-footer">날빛코칭</span>
              </div>
            </div>

            <button className="primary-button full" type="button" onClick={markPdfGenerated}>
              <Download size={16} />
              PDF 생성 완료
            </button>
          </>
        ) : (
          <div className="empty-report">
            <FileText size={22} />
            <span>리포트 초안 대기</span>
            <button type="button" onClick={() => runStep(4)}>
              <Sparkles size={16} />
              초안 생성
            </button>
          </div>
        )}
      </aside>

      {toast ? (
        <button className="toast" onClick={() => setToast("")} type="button">
          <Archive size={16} />
          {toast}
        </button>
      ) : null}
    </main>
  );
}
