import { Link } from 'react-router-dom';
import { formatDate } from '@/feature/blog/utils';
import { POST_TYPE_COLORS, POST_TYPE_ICONS } from '@/feature/blog/constants/PostTypeStyle';
import styles from './RelatedPosts.module.css';

interface RelatedPost {
  id: number;
  slug: string;
  postType: string;
  title: string;
  excerpt: string;
  thumbnailUrl: string | null;
  stacks: string[];
  createdAt: string;
}

interface RelatedPostsProps {
  relatedPosts: RelatedPost[];
}

export const RelatedPosts = ({ relatedPosts }: RelatedPostsProps) => {
  if (!relatedPosts || relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>📚 관련 게시글</h2>
      <div className={styles.grid}>
        {relatedPosts.map((post) => (
          <Link key={post.id} to={`/post/${post.slug}`} className={styles.card}>
            {/* 썸네일 */}
            <div
              className={styles.thumbnail}
              style={{
                background: post.thumbnailUrl
                  ? `url(${post.thumbnailUrl}) center/cover`
                  : POST_TYPE_COLORS[post.postType]?.bg,
              }}
            >
              {!post.thumbnailUrl && (
                <span
                  className={styles.icon}
                  style={{ color: POST_TYPE_COLORS[post.postType]?.text }}
                >
                  {POST_TYPE_ICONS[post.postType]}
                </span>
              )}
            </div>

            {/* 카드 내용 */}
            <div className={styles.content}>
              <span className={styles.type}>{post.postType}</span>
              <h3 className={styles.cardTitle}>{post.title}</h3>
              <p className={styles.excerpt}>{post.excerpt}</p>

              {/* 스택 */}
              {post.stacks.length > 0 && (
                <div className={styles.stacks}>
                  {post.stacks.slice(0, 2).map((stack) => (
                    <span key={stack} className={styles.stack}>
                      {stack}
                    </span>
                  ))}
                  {post.stacks.length > 2 && (
                    <span className={styles.stackMore}>+{post.stacks.length - 2}</span>
                  )}
                </div>
              )}

              {/* 날짜 */}
              <span className={styles.date}>{formatDate(post.createdAt)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};