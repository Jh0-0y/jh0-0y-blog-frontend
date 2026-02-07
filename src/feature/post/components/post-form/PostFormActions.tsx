import styles from './PostFormActions.module.css';

interface PostFormActionsProps {
  mode: 'create' | 'edit';
  isLoading: boolean;
  isDisabled?: boolean;
  onCancel: () => void;
}

export const PostFormActions = ({
  mode,
  isLoading,
  isDisabled = false,
  onCancel,
}: PostFormActionsProps) => {
  const submitLabel = mode === 'create' ? '발행하기' : '수정하기';
  const loadingLabel = '저장 중...';

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <button
          type="button"
          onClick={onCancel}
          className={styles.cancelButton}
          disabled={isLoading}
        >
          취소
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading || isDisabled}
        >
          {isLoading ? loadingLabel : submitLabel}
        </button>
      </div>
    </div>
  );
};
