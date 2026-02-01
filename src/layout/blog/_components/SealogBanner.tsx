import { useState, useEffect } from 'react';
import styles from './SealogBanner.module.css';

const BANNER_MESSAGES = [
  "데이터의 바다에서 가치 있는 진주를 캐내는 여정",
  "기술의 파도를 타는 개발자, 기술의 서핑을 즐기는 공간",
  "끝없는 0과 1의 수평선 너머, 새로운 세계를 코딩합니다.",
  "코드의 흐름이 모여 거대한 지식의 바다가 되는 곳"
];

type TimePhase = 'sunrise' | 'day' | 'sunset' | 'night';

const getTimePhase = (hour: number): TimePhase => {
  if (hour >= 6 && hour < 9) return 'sunrise';
  if (hour >= 9 && hour < 17) return 'day';
  if (hour >= 17 && hour < 21) return 'sunset';
  return 'night';
};

const getCelestialPosition = (hour: number): number => {
  // 해: 6시(0%) -> 12시(50%) -> 18시(100%)
  // 달: 21시(0%) -> 0시(25%) -> 3시(50%) -> 6시(100%)
  const phase = getTimePhase(hour);
  
  if (phase === 'sunrise' || phase === 'day' || phase === 'sunset') {
    // 해 위치: 6시~18시 (12시간 동안 0%~100%)
    const sunHour = Math.max(6, Math.min(18, hour));
    return ((sunHour - 6) / 12) * 100;
  } else {
    // 달 위치: 21시~6시 (9시간 동안 0%~100%)
    let moonHour = hour;
    if (hour >= 21) {
      moonHour = hour - 21; // 21시=0, 22시=1, 23시=2
    } else {
      moonHour = hour + 3; // 0시=3, 1시=4, ..., 5시=8
    }
    return (moonHour / 9) * 100;
  }
};

// 해 SVG 컴포넌트
const Sun = ({ position }: { position: number }) => {
  // 호(arc) 궤적 계산: 0%일 때 왼쪽 아래, 50%일 때 중앙 위, 100%일 때 오른쪽 아래
  const x = 10 + (position * 0.8); // 10% ~ 90%
  const y = 70 - Math.sin((position / 100) * Math.PI) * 30; // 호 형태 (축소)
  
  return (
    <g className={styles.sun} style={{ transform: `translate(${x}%, ${y}%)` }}>
      {/* 해 광선 */}
      <circle cx="0" cy="0" r="18" fill="url(#sunGlow)" opacity="0.6" />
      <circle cx="0" cy="0" r="12" fill="url(#sunGlow)" opacity="0.4" />
      {/* 해 본체 */}
      <circle cx="0" cy="0" r="8" fill="url(#sunGradient)" />
    </g>
  );
};

// 초승달 SVG 컴포넌트
const Moon = ({ position }: { position: number }) => {
  const x = 10 + (position * 0.8);
  const y = 70 - Math.sin((position / 100) * Math.PI) * 30;
  
  return (
    <g className={styles.moon} style={{ transform: `translate(${x}%, ${y}%)` }}>
      {/* 달 빛 */}
      <circle cx="0" cy="0" r="12" fill="url(#moonGlow)" opacity="0.3" />
      {/* 초승달 */}
      <mask id="crescentMask">
        <circle cx="0" cy="0" r="7" fill="white" />
        <circle cx="4" cy="-1.5" r="5.5" fill="black" />
      </mask>
      <circle cx="0" cy="0" r="7" fill="url(#moonGradient)" mask="url(#crescentMask)" />
    </g>
  );
};

// 별 컴포넌트
const Stars = () => {
  const stars = [
    { x: 15, y: 25, size: 1, delay: 0 },
    { x: 25, y: 40, size: 0.8, delay: 0.3 },
    { x: 40, y: 20, size: 1.2, delay: 0.6 },
    { x: 55, y: 32, size: 0.9, delay: 0.2 },
    { x: 70, y: 18, size: 1, delay: 0.5 },
    { x: 80, y: 38, size: 0.8, delay: 0.8 },
    { x: 88, y: 22, size: 1.1, delay: 0.1 },
    { x: 35, y: 50, size: 0.9, delay: 0.4 },
    { x: 60, y: 48, size: 0.8, delay: 0.7 },
    { x: 92, y: 42, size: 1, delay: 0.9 },
  ];

  return (
    <g className={styles.stars}>
      {stars.map((star, i) => (
        <circle
          key={i}
          cx={`${star.x}%`}
          cy={`${star.y}%`}
          r={star.size}
          fill="white"
          className={styles.star}
          style={{ animationDelay: `${star.delay}s` }}
        />
      ))}
    </g>
  );
};

// 구름 컴포넌트
const Clouds = () => {
  return (
    <g className={styles.clouds}>
      {/* 구름 1 */}
      <g className={styles.cloud1}>
        <ellipse cx="60" cy="35" rx="12" ry="6" fill="white" opacity="0.9" />
        <ellipse cx="50" cy="38" rx="9" ry="5" fill="white" opacity="0.9" />
        <ellipse cx="70" cy="38" rx="10" ry="5" fill="white" opacity="0.9" />
        <ellipse cx="58" cy="40" rx="11" ry="4" fill="white" opacity="0.9" />
      </g>
      {/* 구름 2 */}
      <g className={styles.cloud2}>
        <ellipse cx="200" cy="45" rx="11" ry="5" fill="white" opacity="0.8" />
        <ellipse cx="190" cy="48" rx="8" ry="4" fill="white" opacity="0.8" />
        <ellipse cx="210" cy="48" rx="9" ry="4.5" fill="white" opacity="0.8" />
        <ellipse cx="198" cy="50" rx="10" ry="3.5" fill="white" opacity="0.8" />
      </g>
      {/* 구름 3 */}
      <g className={styles.cloud3}>
        <ellipse cx="320" cy="30" rx="10" ry="4.5" fill="white" opacity="0.85" />
        <ellipse cx="310" cy="33" rx="7.5" ry="3.5" fill="white" opacity="0.85" />
        <ellipse cx="330" cy="33" rx="8.5" ry="4" fill="white" opacity="0.85" />
        <ellipse cx="318" cy="35" rx="9" ry="3" fill="white" opacity="0.85" />
      </g>
    </g>
  );
};

export const SealogBanner = () => {
  const [text, setText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);
  //const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [currentHour, setCurrentHour] = useState(0);

  // 1시간마다 시간 업데이트
  useEffect(() => {
    const updateHour = () => {
      setCurrentHour(new Date().getHours());
    };

    const now = new Date();
    const msUntilNextHour = (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000;
    
    const initialTimeout = setTimeout(() => {
      updateHour();
      const interval = setInterval(updateHour, 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, msUntilNextHour);

    return () => clearTimeout(initialTimeout);
  }, []);

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

  const timePhase = getTimePhase(currentHour);
  const celestialPosition = getCelestialPosition(currentHour);

  return (
    <section className={`${styles.banner} ${styles[timePhase]}`}>
      {/* 배경 레이어 */}
      <div className={styles.backgroundContainer}>
        {/* 하늘 SVG */}
        <svg className={styles.sky} viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
          <defs>
            {/* 해 그라데이션 */}
            <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF7E0" />
              <stop offset="50%" stopColor="#FFD93D" />
              <stop offset="100%" stopColor="#FF8C00" />
            </radialGradient>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD93D" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFD93D" stopOpacity="0" />
            </radialGradient>
            {/* 달 그라데이션 */}
            <radialGradient id="moonGradient" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFEF0" />
              <stop offset="100%" stopColor="#E8E4D9" />
            </radialGradient>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFEF0" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFFEF0" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 낮: 구름 */}
          {timePhase === 'day' && <Clouds />}
          
          {/* 밤: 별 */}
          {timePhase === 'night' && <Stars />}

          {/* 해 (일출, 낮, 일몰) */}
          {(timePhase === 'sunrise' || timePhase === 'day' || timePhase === 'sunset') && (
            <Sun position={celestialPosition} />
          )}

          {/* 달 (밤) */}
          {timePhase === 'night' && <Moon position={celestialPosition} />}
        </svg>

        {/* 물결 */}
        <div className={styles.waveWrapper}>
          <svg className={styles.waves} xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className={styles.parallax}>
              <use xlinkHref="#gentle-wave" x="48" y="0" className={styles.waveLayer1} />
              <use xlinkHref="#gentle-wave" x="48" y="7" className={styles.waveLayer2} />
            </g>
          </svg>
        </div>
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