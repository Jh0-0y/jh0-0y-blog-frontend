import { useNavigate } from 'react-router-dom';
import { usePosts } from '@/feature/blog/hooks/post/usePosts';
import type { PostType } from '@/api/post/types';
import { 
  PostsFilter,
  PostsContents
} from '@/feature/blog/components/posts-home';
import { Pagination } from '@/shared/pagination/Pagination';
import styles from './MainPostsPage.module.css';
import { SwimmingDolphin } from '@/shared/dolphin/SwimmingDolphin';

export const MainPostsPage = () => {
  const navigate = useNavigate();
  const { posts, pagination, filter, setPage } = usePosts();

  const currentPostType = filter.postType || 'ALL';

  const handleTabClick = (type: PostType | 'ALL') => {
    if (type === 'ALL') {
      navigate('/');
    } else {
      navigate(`/type/${type.toLowerCase()}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sectionWrapper}>
        <SwimmingDolphin />
        {/* 필터 */}
        <div className={styles.filterWrapper}>
          <PostsFilter
            currentPostType={currentPostType}
            totalCount={pagination.totalElements}
            onTabClick={handleTabClick}
          />
        </div>

        {/* 컨텐츠 */}
        <div className={styles.contentsWrapper}>
          <PostsContents posts={posts} />
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