import { useNavigate } from 'react-router-dom';
import { usePosts } from '@/feature/post/hooks/post/usePosts';
import type { PostType } from '@/api/post/types';
import { 
  HomePostsFilter,
  HomePostsContents
} from '@/feature/post/components/posts-home';
import { Pagination } from '@/shared/pagination/Pagination';
import { SwimmingDolphin } from '@/shared/dolphin/SwimmingDolphin';
import styles from './HomePostsPage.module.css';

export const HomePostsPage = () => {
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
          <HomePostsFilter
            currentPostType={currentPostType}
            totalCount={pagination.totalElements}
            onTabClick={handleTabClick}
          />
        </div>

        {/* 컨텐츠 */}
        <div className={styles.contentsWrapper}>
          <HomePostsContents posts={posts} />
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