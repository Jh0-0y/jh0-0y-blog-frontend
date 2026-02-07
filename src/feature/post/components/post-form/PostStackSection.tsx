import { STACK_GROUP_LABELS, STACK_GROUP_ORDER } from '@/api/stack/types';
import { VALIDATION_LIMITS } from '@/feature/post/validations/post.validation';
import { useStacksForForm } from '@/feature/post/hooks/stack';
import styles from './PostStackSection.module.css';

interface StackSectionProps {
  selectedStacks: string[];
  fieldError: string | null;
  onStackAdd: (stack: string) => void;
  onStackRemove: (stack: string) => void;
}

export const PostStackSection = ({
  selectedStacks,
  fieldError,
  onStackAdd,
  onStackRemove,
}: StackSectionProps) => {
  const { groupedStacks, isLoading } = useStacksForForm();

  const handleStackToggle = (stackName: string) => {
    if (selectedStacks.includes(stackName)) {
      onStackRemove(stackName);
    } else {
      onStackAdd(stackName);
    }
  };

  return (
    <>
      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label}>
            스택 ({selectedStacks.length}/{VALIDATION_LIMITS.STACKS_MAX})
          </label>
        </div>

        {fieldError && <span className={styles.fieldError}>{fieldError}</span>}

        {isLoading ? (
          <div className={styles.stacksLoading}>스택 로딩중...</div>
        ) : groupedStacks ? (
          <div className={styles.stackGroups}>
            {STACK_GROUP_ORDER.map((group) => {
              const stacks = groupedStacks[group];
              if (!stacks || stacks.length === 0) return null;

              return (
                <div key={group} className={styles.stackGroup}>
                  <span className={styles.stackGroupLabel}>{STACK_GROUP_LABELS[group]}</span>
                  <div className={styles.stackButtons}>
                    {stacks.map((stack) => (
                      <button
                        key={stack.id}
                        type="button"
                        onClick={() => handleStackToggle(stack.name)}
                        className={`${styles.stackButton} ${selectedStacks.includes(stack.name) ? styles.active : ''}`}
                      >
                        {stack.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        {selectedStacks.length > 0 && (
          <div className={styles.selectedStacks}>
            {selectedStacks.map((stack) => (
              <span key={stack} className={styles.selectedStack}>
                {stack}
                <button type="button" onClick={() => onStackRemove(stack)} className={styles.stackRemove}>
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};