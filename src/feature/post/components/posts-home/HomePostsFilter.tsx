import { Waves } from 'lucide-react';
import type { PostType } from '@/api/post/types';
import styles from './HomePostsFilter.module.css';

const POST_TYPE_TABS: { value: PostType | 'ALL'; label: string; description: string }[] = [
  { value: 'ALL', label: '전체', description: '모든 글' },
  { value: 'CORE', label: 'Core', description: '핵심 개념' },
  { value: 'ARCHITECTURE', label: 'Architecture', description: '설계 패턴' },
  { value: 'TROUBLESHOOTING', label: 'Troubleshooting', description: '문제 해결' },
  { value: 'ESSAY', label: 'Essay', description: '개발 에세이' },
];

interface HomePostsFilterProps {
  currentPostType: PostType | 'ALL';
  totalCount: number;
  onTabClick: (type: PostType | 'ALL') => void;
}

export const HomePostsFilter = ({
  currentPostType,
  totalCount,
  onTabClick,
}: HomePostsFilterProps) => {

  return (
    <div className={styles.filterContainer}>
      {/* 헤더 섹션 */}
      <header className={styles.headerSection}>
        <div className={styles.titleWrapper}>
          <div className={styles.iconWrapper}>
            <Waves size={32} className={styles.titleIcon} />
            <div className={styles.iconGlow} />
          </div>
          <div className={styles.titleContent}>
            <h1 className={styles.title}>선원들의 항해 일지</h1>
            <p className={styles.subtitle}>
              깊은 바다처럼 깊이 있는 <span className={styles.count}>{totalCount}</span>개의 개발 이야기
            </p>
          </div>
        </div>
      </header>

      {/* 카테고리 탭 */}
      <nav className={styles.categoryNav}>
        <div className={styles.categoryTabs}>
          {POST_TYPE_TABS.map((tab) => (
            <button
              key={tab.value}
              className={`${styles.categoryTab} ${currentPostType === tab.value ? styles.active : ''}`}
              onClick={() => onTabClick(tab.value)}
              aria-pressed={currentPostType === tab.value}
            >
              <span className={styles.tabLabel}>{tab.label}</span>
              <span className={styles.tabDescription}>{tab.description}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};