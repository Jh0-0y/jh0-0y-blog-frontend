import { useEffect, useState } from 'react';
import {
  GENERATION_STEPS,
  STEP_EMOJIS,
  STEP_LABELS,
  getStepIndex,
} from '@/feature/portfolio/types/PDFGenerationOverlay.types';
import type { GenerationProgress } from '@/feature/portfolio/types/PDFGenerationOverlay.types';
import styles from './PDFGenerationOverlay.module.css';

type PDFGenerationOverlayProps = {
  progress: GenerationProgress;
  isVisible: boolean;
};

export const PDFGenerationOverlay = ({
  progress,
  isVisible,
}: PDFGenerationOverlayProps) => {
  const [dots, setDots] = useState('');

  // 애니메이션용 점 표시
  useEffect(() => {
    if (!isVisible || progress.step === 'complete') {
      setDots('');
      return;
    }

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, [isVisible, progress.step]);

  if (!isVisible) return null;

  const isRendering = progress.step === 'rendering-pdf';
  const currentStepIndex = getStepIndex(progress.step);

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        {/* 메인 아이콘 */}
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>{STEP_EMOJIS[progress.step]}</span>
          {progress.step !== 'complete' && (
            <div className={styles.spinner}></div>
          )}
        </div>

        {/* 진행 상태 텍스트 */}
        <div className={styles.textWrapper}>
          <h2 className={styles.title}>
            {progress.message}
            {progress.step !== 'complete' && dots}
          </h2>
          {progress.subMessage && (
            <p className={styles.subtitle}>{progress.subMessage}</p>
          )}
        </div>

        {/* 진행률 바 */}
        <div className={styles.progressBarWrapper}>
          <div className={styles.progressBarTrack}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <span className={styles.progressText}>{progress.percentage}%</span>
        </div>

        {/* 단계별 상태 표시 */}
        <div className={styles.stepsWrapper}>
          {GENERATION_STEPS.map((step, index) => {
            const isActive = progress.step === step;
            const isComplete = currentStepIndex > index;

            return (
              <div
                key={step}
                className={`${styles.stepItem} ${
                  isActive ? styles.stepItemActive : ''
                } ${isComplete ? styles.stepItemComplete : ''}`}
              >
                <div className={styles.stepIcon}>
                  {isComplete ? '✓' : STEP_EMOJIS[step]}
                </div>
                <span className={styles.stepLabel}>{STEP_LABELS[step]}</span>
              </div>
            );
          })}
        </div>

        {/* 렌더링 단계에서 추가 정보 */}
        {isRendering && (
          <div className={styles.renderingInfo}>
            <p className={styles.renderingText}>
              📄 포트폴리오 PDF를 생성하고 있습니다
            </p>
            <p className={styles.renderingSubtext}>
              복잡한 레이아웃과 한글 폰트로 인해 약 15~20초 정도 소요될 수 있습니다
            </p>
            <p className={styles.renderingTip}>
              💡 이 작업은 한 번만 수행되며, 다음부터는 캐시된 PDF를 사용합니다
            </p>
          </div>
        )}

        {/* 경과 시간 표시 */}
        {progress.elapsedTime !== undefined && progress.elapsedTime > 0 && (
          <div className={styles.timeInfo}>
            경과 시간: {(progress.elapsedTime / 1000).toFixed(1)}초
          </div>
        )}

        {/* 완료 메시지 */}
        {progress.step === 'complete' && (
          <div className={styles.completeMessage}>
            <p className={styles.completeText}>✨ PDF 다운로드 완료!</p>
          </div>
        )}
      </div>
    </div>
  );
};