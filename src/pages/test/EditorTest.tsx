import React, { useState } from 'react';
import EditorBase from '@/components/editor/base/EditorBase';
import styles from './EditorTest.module.css';

/**
 * 에디터 사용 예시
 * - Create 모드: 새 문서 작성
 * - Edit 모드: 기존 문서 수정
 * - View 모드: 문서 읽기 전용 조회
 */
const EditorTest: React.FC = () => {
  const [mode, setMode] = useState<'create' | 'edit' | 'view'>('create');
  const [savedContent, setSavedContent] = useState<string>('');
  const [currentContent, setCurrentContent] = useState<string>('');

  // 저장 핸들러
  const handleSave = () => {
    setSavedContent(currentContent);
    alert('문서가 저장되었습니다!');
  };

  // 편집 시작
  const handleEdit = () => {
    setMode('edit');
  };

  // 조회 모드로 전환
  const handleView = () => {
    setMode('view');
  };

  // 새 문서 작성
  const handleCreate = () => {
    setMode('create');
    setCurrentContent('');
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          📝 Tiptap Markdown Editor
        </h1>
        <p className={styles.subtitle}>
          Ocean Glassmorphism Design
        </p>
      </header>

      <div className={styles.controls}>
        <div className={styles.modeButtons}>
          <button
            className={`${styles.modeButton} ${mode === 'create' ? styles.active : ''}`}
            onClick={handleCreate}
          >
            ✏️ 새 문서
          </button>
          <button
            className={`${styles.modeButton} ${mode === 'edit' ? styles.active : ''}`}
            onClick={handleEdit}
            disabled={!savedContent}
          >
            📝 수정하기
          </button>
          <button
            className={`${styles.modeButton} ${mode === 'view' ? styles.active : ''}`}
            onClick={handleView}
            disabled={!savedContent}
          >
            👁️ 조회하기
          </button>
        </div>

        {(mode === 'create' || mode === 'edit') && (
          <button className={styles.saveButton} onClick={handleSave}>
            💾 저장
          </button>
        )}
      </div>

      <main className={styles.main}>
        <div className={styles.editorSection}>
          <div className={styles.modeIndicator}>
            {mode === 'create' && '✏️ 생성 모드'}
            {mode === 'edit' && '📝 수정 모드'}
            {mode === 'view' && '👁️ 읽기 전용 모드'}
          </div>

          <EditorBase
            editable={mode !== 'view'}
            content={mode === 'view' ? savedContent : mode === 'edit' ? savedContent : ''}
            onUpdate={setCurrentContent}
            height="600px"
          />
        </div>

        {/* 디버깅용: Markdown 미리보기 */}
        <div className={styles.markdownPreview}>
          <h3 className={styles.previewTitle}>📄 Markdown 미리보기</h3>
          <pre className={styles.previewContent}>
            {mode === 'view' ? savedContent : currentContent}
          </pre>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Made with ❤️ using Tiptap, React, TypeScript
        </p>
      </footer>
    </div>
  );
};

export default EditorTest;