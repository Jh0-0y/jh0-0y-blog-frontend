import { useEffect, useCallback, useState } from 'react';
import { HiX, HiZoomIn, HiZoomOut } from 'react-icons/hi';
import styles from './ImageModal.module.css';

interface ImageModalProps {
  src: string;
  alt?: string;
  onClose: () => void;
}

export const ImageModal = ({ src, alt, onClose }: ImageModalProps) => {
  const [scale, setScale] = useState(1);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // 확대/축소
  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  }, []);

  // 배경 클릭 시 닫기
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.controls}>
        <button
          type="button"
          onClick={handleZoomOut}
          className={styles.controlButton}
          title="축소"
        >
          <HiZoomOut />
        </button>
        <span className={styles.zoomLevel}>{Math.round(scale * 100)}%</span>
        <button
          type="button"
          onClick={handleZoomIn}
          className={styles.controlButton}
          title="확대"
        >
          <HiZoomIn />
        </button>
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          title="닫기 (ESC)"
        >
          <HiX />
        </button>
      </div>

      <div className={styles.imageContainer}>
        <img
          src={src}
          alt={alt}
          className={styles.image}
          style={{ transform: `scale(${scale})` }}
        />
      </div>
    </div>
  );
};