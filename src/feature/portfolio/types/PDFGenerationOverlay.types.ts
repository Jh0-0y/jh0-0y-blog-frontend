// ─── 타입 ────────────────────────────────────────────────────────────────────

export type GenerationStep =
  | 'idle'
  | 'checking-fonts'
  | 'converting-images'
  | 'creating-document'
  | 'rendering-pdf'
  | 'downloading'
  | 'complete';

export type GenerationProgress = {
  step: GenerationStep;
  message: string;
  subMessage: string;
  percentage: number;
  elapsedTime?: number;
};

// ─── 단계 정의 (순서가 중요 → 배열 사용) ──────────────────────────────────────

/** idle / complete 제외한 실제 진행 단계 목록 (표시 순서와 동일) */
export const GENERATION_STEPS: GenerationStep[] = [
  'checking-fonts',
  'converting-images',
  'creating-document',
  'rendering-pdf',
  'downloading',
];

/** 단계별 표시용 이모지 */
export const STEP_EMOJIS: Record<GenerationStep, string> = {
  idle: '⏸️',
  'checking-fonts': '🔤',
  'converting-images': '🖼️',
  'creating-document': '📝',
  'rendering-pdf': '⚙️',
  downloading: '⬇️',
  complete: '✅',
};

/** 단계별 표시용 라벨 */
export const STEP_LABELS: Record<GenerationStep, string> = {
  idle: '대기 중',
  'checking-fonts': '폰트 확인',
  'converting-images': '이미지 처리',
  'creating-document': '문서 생성',
  'rendering-pdf': 'PDF 렌더링',
  downloading: '다운로드',
  complete: '완료',
};

// ─── 헬퍼 ────────────────────────────────────────────────────────────────────

/** GENERATION_STEPS 기준으로 현재 단계의 인덱스를 반환 (idle → -1, complete → STEPS.length) */
export function getStepIndex(step: GenerationStep): number {
  if (step === 'idle') return -1;
  if (step === 'complete') return GENERATION_STEPS.length;
  return GENERATION_STEPS.indexOf(step);
}

/** idle 상태의 기본값 */
export const IDLE_PROGRESS: GenerationProgress = {
  step: 'idle',
  message: '',
  subMessage: '',
  percentage: 0,
};

// ─── Context 타입 ─────────────────────────────────────────────────────────────

export type PDFProgressContextValue = {
  /** 현재 진행 상태 (오버레이에서 읽음) */
  progress: GenerationProgress;
  /** 진행 상태 업데이트 (Page에서 호출) */
  updateProgress: (
    step: GenerationStep,
    message: string,
    subMessage: string,
    percentage: number,
    elapsedTime?: number
  ) => void;
  /** 완료 후 idle로 리셋 */
  resetProgress: () => void;
};