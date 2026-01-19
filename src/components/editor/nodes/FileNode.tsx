import { NodeViewWrapper } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';
import { FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFileArchive, FaFileAlt, FaFile } from 'react-icons/fa';
import type { FileNodeAttrs } from '../types';
import { formatFileSize } from '../utils';
import styles from './FileNode.module.css';

const FileNode = ({ node }: NodeViewProps) => {
  const attrs = node.attrs as FileNodeAttrs;

  const getFileIcon = () => {
    const extension = attrs.fileName.toLowerCase().substring(attrs.fileName.lastIndexOf('.'));

    switch (extension) {
      case '.pdf':
        return <FaFilePdf className={styles.icon} />;
      case '.doc':
      case '.docx':
        return <FaFileWord className={styles.icon} />;
      case '.xls':
      case '.xlsx':
        return <FaFileExcel className={styles.icon} />;
      case '.ppt':
      case '.pptx':
        return <FaFilePowerpoint className={styles.icon} />;
      case '.zip':
      case '.rar':
      case '.7z':
        return <FaFileArchive className={styles.icon} />;
      case '.txt':
        return <FaFileAlt className={styles.icon} />;
      default:
        return <FaFile className={styles.icon} />;
    }
  };

  const handleDownload = () => {
    window.open(attrs.url, '_blank');
  };

  return (
    <NodeViewWrapper className={styles.wrapper}>
      <div className={styles.container} onClick={handleDownload}>
        <div className={styles.iconWrapper}>{getFileIcon()}</div>
        <div className={styles.info}>
          <div className={styles.fileName}>{attrs.fileName}</div>
          <div className={styles.fileSize}>{formatFileSize(attrs.size)}</div>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default FileNode;
