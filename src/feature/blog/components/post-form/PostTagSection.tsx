import { useState } from 'react';
import { VALIDATION_LIMITS } from '@/feature/blog/validations/post.validation';

import styles from './PostTagSection.module.css';

interface TagSectionProps {
  tags: string[];
  fieldError: string | null;
  onTagAdd: (tag: string) => void;
  onTagRemove: (tag: string) => void;
}

export const PostTagSection = ({
  tags,
  fieldError,
  onTagAdd,
  onTagRemove,
}: TagSectionProps) => {
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    setTagInput('');
    if (trimmed) {
      onTagAdd(trimmed);
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = tagInput.trim();
      setTagInput('');
      if (trimmed) {
        onTagAdd(trimmed);
      }
    }
  };

  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label className={styles.label}>태그 ({tags.length}/{VALIDATION_LIMITS.TAGS_MAX})</label>
      </div>
      {fieldError && <span className={styles.fieldError}>{fieldError}</span>}
      <div className={styles.tagInputWrapper}>
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          placeholder="태그 입력 후 Enter"
          className={styles.tagInput}
        />
        <button type="button" onClick={handleAddTag} className={styles.tagAddButton}>
          추가
        </button>
      </div>
      {tags.length > 0 && (
        <div className={styles.tagList}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
              <button type="button" onClick={() => onTagRemove(tag)} className={styles.tagRemove}>
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};