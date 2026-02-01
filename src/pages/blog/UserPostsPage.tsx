import { useParams, useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { useUserPosts } from '@/feature/blog/hooks/post/useUserPosts';
import type { PostType } from '@/api/post/types';
import { 
  UserPostsFilter,
  UserPostsContents
} from '@/feature/blog/components/posts-user';
import { Pagination } from '@/shared/pagination/Pagination';
import styles from './UserPostsPage.module.css';
import { SwimmingDolphin } from '@/shared/dolphin/SwimmingDolphin';

export const UserPostsPage = () => {
  const navigate = useNavigate();
  const params = useParams<{ nickname: string; postType?: string; stack?: string }>();
  const [searchParams] = useSearchParams();
  const { posts, pagination, filter, isError, setPage } = useUserPosts();

  const nickname = params.nickname ?? '';
  const currentPostType = filter.postType || 'ALL';

  // 에러 시 404
  if (isError) {
    return <Navigate to="/404" replace />;
  }

  const handleTabClick = (type: PostType | 'ALL') => {
    const keyword = searchParams.get('q');
    const { stack } = params;

    let basePath = `/user/${nickname}`;

    if (stack) {
      basePath = type === 'ALL' 
        ? `/user/${nickname}/stack/${stack}` 
        : `/user/${nickname}/stack/${stack}/type/${type.toLowerCase()}`;
    } else {
      basePath = type === 'ALL' 
        ? `/user/${nickname}` 
        : `/user/${nickname}/type/${type.toLowerCase()}`;
    }

    navigate(keyword ? `${basePath}?q=${keyword}` : basePath);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sectionWrapper}>
        <SwimmingDolphin />
        <SwimmingDolphin />
        {/* 필터 */}
        <div className={styles.filterWrapper}>
          <UserPostsFilter
            currentPostType={currentPostType}
            totalCount={pagination.totalElements}
            onTabClick={handleTabClick}
          />
        </div>

        {/* 컨텐츠 */}
        <div className={styles.contentsWrapper}>
          <UserPostsContents posts={posts} />
        </div>

        {/* 페이지네이션 */}
        {pagination.totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
              hasNext={pagination.hasNext}
              hasPrevious={pagination.hasPrevious}
            />
          </div>
        )}
      </div>
    </div>
  );
};