import { formatDate } from '@/feature/blog/utils';
import styles from './BlogDetailHeader.module.css';

interface BlogDetailHeaderProps {
  postType: string;
  title: string;
  stacks: string[];
  tags: string[];
  createdAt: string;
  author?: string;
}

export const BlogDetailHeader = ({
  postType,
  title,
  stacks,
  tags,
  createdAt,
  author = '정현영',
}: BlogDetailHeaderProps) => {
  return (
    <header className={styles.header}>
      <span className={styles.postType}>{postType}</span>
      <h1 className={styles.title}>{title}</h1>

      {/* 스택 */}
      {stacks.length > 0 && (
        <div className={styles.stacks}>
          {stacks.map((stack) => (
            <span key={stack} className={styles.stack}>
              {stack}
            </span>
          ))}
        </div>
      )}

      {/* 태그 */}
      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 메타 정보 */}
      <div className={styles.meta}>
        <span className={styles.author}>{author}</span>
        <span className={styles.dot}>·</span>
        <span>{formatDate(createdAt)}</span>
      </div>
    </header>
  );
};