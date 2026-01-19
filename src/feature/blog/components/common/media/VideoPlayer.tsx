import { useState, useRef, useCallback, useEffect } from 'react';
import {
  HiPlay,
  HiPause,
  HiVolumeUp,
  HiVolumeOff,
  HiArrowsExpand,
} from 'react-icons/hi';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export const VideoPlayer = ({ src, className }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // 재생/일시정지
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // 음소거 토글
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  // 전체화면
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  // 진행바 클릭
  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!videoRef.current || !progressBarRef.current) return;

      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = clickX / width;
      const newTime = percentage * duration;

      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    },
    [duration]
  );

  // 볼륨 변경
  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!videoRef.current) return;

      const newVolume = parseFloat(e.target.value);
      videoRef.current.volume = newVolume;
      setVolume(newVolume);

      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    },
    [isMuted]
  );

  // 시간 포맷팅
  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // 비디오 이벤트 리스너
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div ref={containerRef} className={`${styles.container} ${className || ''}`}>
      <video
        ref={videoRef}
        src={src}
        className={styles.video}
        onClick={togglePlay}
        preload="metadata"
      />

      <div className={styles.controls}>
        {/* 진행바 */}
        <div
          ref={progressBarRef}
          className={styles.progressBar}
          onClick={handleProgressClick}
        >
          <div
            className={styles.progress}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* 컨트롤 버튼들 */}
        <div className={styles.controlsBottom}>
          <div className={styles.leftControls}>
            {/* 재생/일시정지 */}
            <button
              type="button"
              onClick={togglePlay}
              className={styles.controlButton}
              title={isPlaying ? '일시정지' : '재생'}
            >
              {isPlaying ? <HiPause /> : <HiPlay />}
            </button>

            {/* 시간 */}
            <span className={styles.time}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className={styles.rightControls}>
            {/* 볼륨 */}
            <div className={styles.volumeControl}>
              <button
                type="button"
                onClick={toggleMute}
                className={styles.controlButton}
                title={isMuted ? '음소거 해제' : '음소거'}
              >
                {isMuted || volume === 0 ? <HiVolumeOff /> : <HiVolumeUp />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className={styles.volumeSlider}
              />
            </div>

            {/* 전체화면 */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className={styles.controlButton}
              title="전체화면"
            >
              <HiArrowsExpand />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};