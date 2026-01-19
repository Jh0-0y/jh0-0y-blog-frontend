import React, { useState, useRef } from 'react';
import { Editor } from '@tiptap/react';
import {
  MdFormatBold,
  MdFormatItalic,
  MdCode,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdLink,
  MdImage,
  MdVideoLibrary,
  MdAttachFile,
  MdTableChart,
  MdUndo,
  MdRedo,
} from 'react-icons/md';
import styles from './EditorToolbar.module.css';

interface EditorToolbarProps {
  editor: Editor;
}

/**
 * 에디터 툴바 (v3)
 * - 텍스트 서식
 * - 미디어 삽입
 * - 테이블, 코드블록
 * - Undo/Redo
 */
const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // 링크 삽입
  const handleSetLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  // 이미지 업로드
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        editor.chain().focus().setCustomImage({
          src,
          filename: file.name,
          size: file.size,
          alt: file.name,
        }).run();
      };
      reader.readAsDataURL(file);
    }
    // input 초기화
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  // 비디오 업로드
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        editor.chain().focus().setCustomVideo({
          src,
          filename: file.name,
          size: file.size,
        }).run();
      };
      reader.readAsDataURL(file);
    }
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };

  // 파일 업로드
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        editor.chain().focus().setCustomFile({
          src,
          filename: file.name,
          size: file.size,
          fileType: file.type,
        }).run();
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 코드블록 삽입
  const handleInsertCodeBlock = () => {
    const language = prompt('프로그래밍 언어를 입력하세요 (예: javascript, python, java):', 'javascript');
    if (language) {
      editor.chain().focus().toggleCodeBlock({ language }).run();
    }
  };

  // 테이블 삽입
  const handleInsertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarGroup}>
        {/* Undo/Redo */}
        <button
          className={styles.toolbarButton}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="실행 취소"
          type="button"
        >
          <MdUndo />
        </button>
        <button
          className={styles.toolbarButton}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="다시 실행"
          type="button"
        >
          <MdRedo />
        </button>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.toolbarGroup}>
        {/* 텍스트 서식 */}
        <button
          className={`${styles.toolbarButton} ${editor.isActive('bold') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="굵게"
          type="button"
        >
          <MdFormatBold />
        </button>
        <button
          className={`${styles.toolbarButton} ${editor.isActive('italic') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="기울임"
          type="button"
        >
          <MdFormatItalic />
        </button>
        <button
          className={`${styles.toolbarButton} ${editor.isActive('code') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleCode().run()}
          title="인라인 코드"
          type="button"
        >
          <MdCode />
        </button>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.toolbarGroup}>
        {/* 제목 */}
        <select
          className={styles.headingSelect}
          onChange={(e) => {
            const level = parseInt(e.target.value);
            if (level === 0) {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 }).run();
            }
          }}
          value={
            editor.isActive('heading', { level: 1 }) ? 1 :
            editor.isActive('heading', { level: 2 }) ? 2 :
            editor.isActive('heading', { level: 3 }) ? 3 : 0
          }
        >
          <option value={0}>본문</option>
          <option value={1}>제목 1</option>
          <option value={2}>제목 2</option>
          <option value={3}>제목 3</option>
        </select>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.toolbarGroup}>
        {/* 리스트 */}
        <button
          className={`${styles.toolbarButton} ${editor.isActive('bulletList') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="글머리 기호 목록"
          type="button"
        >
          <MdFormatListBulleted />
        </button>
        <button
          className={`${styles.toolbarButton} ${editor.isActive('orderedList') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="번호 매기기 목록"
          type="button"
        >
          <MdFormatListNumbered />
        </button>
        <button
          className={`${styles.toolbarButton} ${editor.isActive('blockquote') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="인용구"
          type="button"
        >
          <MdFormatQuote />
        </button>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.toolbarGroup}>
        {/* 링크 */}
        <div className={styles.linkWrapper}>
          <button
            className={`${styles.toolbarButton} ${editor.isActive('link') ? styles.active : ''}`}
            onClick={() => setShowLinkInput(!showLinkInput)}
            title="링크"
            type="button"
          >
            <MdLink />
          </button>
          {showLinkInput && (
            <div className={styles.linkInputContainer}>
              <input
                type="url"
                placeholder="URL을 입력하세요"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSetLink()}
                className={styles.linkInput}
                autoFocus
              />
              <button onClick={handleSetLink} className={styles.linkSubmit} type="button">
                확인
              </button>
            </div>
          )}
        </div>

        {/* 이미지 */}
        <button
          className={styles.toolbarButton}
          onClick={() => imageInputRef.current?.click()}
          title="이미지"
          type="button"
        >
          <MdImage />
        </button>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />

        {/* 비디오 */}
        <button
          className={styles.toolbarButton}
          onClick={() => videoInputRef.current?.click()}
          title="비디오"
          type="button"
        >
          <MdVideoLibrary />
        </button>
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          style={{ display: 'none' }}
        />

        {/* 파일 */}
        <button
          className={styles.toolbarButton}
          onClick={() => fileInputRef.current?.click()}
          title="파일"
          type="button"
        >
          <MdAttachFile />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>

      <div className={styles.divider}></div>

      <div className={styles.toolbarGroup}>
        {/* 코드블록 */}
        <button
          className={styles.toolbarButton}
          onClick={handleInsertCodeBlock}
          title="코드블록"
          type="button"
        >
          <MdCode />
        </button>

        {/* 테이블 */}
        <button
          className={styles.toolbarButton}
          onClick={handleInsertTable}
          title="테이블"
          type="button"
        >
          <MdTableChart />
        </button>
      </div>
    </div>
  );
};

export default EditorToolbar;