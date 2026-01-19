import { useState, useEffect } from 'react';
import styles from './TypingBanner.module.css';

const BANNER_MESSAGES = [
  "데이터의 바다에서 가치 있는 진주를 캐내는 여정",
  "기술의 파도를 타는 개발자, 기술의 서핑을 즐기는 공간",
  "끝없는 0과 1의 수평선 너머, 새로운 세계를 코딩합니다.",
  "코드의 흐름이 모여 거대한 지식의 바다가 되는 곳"
];

export const TypingBanner = () => {
  const [text, setText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

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
      {/* 1. 배경 레이어: 영상과 물결을 담당 */}
      <div className={styles.backgroundContainer}>
        {/* <video autoPlay muted loop playsInline className={styles.bannerVideo}>
          <source src="https://www.pexels.com/ko-kr/download/video/1757853/" type="video/mp4" />
        </video> */}
        <img src="https://seayon-dev.s3.ap-northeast-2.amazonaws.com/public/banner/%E1%84%87%E1%85%A1%E1%84%83%E1%85%A1%E1%84%89%E1%85%A1%E1%84%8C%E1%85%B5%E1%86%AB.png" alt="Banner Background" className={styles.bannerVideo} />
        <div className={styles.videoOverlay} /> {/* 영상 위 어두운 막 */}
        
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

      {/* 2. 콘텐츠 레이어: 텍스트 담당 (배경 설정에 영향받지 않음) */}
      <div className={styles.contentContainer}>
        <h1 className={styles.typingText}>
          {text}<span className={styles.cursor}>|</span>
        </h1>
        {/* 추가하고 싶은 검색바 등이 있다면 여기에 위치 */}
      </div>
    </section>
  );
};