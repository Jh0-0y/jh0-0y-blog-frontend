import { type ButtonHTMLAttributes } from 'react';
import styles from './SubmitButton.module.css';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}

export const SubmitButton = ({
  isLoading = false,
  loadingText = '처리 중...',
  children,
  ...props
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={styles.submitButton}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className={styles.loadingWrapper}>
          <svg className={styles.spinner} viewBox="0 0 24 24">
            <circle
              className={styles.spinnerCircle}
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
          </svg>
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
};