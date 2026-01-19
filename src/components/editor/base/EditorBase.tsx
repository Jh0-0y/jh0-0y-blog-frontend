import React, { useEffect } from 'react';
import { EditorContent } from '@tiptap/react';
import { useMyEditor } from '../hooks/useMyEditor';
import EditorToolbar from './EditorToolbar';
import styles from './EditorBase.module.css';

interface EditorBaseProps {
  editable?: boolean;
  content?: string;
  onUpdate?: (content: string) => void;
  height?: string;
  className?: string;
}

/**
 * Tiptap v3 에디터 컴포넌트
 * - editable 토글 지원
 * - Markdown 직렬화/역직렬화
 * - 커스텀 노드 메타데이터 보존
 */
const EditorBase: React.FC<EditorBaseProps> = ({
  editable = true,
  content = '',
  onUpdate,
  height = '500px',
  className = '',
}) => {
  const editor = useMyEditor({
    content,
    editable,
    onUpdate,
  });

  // editable 변경 시 에디터 업데이트
  useEffect(() => {
    if (editor && editor.isEditable !== editable) {
      editor.setEditable(editable);
    }
  }, [editor, editable]);

  // content 변경 시 에디터 업데이트 (외부에서 변경된 경우)
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>에디터를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className={`${styles.editorContainer} ${className}`}>
      {/* 편집 모드에서만 툴바 표시 */}
      {editable && <EditorToolbar editor={editor} />}
      
      {/* 에디터 콘텐츠 */}
      <div 
        className={`${styles.editorWrapper} ${!editable ? styles.readonly : ''}`}
        style={{ minHeight: height }}
      >
        <div className={styles.editorContent}>
          <EditorContent editor={editor} />
        </div>
      </div>
      
      {/* 읽기 전용 배지 */}
      {!editable && (
        <div className={styles.readonlyBadge}>
          읽기 전용
        </div>
      )}
    </div>
  );
};

export default EditorBase;