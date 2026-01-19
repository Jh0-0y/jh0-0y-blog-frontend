import { SearchBar } from './parts/SearchBar';
import { ProfileCard } from './parts/ProfileCard';
import { StackList } from './parts/StackList';
import styles from './BlogSidebar.module.css';

export const BlogSidebar = () => {
  return (
      <div className={styles.sidebar} >
        {/* 프로필 카드 */}
        <ProfileCard />

        {/* 검색 */}
        <SearchBar />

        {/* 스크롤 영역 */}
        <StackList />
      </div>
  );
};