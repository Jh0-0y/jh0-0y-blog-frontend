import { useNavigate } from 'react-router-dom';
import { usePostCreate } from '@/feature/blog/hooks/post/usePostCreate';
import { useUnsaved } from '@/feature/blog/hooks/common/useUnsaved';
import { 
  ThumbnailBannerEdit,
  UnsavedModal,
  StackSection,
  TagSection,
} from '@/feature/blog/components/blog-form';
import { Editor } from '@/components/editor';
import { VALIDATION_LIMITS } from '@/feature/blog/validations/post.validation';
import type { PostType } from '@/api/post/types';
import styles from './BlogEditWritePage.module.css';

const POST_TYPES: { value: PostType; label: string }[] = [
  { value: 'CORE', label: 'Core' },
  { value: 'ARCHITECTURE', label: 'Architecture' },
  { value: 'TROUBLESHOOTING', label: 'Troubleshooting' },
  { value: 'ESSAY', label: 'Essay' },
];

export const BlogWritePage = () => {
  const navigate = useNavigate();
  
  const {
    form,
    isLoading,
    fieldErrors,
    contentLengthError,
    hasUnsavedChanges,
    updateField,
    addTag,
    removeTag,
    addStack,
    removeStack,
    submit,
  } = usePostCreate();

  const { showModal, handleConfirm, handleCancel, confirmNavigation } = useUnsaved({
    hasUnsavedChanges,
  });

  const handleCancelClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    confirmNavigation(() => navigate('/'));
  };

  const handleThumbnailUploadSuccess = (fileId: number, fileUrl: string) => {
    updateField('thumbnailFileId', fileId);
    updateField('thumbnailUrl', fileUrl);
  };

  const handleThumbnailRemove = () => {
    updateField('thumbnailFileId', null);
    updateField('thumbnailUrl', null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <div className={styles.page}>
      <ThumbnailBannerEdit
        thumbnailUrl={form.thumbnailUrl}
        title={form.title || '새 글'}
        onUploadSuccess={handleThumbnailUploadSuccess}
        onThumbnailRemove={handleThumbnailRemove}
      />
      
      <section className={styles.content}>
        <header className={styles.header}>
          <a href="/" onClick={handleCancelClick} className={styles.backLink}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span>취소</span>
          </a>
          <h1 className={styles.pageTitle}>새 글 작성</h1>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>타입</label>
            <div className={styles.typeButtons}>
              {POST_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => updateField('postType', type.value)}
                  className={`${styles.typeButton} ${form.postType === type.value ? styles.active : ''}`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label}>제목</label>
              <span className={styles.charCount}>
                {form.title.length}/{VALIDATION_LIMITS.TITLE_MAX}
              </span>
            </div>
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="제목을 입력하세요"
              className={`${styles.titleInput} ${fieldErrors?.title ? styles.inputError : ''}`}
              maxLength={VALIDATION_LIMITS.TITLE_MAX}
            />
            {fieldErrors?.title && <span className={styles.fieldError}>{fieldErrors.title}</span>}
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label}>요약</label>
              <span className={styles.charCount}>
                {form.excerpt.length}/{VALIDATION_LIMITS.EXCERPT_MAX}
              </span>
            </div>
            <textarea
              value={form.excerpt}
              onChange={(e) => updateField('excerpt', e.target.value)}
              placeholder="글을 간단히 요약해주세요 (목록에 표시됩니다)"
              className={`${styles.excerptInput} ${fieldErrors?.excerpt ? styles.inputError : ''}`}
              rows={2}
              maxLength={VALIDATION_LIMITS.EXCERPT_MAX}
            />
            {fieldErrors?.excerpt && <span className={styles.fieldError}>{fieldErrors.excerpt}</span>}
          </div>

          <StackSection
            selectedStacks={form.stacks}
            fieldError={fieldErrors?.stacks ?? null}
            onStackAdd={addStack}
            onStackRemove={removeStack}
          />

          <TagSection
            tags={form.tags}
            fieldError={fieldErrors?.tags ?? null}
            onTagAdd={addTag}
            onTagRemove={removeTag}
          />

          <div className={styles.editorSection}>
            <div className={styles.labelRow}>
              <label className={styles.label}>본문</label>
              <span className={`${styles.charCount} ${contentLengthError ? styles.charCountError : ''}`}>
                {form.content.length}/{VALIDATION_LIMITS.CONTENT_MAX}
              </span>
            </div>
            {contentLengthError && <span className={styles.fieldError}>{contentLengthError}</span>}
            {fieldErrors?.content && !contentLengthError && (
              <span className={styles.fieldError}>{fieldErrors.content}</span>
            )}
            
            <Editor
              content={form.content}
              placeholder="마크다운 문서도 지원합니다."
              onUpdate={(value) => updateField('content', value)}
              editable={!isLoading}
            />
          </div>

          <div className={styles.actions}>
            <a href="/" onClick={handleCancelClick} className={styles.cancelButton}>
              취소
            </a>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading || !!contentLengthError}
            >
              {isLoading ? '저장 중...' : '발행하기'}
            </button>
          </div>
        </form>

        <UnsavedModal
          isOpen={showModal}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </section>
    </div>
  );
};