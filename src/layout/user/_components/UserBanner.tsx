import { useState, useEffect, useMemo } from 'react';
import styles from './UserBanner.module.css';

const BANNER_MESSAGES = [
  "기록은 기억을 지배한다",
  "오늘의 배움, 내일의 자산",
  "생각의 파편들을 모으는 서재",
  "작은 기록들이 모여 큰 변화를 만든다"
];

// 떠다니는 파티클 (책 페이지 조각) - Math.random을 useMemo로 고정
const FloatingParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: (i * 12.5 + Math.sin(i) * 10) % 100, // 규칙적이면서도 다양한 위치
        y: (i * 7.5 + Math.cos(i) * 15) % 60,
        size: 2 + (i % 3) * 0.5,
        delay: i * 0.6,
        duration: 15 + (i % 5) * 2,
      })),
    []
  );

  return (
    <g className={styles.particles}>
      {particles.map((p) => (
        <rect
          key={p.id}
          x={`${p.x}%`}
          y={`${p.y}%`}
          width={p.size}
          height={p.size * 1.4}
          fill="var(--global-text-tertiary)"
          opacity="0.2"
          className={styles.particle}
          style={{
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </g>
  );
};

// 책 페이지 넘기기 효과
const OpenBook = () => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % 4); // 4개 페이지 순환
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <g className={styles.book}>
      {/* 책 표지 (왼쪽) - 크기 증가 및 위치 조정 */}
      <rect
        x="15"
        y="25"
        width="30"
        height="45"
        fill="var(--global-bg-tertiary)"
        stroke="var(--global-border-primary)"
        strokeWidth="0.8"
        rx="1.5"
      />

      {/* 책 표지 (오른쪽) */}
      <rect
        x="55"
        y="25"
        width="30"
        height="45"
        fill="var(--global-bg-tertiary)"
        stroke="var(--global-border-primary)"
        strokeWidth="0.8"
        rx="1.5"
      />

      {/* 왼쪽 페이지 */}
      <g className={styles.leftPage}>
        <rect
          x="16"
          y="26"
          width="28"
          height="43"
          fill="var(--global-bg-card)"
          stroke="var(--global-border-secondary)"
          strokeWidth="0.4"
        />
        {/* 텍스트 라인들 - 더 많이 */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line
            key={`left-${i}`}
            x1="18"
            y1={30 + i * 4.5}
            x2="42"
            y2={30 + i * 4.5}
            stroke="var(--global-text-tertiary)"
            strokeWidth="0.4"
            opacity="0.6"
          />
        ))}
      </g>

      {/* 오른쪽 페이지 */}
      <g className={styles.rightPage}>
        <rect
          x="56"
          y="26"
          width="28"
          height="43"
          fill="var(--global-bg-card)"
          stroke="var(--global-border-secondary)"
          strokeWidth="0.4"
        />
        {/* 텍스트 라인들 */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line
            key={`right-${i}`}
            x1="58"
            y1={30 + i * 4.5}
            x2="82"
            y2={30 + i * 4.5}
            stroke="var(--global-text-tertiary)"
            strokeWidth="0.4"
            opacity="0.6"
          />
        ))}
      </g>

      {/* 넘어가는 페이지 (애니메이션) - 더 눈에 띄게 */}
      <g
        className={`${styles.turningPage} ${
          currentPage % 2 === 0 ? styles.turnRight : styles.turnLeft
        }`}
      >
        <path
          d="M 45 26 Q 50 26, 55 26 L 55 69 Q 50 69, 45 69 Z"
          fill="var(--global-bg-card)"
          stroke="var(--global-border-secondary)"
          strokeWidth="0.5"
          opacity="0.95"
        />
        {/* 넘어가는 페이지의 텍스트 라인 */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line
            key={`turn-${i}`}
            x1="47"
            y1={30 + i * 5}
            x2="53"
            y2={30 + i * 5}
            stroke="var(--global-text-tertiary)"
            strokeWidth="0.3"
            opacity="0.5"
          />
        ))}
      </g>

      {/* 책갈피 리본 - 위치 조정 */}
      <path
        d="M 49 23 L 49 42 L 50.5 40.5 L 52 42 L 52 23 Z"
        fill="var(--global-point-primary)"
        opacity="0.8"
        className={styles.bookmark}
      />
    </g>
  );
};

export const UserBanner = () => {
  const [text, setText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  // 타이핑 효과
  useEffect(() => {
    const currentMessage = BANNER_MESSAGES[messageIndex];
    const handleTyping = () => {
      if (!isDeleting) {
        setText(currentMessage.substring(0, text.length + 1));
        setSpeed(150);
        if (text === currentMessage) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(currentMessage.substring(0, text.length - 1));
        setSpeed(50);
        if (text === "") {
          setIsDeleting(false);
          setMessageIndex((prev) => (prev + 1) % BANNER_MESSAGES.length);
        }
      }
    };
    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, messageIndex, speed]);

  return (
    <section className={styles.banner}>
      {/* 배경 레이어 */}
      <div className={styles.backgroundContainer}>
        {/* 책 SVG */}
        <svg 
          className={styles.bookContainer} 
          viewBox="0 0 100 100" 
          preserveAspectRatio="xMidYMid slice"
        >
          {/* 떠다니는 파티클 */}
          <FloatingParticles />

          {/* 펼쳐진 책 */}
          <OpenBook />
        </svg>
      </div>

      {/* 콘텐츠 레이어 */}
      <div className={styles.contentContainer}>
        <h1 className={styles.typingText}>
          {text}<span className={styles.cursor}>|</span>
        </h1>
      </div>
    </section>
  );
};