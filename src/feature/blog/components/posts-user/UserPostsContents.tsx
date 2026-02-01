import { usePreloadNavigate } from '@/shared/loading/usePreloadNavigate';
import { postApi } from '@/api/post/services';
import { postKeys } from '@/api/post/queries';
import { PostCard } from '../common/PostCard';
import type { PostItemResponse } from '@/api/post/types';
import styles from './UserPostsContents.module.css';

interface UserPostsContentsProps {
  posts: PostItemResponse[];
}

export const UserPostsContents = ({ posts }: UserPostsContentsProps) => {
  const preloadNavigate = usePreloadNavigate();

  const handlePostClick = (nickname: string, slug: string) => {
    preloadNavigate(
      `/user/${nickname}/entry/${slug}`,
      [...postKeys.publicDetail(nickname, slug)],
      () => postApi.getPublicPostByNicknameAndSlug(nickname, slug)
    );
  };

  if (posts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <h3 className={styles.emptyTitle}>아직 게시글이 없습니다</h3>
        <p className={styles.emptyDescription}>
          다른 검색어나 필터를 시도해보세요
        </p>
      </div>
    );
  }

  return (
    <div className={styles.postGrid}>
      {posts.map((post, index) => (
        <PostCard
          key={post.id}
          post={post}
          animationDelay={index * 0.06}
          onClick={() => handlePostClick(post.author.nickname, post.slug)}
        />
      ))}
    </div>
  );
};