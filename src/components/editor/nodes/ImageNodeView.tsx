import React, { useState } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import { MdZoomIn, MdClose } from 'react-icons/md';
import styles from './ImageNodeView.module.css';

interface ImageNodeViewProps {
  node: {
    attrs: {
      src: string;
      filename: string;
      size: number;
      alt?: string;
    };
  };
}

/**
 * 커스텀 이미지 노드 뷰
 * - 중앙 정렬된 이미지
 * - 하단에 파일명 표시
 * - 클릭 시 모달로 상세보기
 * - 우클릭 및 다운로드 방지
 */
const ImageNodeView: React.FC<ImageNodeViewProps> = ({ node }) => {
  const [showModal, setShowModal] = useState(false);
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

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault(); // 드래그 방지
  };

  return (
    <NodeViewWrapper className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imageWrapper} onClick={() => setShowModal(true)}>
          <img
            src={src}
            alt={filename}
            className={styles.image}
            onContextMenu={handleContextMenu}
            onDragStart={handleDragStart}
          />
          <div className={styles.zoomOverlay}>
            <MdZoomIn className={styles.zoomIcon} />
          </div>
        </div>
        <div className={styles.info}>
          <span className={styles.filename}>{filename}</span>
          <span className={styles.filesize}>{formatFileSize(size)}</span>
        </div>
      </div>

      {/* 상세보기 모달 */}
      {showModal && (
        <div className={styles.modal} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setShowModal(false)}>
              <MdClose />
            </button>
            <img
              src={src}
              alt={filename}
              className={styles.modalImage}
              onContextMenu={handleContextMenu}
              onDragStart={handleDragStart}
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

export default ImageNodeView;
