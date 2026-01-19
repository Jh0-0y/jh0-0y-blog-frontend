import { useState, useEffect } from 'react';
import styles from './TerminalLoader.module.css';

interface TerminalLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
  messages?: string[];
}

const DEFAULT_MESSAGES = [
  '$ initializing...',
  '$ loading components...',
  '$ compiling page...',
  '$ almost done...',
  '$ done ✓',
];

export const TerminalLoader = ({
  isLoading,
  onComplete,
  messages = DEFAULT_MESSAGES,
}: TerminalLoaderProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  // 로딩 시작 시 보이기
  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
      setCurrentMessageIndex(0);
      setDisplayedText('');
      setProgress(0);
      setIsTyping(true);
    }
  }, [isLoading]);

  // 타이핑 효과
  useEffect(() => {
    if (!showLoader || !isTyping) return;

    const currentMessage = messages[currentMessageIndex];
    
    if (displayedText.length < currentMessage.length) {
      const timer = setTimeout(() => {
        setDisplayedText(currentMessage.slice(0, displayedText.length + 1));
      }, 30); // 타이핑 속도
      return () => clearTimeout(timer);
    } else {
      // 현재 메시지 타이핑 완료
      const timer = setTimeout(() => {
        if (currentMessageIndex < messages.length - 1) {
          setCurrentMessageIndex((prev) => prev + 1);
          setDisplayedText('');
        } else {
          setIsTyping(false);
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [showLoader, displayedText, currentMessageIndex, messages, isTyping]);

  // 프로그레스 바
  useEffect(() => {
    if (!showLoader) return;

    const progressPerMessage = 100 / messages.length;
    const targetProgress = (currentMessageIndex + 1) * progressPerMessage;

    if (progress < targetProgress) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + 2, targetProgress));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [showLoader, currentMessageIndex, progress, messages.length]);

  // 로딩 완료 처리
  useEffect(() => {
    if (!isLoading && showLoader && !isTyping && progress >= 100) {
      const timer = setTimeout(() => {
        setShowLoader(false);
        onComplete?.();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading, showLoader, isTyping, progress, onComplete]);

  if (!showLoader) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.terminal}>
        {/* 터미널 헤더 */}
        <div className={styles.terminalHeader}>
          <div className={styles.terminalButtons}>
            <span className={styles.btnClose} />
            <span className={styles.btnMinimize} />
            <span className={styles.btnMaximize} />
          </div>
          <span className={styles.terminalTitle}>terminal</span>
        </div>

        {/* 터미널 바디 */}
        <div className={styles.terminalBody}>
          {/* 이전 메시지들 */}
          {messages.slice(0, currentMessageIndex).map((msg, index) => (
            <div key={index} className={styles.line}>
              <span className={styles.text}>{msg}</span>
            </div>
          ))}

          {/* 현재 타이핑 중인 메시지 */}
          <div className={styles.line}>
            <span className={styles.text}>{displayedText}</span>
            <span className={styles.cursor}>▋</span>
          </div>

          {/* 프로그레스 바 */}
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={styles.progressText}>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
