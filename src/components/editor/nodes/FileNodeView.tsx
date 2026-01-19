import React from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import { 
  MdInsertDriveFile, 
  MdPictureAsPdf, 
  MdDescription,
  MdTableChart,
  MdCode,
  MdArchive,
  MdDownload
} from 'react-icons/md';
import styles from './FileNodeView.module.css';

interface FileNodeViewProps {
  node: {
    attrs: {
      src: string;
      filename: string;
      size: number;
      fileType: string;
    };
  };
}

/**
 * 커스텀 파일 노드 뷰
 * - 카드 형태 UI
 * - 파일 타입별 아이콘
 * - 파일명 및 크기 표시
 * - 다운로드 기능
 */
const FileNodeView: React.FC<FileNodeViewProps> = ({ node }) => {
  const { src, filename, size, fileType } = node.attrs;

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    if (fileType.includes('pdf')) {
      return <MdPictureAsPdf className={styles.icon} style={{ color: '#ef4444' }} />;
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return <MdDescription className={styles.icon} style={{ color: '#3b82f6' }} />;
    } else if (fileType.includes('sheet') || fileType.includes('excel')) {
      return <MdTableChart className={styles.icon} style={{ color: '#10b981' }} />;
    } else if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('compressed')) {
      return <MdArchive className={styles.icon} style={{ color: '#f59e0b' }} />;
    } else if (fileType.includes('code') || fileType.includes('text')) {
      return <MdCode className={styles.icon} style={{ color: '#8b5cf6' }} />;
    } else {
      return <MdInsertDriveFile className={styles.icon} style={{ color: '#64748b' }} />;
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <NodeViewWrapper className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          {getFileIcon()}
        </div>
        <div className={styles.info}>
          <p className={styles.filename} title={filename}>{filename}</p>
          <p className={styles.filesize}>{formatFileSize(size)}</p>
        </div>
        <button 
          className={styles.downloadButton}
          onClick={handleDownload}
          title="다운로드"
        >
          <MdDownload />
        </button>
      </div>
    </NodeViewWrapper>
  );
};

export default FileNodeView;
