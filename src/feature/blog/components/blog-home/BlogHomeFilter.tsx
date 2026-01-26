import type { PostType } from '@/api/post/types';
import styles from './BlogHomeFilter.module.css';

const POST_TYPE_TABS: { value: PostType | 'ALL'; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'CORE', label: 'Core' },
  { value: 'ARCHITECTURE', label: 'Architecture' },
  { value: 'TROUBLESHOOTING', label: 'Troubleshooting' },
  { value: 'ESSAY', label: 'Essay' },
];

interface BlogHomeFilterProps {
  currentPostType: PostType | 'ALL';
  totalCount: number;
  onTabClick: (type: PostType | 'ALL') => void;
}

export const BlogHomeFilter = ({
  currentPostType,
  totalCount,
  onTabClick,
}: BlogHomeFilterProps) => {
  return (
    <div className={styles.filterHeader}>
      <h2 className={styles.title}>
        Latest Posts <span className={styles.count}>({totalCount})</span>
      </h2>
      <nav className={styles.filterTabs}>
        {POST_TYPE_TABS.map((tab) => (
          <button
            key={tab.value}
            className={`${styles.filterBtn} ${currentPostType === tab.value ? styles.active : ''}`}
            onClick={() => onTabClick(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};