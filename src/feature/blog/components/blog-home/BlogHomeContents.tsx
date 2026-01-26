import { usePreloadNavigate } from '@/shared/loading/usePreloadNavigate';
import { postApi } from '@/api/post/services';
import { postKeys } from '@/api/post/queries';
import { formatDate } from '@/feature/blog/utils';
import { POST_TYPE_COLORS, POST_TYPE_ICONS } from '@/feature/blog/constants/PostTypeStyle';
import styles from './BlogHomeContents.module.css';

interface Post {
  id: number;
  slug: string;
  postType: string;
  title: string;
  excerpt: string;
  thumbnailUrl: string | null;
  stacks: string[];
  tags: string[];
  createdAt: string;
}

interface BlogHomeContentsProps {
  posts: Post[];
}

export const BlogHomeContents = ({ posts }: BlogHomeContentsProps) => {
  const preloadNavigate = usePreloadNavigate();

  const handlePostClick = (slug: string) => {
    preloadNavigate(
      `/post/${slug}`,
      [...postKeys.publicDetail(slug)],  // spread로 mutable 배열로 변환
      () => postApi.getPublicPostBySlug(slug)
    );
  };

  if (posts.length === 0) {
    return (
      <div className={styles.noResults}>
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <h3>검색 결과가 없습니다</h3>
        <p>다른 검색어나 필터를 시도해보세요.</p>
      </div>
    );
  }

  return (
    <div className={styles.postGrid}>
      {posts.map((post, index) => (
        <article
          key={post.id}
          className={styles.postCard}
          style={{ animationDelay: `${index * 0.05}s` }}
          onClick={() => handlePostClick(post.slug)}
        >
          {/* 썸네일 영역 */}
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
                className={styles.thumbnailIcon}
                style={{ color: POST_TYPE_COLORS[post.postType]?.text }}
              >
                {POST_TYPE_ICONS[post.postType]}
              </span>
            )}
          </div>

          {/* 콘텐츠 영역 */}
          <div className={styles.cardContent}>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postExcerpt}>{post.excerpt}</p>

            {post.stacks.length > 0 && (
              <div className={styles.postStacks}>
                {post.stacks.slice(0, 3).map((stack) => (
                  <span key={stack} className={styles.stackBadge}>
                    {stack}
                  </span>
                ))}
                {post.stacks.length > 3 && (
                  <span className={styles.stackMore}>+{post.stacks.length - 3}</span>
                )}
              </div>
            )}

            <div className={styles.cardFooter}>
              <div className={styles.postTags}>
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className={styles.tagText}>
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 2 && <span className={styles.tagMore}>...</span>}
              </div>
              <span className={styles.postDate}>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};