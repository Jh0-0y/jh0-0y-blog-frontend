import React, { useState, useRef } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import { MdFullscreen, MdClose } from 'react-icons/md';
import styles from './VideoNodeView.module.css';

interface VideoNodeViewProps {
  node: {
    attrs: {
      src: string;
      filename: string;
      size: number;
    };
  };
}

/**
 * 커스텀 비디오 노드 뷰
 * - 중앙 정렬된 비디오 플레이어
 * - 하단에 파일명 표시
 * - 확대보기 기능
 * - 다운로드 방지
 */
const VideoNodeView: React.FC<VideoNodeViewProps> = ({ node }) => {
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { src, filename, size } = node.attrs;

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // 우클릭 방지
  };

  return (
    <NodeViewWrapper className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.videoWrapper}>
          <video
            ref={videoRef}
            src={src}
            controls
            controlsList="nodownload" // 다운로드 버튼 숨김
            onContextMenu={handleContextMenu}
            className={styles.video}
          />
          <button 
            className={styles.fullscreenButton}
            onClick={() => setShowModal(true)}
            title="확대보기"
          >
            <MdFullscreen />
          </button>
        </div>
        <div className={styles.info}>
          <span className={styles.filename}>{filename}</span>
          <span className={styles.filesize}>{formatFileSize(size)}</span>
        </div>
      </div>

      {/* 확대보기 모달 */}
      {showModal && (
        <div className={styles.modal} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setShowModal(false)}>
              <MdClose />
            </button>
            <video
              src={src}
              controls
              autoPlay
              controlsList="nodownload"
              onContextMenu={handleContextMenu}
              className={styles.modalVideo}
            />
            <div className={styles.modalInfo}>
              <p className={styles.modalFilename}>{filename}</p>
              <p className={styles.modalFilesize}>{formatFileSize(size)}</p>
            </div>
          </div>
        </div>
      )}
    </NodeViewWrapper>
  );
};

export default VideoNodeView;
