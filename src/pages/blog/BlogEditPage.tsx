import { useParams, useNavigate } from 'react-router-dom';
import { usePostEdit } from '@/feature/blog/hooks/post/usePostEdit';
import { useStacks } from '@/feature/blog/hooks/stack/useStacks';
import { useUnsaved } from '@/feature/blog/hooks/common/useUnsaved';
import {
  ThumbnailBannerEdit,
  BlogForm,
  UnsavedModal
} from '@/feature/blog/components/blog-form';
import styles from './BlogEditWritePage.module.css';

export const BlogEditPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  if (!slug) {
    navigate('/');
    return null;
  }
  
  const {
    form,
    originalThumbnailUrl,
    isLoading,
    isFetching,
    error,
    fieldErrors,
    contentLengthError,
    hasUnsavedChanges,
    updateField,
    setThumbnail,
    setRemoveThumbnail,
    addTag,
    removeTag,
    addStack,
    removeStack,
    toggleStatus,
    submit,
  } = usePostEdit(slug);



  const { groupedStacks, isLoading: isStacksLoading, refetch: refetchStacks } = useStacks();

  // 페이지 이탈 경고
  const { showModal, handleConfirm, handleCancel, confirmNavigation } = useUnsaved({
    hasUnsavedChanges,
  });

  // 취소 버튼 클릭 핸들러
  const handleCancelClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    confirmNavigation(() => navigate(`/post/${slug}`));
  };

  // 썸네일 변경 처리
  const handleThumbnailChange = (file: File) => {
    setThumbnail(file);
  };

  // 썸네일 제거 처리
  const handleThumbnailRemove = () => {
    if (originalThumbnailUrl) {
      setRemoveThumbnail(true);
    } else {
      setThumbnail(undefined);
    }
  };

  // 저장
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  // 로딩 중
  if (isFetching) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>게시글을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* 썸네일 배너 */}
      <ThumbnailBannerEdit
        thumbnailUrl={originalThumbnailUrl}
        thumbnailFile={form.thumbnail}
        title={form.title || '글 수정'}
        onThumbnailChange={handleThumbnailChange}
        onThumbnailRemove={handleThumbnailRemove}
      />
      <section className={styles.content}>
        {/* 컨텐츠 헤더 */}
        <header className={styles.header}>
          <a href={`/post/${slug}`} onClick={handleCancelClick} className={styles.backLink}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span>취소</span>
          </a>
          <h1 className={styles.pageTitle}>글 수정</h1>
          <div className={styles.headerActions}>
            <button
              type="button"
              onClick={toggleStatus}
              className={`${styles.statusToggle} ${form.status === 'PUBLIC' ? styles.public : ''}`}
            >
              {form.status === 'PUBLIC' ? (
                <>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  공개
                </>
              ) : (
                <>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  비공개
                </>
              )}
            </button>
          </div>
        </header>

        {/* 에러 메시지 */}
        {error && <div className={styles.errorMessage}>{error}</div>}

        {/* 공통 폼 컴포넌트 - EditorBase만 사용 */}
        <BlogForm
          form={form}
          fieldErrors={fieldErrors}
          contentLengthError={contentLengthError}
          isLoading={isLoading}
          groupedStacks={groupedStacks}
          isStacksLoading={isStacksLoading}
          onFieldUpdate={updateField}
          onTagAdd={addTag}
          onTagRemove={removeTag}
          onStackAdd={addStack}
          onStackRemove={removeStack}
          onStacksRefetch={refetchStacks}
          onSubmit={handleSubmit}
          onCancel={handleCancelClick}
          submitButtonText="수정하기"
        />

        {/* 저장되지 않은 변경사항 경고 모달 */}
        <UnsavedModal
          isOpen={showModal}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </section>
    </div>
  );
};