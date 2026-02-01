import type { PostType } from '@/api/post/types';
import styles from './PostTypeSelector.module.css';

const POST_TYPES: { value: PostType; label: string }[] = [
  { value: 'CORE', label: 'Core' },
  { value: 'ARCHITECTURE', label: 'Architecture' },
  { value: 'TROUBLESHOOTING', label: 'Troubleshooting' },
  { value: 'ESSAY', label: 'Essay' },
];

interface PostTypeSelectorProps {
  value: PostType;
  onChange: (type: PostType) => void;
}

export const PostTypeSelector = ({ value, onChange }: PostTypeSelectorProps) => {
  return (
    <div className={styles.field}>
      <label className={styles.label}>타입</label>
      <div className={styles.typeButtons}>
        {POST_TYPES.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => onChange(type.value)}
            className={`${styles.typeButton} ${value === type.value ? styles.active : ''}`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
};
