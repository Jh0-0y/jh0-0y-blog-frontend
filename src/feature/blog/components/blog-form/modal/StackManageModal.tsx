import { useState } from 'react';
import { stackApi } from '@/feature/blog/api/stack.api';
import { STACK_GROUP_LABELS, STACK_GROUP_ORDER } from '@/feature/blog/types/stack/stack.enums';
import type { StackGroup } from '@/feature/blog/types/stack/stack.enums';
import type { StackResponse } from '@/feature/blog/types/stack/stack.response';
import { useToast } from '@/hooks/toast/useToast';
import styles from './StackManageModal.module.css';

interface StackManageModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupedStacks: Record<StackGroup, StackResponse[]> | null;
  onStacksChange: () => void;
}

export const StackManageModal = ({
  isOpen,
  onClose,
  groupedStacks,
  onStacksChange,
}: StackManageModalProps) => {
  const toast = useToast();

  // 새 스택 추가 폼
  const [newStackName, setNewStackName] = useState('');
  const [newStackGroup, setNewStackGroup] = useState<StackGroup>('LANGUAGE');
  const [isAdding, setIsAdding] = useState(false);

  // 삭제 중인 스택 ID
  const [deletingId, setDeletingId] = useState<number | null>(null);

  if (!isOpen) return null;

  // 스택 추가
  const handleAddStack = async () => {
    const trimmed = newStackName.trim();
    if (!trimmed) {
      toast.error('스택 이름을 입력해주세요');
      return;
    }

    setIsAdding(true);
    try {
      const response = await stackApi.createStack({
        name: trimmed,
        stackGroup: newStackGroup,
      });

      if (response.success) {
        toast.success(`${trimmed} 스택이 추가되었습니다`);
        setNewStackName('');
        onStacksChange();
      }
    } catch {
      toast.error('스택 추가에 실패했습니다');
    } finally {
      setIsAdding(false);
    }
  };

  // 스택 삭제
  const handleDeleteStack = async (stack: StackResponse) => {
    if (!confirm(`"${stack.name}" 스택을 삭제하시겠습니까?`)) return;

    setDeletingId(stack.id);
    try {
      const response = await stackApi.deleteStack(stack.id);

      if (response.success) {
        toast.success(`${stack.name} 스택이 삭제되었습니다`);
        onStacksChange();
      }
    } catch {
      toast.error('스택 삭제에 실패했습니다');
    } finally {
      setDeletingId(null);
    }
  };

  // Enter 키 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddStack();
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <div className={styles.header}>
          <h2 className={styles.title}>스택 관리</h2>
          <button type="button" onClick={onClose} className={styles.closeButton}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 새 스택 추가 */}
        <div className={styles.addSection}>
          <h3 className={styles.sectionTitle}>새 스택 추가</h3>
          <div className={styles.addForm}>
            <select
              value={newStackGroup}
              onChange={(e) => setNewStackGroup(e.target.value as StackGroup)}
              className={styles.groupSelect}
            >
              {STACK_GROUP_ORDER.map((group) => (
                <option key={group} value={group}>
                  {STACK_GROUP_LABELS[group]}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newStackName}
              onChange={(e) => setNewStackName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="스택 이름"
              className={styles.nameInput}
            />
            <button
              type="button"
              onClick={handleAddStack}
              disabled={isAdding || !newStackName.trim()}
              className={styles.addButton}
            >
              {isAdding ? '추가 중...' : '추가'}
            </button>
          </div>
        </div>

        {/* 스택 목록 */}
        <div className={styles.listSection}>
          <h3 className={styles.sectionTitle}>등록된 스택</h3>
          <div className={styles.stackList}>
            {groupedStacks &&
              STACK_GROUP_ORDER.map((group) => {
                const stacks = groupedStacks[group];
                if (!stacks || stacks.length === 0) return null;

                return (
                  <div key={group} className={styles.stackGroup}>
                    <div className={styles.groupLabel}>{STACK_GROUP_LABELS[group]}</div>
                    <div className={styles.stackItems}>
                      {stacks.map((stack) => (
                        <div key={stack.id} className={styles.stackItem}>
                          <span className={styles.stackName}>{stack.name}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteStack(stack)}
                            disabled={deletingId === stack.id}
                            className={styles.deleteButton}
                          >
                            {deletingId === stack.id ? (
                              '...'
                            ) : (
                              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};