import { useNavigate } from 'react-router-dom';
import { usePostCreate } from '@/feature/blog/hooks/post/usePostCreate';
import { useUnsaved } from '@/feature/blog/hooks/common/useUnsaved';
import { 
  PostThumbnailEdit,
  UnsavedModal,
  PostStackSection,
  PostTagSection,
  PostTypeSelector,
  PostMetaFields,
  PostEditorSection,
  PostFormActions,
} from '@/feature/blog/components/post-form';
import styles from './PostFormPage.module.css';
import { SwimmingDolphin } from '@/shared/dolphin/SwimmingDolphin';

export const PostWritePage = () => {
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

  const handleCancelClick = () => {
    confirmNavigation(() => navigate('/'));
  };

  const handleThumbnailUploadSuccess = (fileId: number, fileUrl: string) => {
    updateField('thumbnailFileId', fileId);
    updateField('thumbnailPath', fileUrl);
  };

  const handleThumbnailRemove = () => {
    updateField('thumbnailFileId', null);
    updateField('thumbnailPath', null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <div className={styles.page}>
      {/* 썸네일 - full width */}
      <PostThumbnailEdit
        thumbnailPath={form.thumbnailPath}
        title={form.title || '새 글'}
        onUploadSuccess={handleThumbnailUploadSuccess}
        onThumbnailRemove={handleThumbnailRemove}
      />
      
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 콘텐츠 영역 - max-width 적용, 중앙 정렬 */}
        <div className={styles.scrollArea}>
          <SwimmingDolphin />
          <header className={styles.header}>
            <h1 className={styles.pageTitle}>새 글 작성</h1>
          </header>

          {/* 상단 메타 영역 */}
          <div className={styles.metaSection}>
            <PostTypeSelector
              value={form.postType}
              onChange={(type) => updateField('postType', type)}
            />

            <PostMetaFields
              title={form.title}
              excerpt={form.excerpt}
              onTitleChange={(value) => updateField('title', value)}
              onExcerptChange={(value) => updateField('excerpt', value)}
              titleError={fieldErrors?.title}
              excerptError={fieldErrors?.excerpt}
            />

            <PostStackSection
              selectedStacks={form.stacks}
              fieldError={fieldErrors?.stacks ?? null}
              onStackAdd={addStack}
              onStackRemove={removeStack}
            />

            <PostTagSection
              tags={form.tags}
              fieldError={fieldErrors?.tags ?? null}
              onTagAdd={addTag}
              onTagRemove={removeTag}
            />
          </div>

          {/* 에디터 영역 */}
          <div className={styles.editorSection}>
            <PostEditorSection
              content={form.content}
              onContentChange={(value) => updateField('content', value)}
              contentError={fieldErrors?.content}
              contentLengthError={contentLengthError}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* 하단 고정 액션 */}
        <PostFormActions
          mode="create"
          isLoading={isLoading}
          isDisabled={!!contentLengthError}
          onCancel={handleCancelClick}
        />
      </form>

      <UnsavedModal
        isOpen={showModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};