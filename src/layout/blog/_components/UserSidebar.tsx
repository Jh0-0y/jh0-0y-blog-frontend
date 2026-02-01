import { SearchBar } from './parts/SearchBar';
import { ProfileCard } from './parts/ProfileCard';
import { StackList } from './parts/StackList';
import styles from './UserSidebar.module.css';

interface UserSidebarProps {
  onCloseMobile?: () => void;
}

export const UserSidebar = ({ onCloseMobile }: UserSidebarProps) => {
  return (
    <div className={styles.sidebar}>
      {/* 프로필 카드 */}
      <ProfileCard onNavigate={onCloseMobile} />

      {/* 검색 */}
      <SearchBar onSearch={onCloseMobile} />

      {/* 스크롤 영역 */}
      <StackList onStackSelect={onCloseMobile} />
    </div>
  );
};