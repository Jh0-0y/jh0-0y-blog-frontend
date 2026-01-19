import { useRef } from 'react';
import styles from './ThumbnailBannerEdit.module.css';

interface ThumbnailBannerEditProps {
  thumbnailUrl?: string | null;
  thumbnailFile?: File;
  title: string;
  onThumbnailChange: (file: File) => void;
  onThumbnailRemove: () => void;
}

export const ThumbnailBannerEdit = ({
  thumbnailUrl,
  thumbnailFile,
  title,
  onThumbnailChange,
  onThumbnailRemove,
}: ThumbnailBannerEditProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 배너 클릭 시 파일 선택
  const handleBannerClick = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 처리
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이미지 파일인지 검증
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다');
        return;
      }

      // 파일 크기 검증 (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('파일 크기는 5MB 이하여야 합니다');
        return;
      }

      onThumbnailChange(file);
    }
  };

  // 제거 버튼 클릭
  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('썸네일을 제거하시겠습니까?')) {
      onThumbnailRemove();
    }
  };

  // 표시할 이미지 URL 결정
  // 우선순위: 새로 선택한 파일 > 기존 URL
  const displayUrl = thumbnailFile
    ? URL.createObjectURL(thumbnailFile)
    : thumbnailUrl;

  return (
    <section className={styles.banner}>
      <div
        className={styles.backgroundContainer}
        onClick={handleBannerClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleBannerClick()}
      >
        {displayUrl ? (
          <>
            <img
              src={displayUrl}
              alt={title}
              className={styles.bannerImage}
            />
            <div className={styles.bannerOverlay} />
            <div className={styles.imageActions}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBannerClick();
                }}
                className={styles.changeButton}
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                변경
              </button>
              <button
                type="button"
                onClick={handleRemoveClick}
                className={styles.removeButton}
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                제거
              </button>
            </div>
          </>
        ) : (
          <div className={styles.bannerPlaceholder}>
            <div className={styles.uploadPrompt}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>클릭하여 썸네일 추가</span>
              <span className={styles.uploadHint}>권장 크기: 1200x400, 최대 5MB</span>
            </div>
          </div>
        )}

        {/* 물결 효과 */}
        <div className={styles.waveWrapper}>
          <svg
            className={styles.waves}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
          >
            <defs>
              <path
                id="gentle-wave-edit"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className={styles.parallax}>
              <use xlinkHref="#gentle-wave-edit" x="48" y="0" className={styles.waveLayer1} />
              <use xlinkHref="#gentle-wave-edit" x="48" y="7" className={styles.waveLayer2} />
            </g>
          </svg>
        </div>
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.hiddenInput}
      />
    </section>
  );
};