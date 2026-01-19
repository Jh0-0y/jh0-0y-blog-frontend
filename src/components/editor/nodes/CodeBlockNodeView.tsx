import React, { useState, useRef } from 'react';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import { MdContentCopy, MdCheck } from 'react-icons/md';
import styles from './CodeBlockNodeView.module.css';

interface CodeBlockNodeViewProps {
  node: {
    attrs: {
      language: string;
    };
  };
  updateAttributes: (attributes: Record<string, any>) => void;
}

/**
 * 커스텀 코드블록 NodeView (v3)
 * - MacOS 스타일 디자인
 * - 복사 버튼 기능 개선
 * - 구문 강조
 */
const CodeBlockNodeView: React.FC<CodeBlockNodeViewProps> = ({ node, updateAttributes }) => {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLPreElement>(null);
  const language = node.attrs.language || 'javascript';

  const handleCopy = async () => {
    if (contentRef.current) {
      const code = contentRef.current.textContent || '';
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('복사 실패:', err);
      }
    }
  };

  const getLanguageLabel = (lang: string): string => {
    const labels: { [key: string]: string } = {
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      java: 'Java',
      python: 'Python',
      c: 'C',
      cpp: 'C++',
      bash: 'Bash',
      json: 'JSON',
      html: 'HTML',
      css: 'CSS',
      sql: 'SQL',
      jsx: 'JSX',
      tsx: 'TSX',
    };
    return labels[lang] || lang.toUpperCase();
  };

  return (
    <NodeViewWrapper className={styles.wrapper}>
      <div className={styles.codeBlock}>
        {/* MacOS 스타일 헤더 */}
        <div className={styles.header}>
          <div className={styles.windowControls}>
            <span className={`${styles.dot} ${styles.dotRed}`}></span>
            <span className={`${styles.dot} ${styles.dotYellow}`}></span>
            <span className={`${styles.dot} ${styles.dotGreen}`}></span>
          </div>
          <div className={styles.languageLabel}>
            {getLanguageLabel(language)}
          </div>
          <button 
            className={styles.copyButton}
            onClick={handleCopy}
            title="코드 복사"
            type="button"
          >
            {copied ? <MdCheck /> : <MdContentCopy />}
          </button>
        </div>
        
        {/* 코드 영역 */}
        <div className={styles.codeWrapper}>
          <NodeViewContent 
            as="pre" 
            className={styles.code}
            ref={contentRef}
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default CodeBlockNodeView;