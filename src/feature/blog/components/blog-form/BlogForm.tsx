import { VALIDATION_LIMITS } from '@/feature/blog/utils/postValidation';
import { StackSection } from '@/feature/blog/components/blog-form/_parts/section/StackSection';
import { TagSection } from '@/feature/blog/components/blog-form/_parts/section/TagSection';

import type { PostType } from '@/feature/blog/types/post';
import type { GroupedStacks } from '@/feature/blog/types/stack';

import styles from './BlogForm.module.css';
import EditorBase from '../../../../components/editor/base/EditorBase';

const POST_TYPES: { value: PostType; label: string }[] = [
  { value: 'CORE', label: 'Core' },
  { value: 'ARCHITECTURE', label: 'Architecture' },
  { value: 'TROUBLESHOOTING', label: 'Troubleshooting' },
  { value: 'ESSAY', label: 'Essay' },
];

interface BlogPostFormData {
  title: string;
  excerpt: string;
  postType: PostType;
  content: string;
  stacks: string[];
  tags: string[];
}

interface BlogPostFormProps {
  form: BlogPostFormData;
  fieldErrors: Record<string, string> | null;
  contentLengthError: string | null;
  isLoading: boolean;
  groupedStacks: GroupedStacks | null;
  isStacksLoading: boolean;
  onFieldUpdate: <K extends keyof BlogPostFormData>(key: K, value: BlogPostFormData[K]) => void;
  onTagAdd: (tag: string) => void;
  onTagRemove: (tag: string) => void;
  onStackAdd: (stack: string) => void;
  onStackRemove: (stack: string) => void;
  onStacksRefetch: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  submitButtonText?: string;
}

export const BlogForm = ({
  form,
  fieldErrors,
  contentLengthError,
  isLoading,
  groupedStacks,
  isStacksLoading,
  onFieldUpdate,
  onTagAdd,
  onTagRemove,
  onStackAdd,
  onStackRemove,
  onStacksRefetch,
  onSubmit,
  onCancel,
  submitButtonText = '발행하기',
}: BlogPostFormProps) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {/* 포스트 타입 */}
      <div className={styles.field}>
        <label className={styles.label}>타입</label>
        <div className={styles.typeButtons}>
          {POST_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => onFieldUpdate('postType', type.value)}
              className={`${styles.typeButton} ${form.postType === type.value ? styles.active : ''}`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* 제목 */}
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
          onChange={(e) => onFieldUpdate('title', e.target.value)}
          placeholder="제목을 입력하세요"
          className={`${styles.titleInput} ${fieldErrors?.title ? styles.inputError : ''}`}
          maxLength={VALIDATION_LIMITS.TITLE_MAX}
        />
        {fieldErrors?.title && <span className={styles.fieldError}>{fieldErrors.title}</span>}
      </div>

      {/* 요약 */}
      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label}>요약</label>
          <span className={styles.charCount}>
            {form.excerpt.length}/{VALIDATION_LIMITS.EXCERPT_MAX}
          </span>
        </div>
        <textarea
          value={form.excerpt}
          onChange={(e) => onFieldUpdate('excerpt', e.target.value)}
          placeholder="글을 간단히 요약해주세요 (목록에 표시됩니다)"
          className={`${styles.excerptInput} ${fieldErrors?.excerpt ? styles.inputError : ''}`}
          rows={2}
          maxLength={VALIDATION_LIMITS.EXCERPT_MAX}
        />
        {fieldErrors?.excerpt && <span className={styles.fieldError}>{fieldErrors.excerpt}</span>}
      </div>

      {/* 스택 선택 */}
      <StackSection
        selectedStacks={form.stacks}
        groupedStacks={groupedStacks}
        isStacksLoading={isStacksLoading}
        fieldError={fieldErrors?.stacks ?? null}
        onStackAdd={onStackAdd}
        onStackRemove={onStackRemove}
        onStacksRefetch={onStacksRefetch}
      />

      {/* 태그 */}
      <TagSection
        tags={form.tags}
        fieldError={fieldErrors?.tags ?? null}
        onTagAdd={onTagAdd}
        onTagRemove={onTagRemove}
      />

      {/* 본문 에디터 */}
      <div className={styles.editorSection}>
        <div className={styles.labelRow}>
          <label className={styles.label}>본문</label>
          <span className={`${styles.charCount} ${contentLengthError ? styles.charCountError : ''}`}>
            {form.content.length}/{VALIDATION_LIMITS.CONTENT_MAX}
          </span>
        </div>
        {contentLengthError && (
          <span className={styles.fieldError}>{contentLengthError}</span>
        )}
        {fieldErrors?.content && !contentLengthError && (
          <span className={styles.fieldError}>{fieldErrors.content}</span>
        )}
        
        {/* EditorBase 그대로 사용 - 테스트 코드와 동일 */}
        <EditorBase
          editable={!isLoading}
          content={form.content}
          onUpdate={(value) => onFieldUpdate('content', value)}
          height="600px"
        />
      </div>

      {/* 하단 액션 */}
      <div className={styles.actions}>
        <a href="/" onClick={onCancel} className={styles.cancelButton}>
          취소
        </a>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading || !!contentLengthError}
        >
          {isLoading ? '저장 중...' : submitButtonText}
        </button>
      </div>
    </form>
  );
};