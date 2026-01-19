import { useCallback, useState } from 'react';
import {
  HiDocumentText,
  HiDocument,
  HiTable,
  HiPresentationChartBar,
  HiArchive,
  HiPaperClip,
} from 'react-icons/hi';
import { ImageModal } from './ImageModal';
import { VideoPlayer } from './VideoPlayer';
import styles from './FileDisplay.module.css';

interface FileDisplayProps {
  fileType: 'IMAGE' | 'VIDEO' | 'DOCUMENT';
  src: string;
  alt?: string;
  fileName?: string;
  fileSize?: number;
}

export const FileDisplay = ({
  fileType,
  src,
  alt,
  fileName = '',
  fileSize,
}: FileDisplayProps) => {
  const [showImageModal, setShowImageModal] = useState(false);

  const formatFileSize = useCallback((bytes?: number): string => {
    if (!bytes) return '';

    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;

    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  }, []);

  const getFileIcon = useCallback((fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();

    switch (ext) {
      case 'pdf':
        return <HiDocumentText className={styles.fileIcon} />;
      case 'doc':
      case 'docx':
        return <HiDocument className={styles.fileIcon} />;
      case 'xls':
      case 'xlsx':
        return <HiTable className={styles.fileIcon} />;
      case 'ppt':
      case 'pptx':
        return <HiPresentationChartBar className={styles.fileIcon} />;
      case 'zip':
      case 'rar':
      case '7z':
        return <HiArchive className={styles.fileIcon} />;
      default:
        return <HiPaperClip className={styles.fileIcon} />;
    }
  }, []);

  // 이미지
  if (fileType === 'IMAGE') {
    return (
      <>
        <img
          src={src}
          alt={alt || fileName}
          className={styles.image}
          loading="lazy"
          onClick={() => setShowImageModal(true)}
        />
        {showImageModal && (
          <ImageModal
            src={src}
            alt={alt || fileName}
            onClose={() => setShowImageModal(false)}
          />
        )}
      </>
    );
  }

  // 비디오
  if (fileType === 'VIDEO') {
    return <VideoPlayer src={src} className={styles.video} />;
  }

  // 문서
  if (fileType === 'DOCUMENT') {
    return (
      <a
        href={src}
        download={fileName}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.documentLink}
      >
        <div className={styles.documentIcon}>{getFileIcon(fileName)}</div>
        <div className={styles.documentInfo}>
          <div className={styles.documentName}>{fileName}</div>
          {fileSize && (
            <div className={styles.documentSize}>{formatFileSize(fileSize)}</div>
          )}
        </div>
      </a>
    );
  }

  return null;
};