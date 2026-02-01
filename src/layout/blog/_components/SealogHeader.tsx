import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLogin } from 'react-icons/hi';
import { useAuthStore } from '@/feature/auth/stores/authStore';
import styles from './SealogHeader.module.css';
import { Anchor } from 'lucide-react';
import { useLoginModalStore } from '@/feature/auth/stores/loginModalStore';
import { ProfileDropdown } from './parts/ProfileDropDown';


interface SealogHeaderProps {
  onSidebarToggle?: () => void;
}

export const SealogHeader = ({ onSidebarToggle }: SealogHeaderProps) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { isAuthenticated } = useAuthStore();
  const { openLoginModal } = useLoginModalStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 로고 클릭 - 항상 사이드바 토글
  const handleLogoClick = () => {
    onSidebarToggle?.();
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleMemberClick = () => {
    navigate("/members");
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.content} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerBg} />
        
        {/* 왼쪽 영역 - 아이콘과 네비게이션 */}
        <div className={styles.leftSection}>
          <button 
            className={styles.logoWrapper} 
            onClick={handleLogoClick}
            aria-label="사이드바 열기"
          >
            <Anchor className={styles.shellIcon} />
          </button>

          <nav className={styles.nav}>
            <button 
              onClick={handleHomeClick} 
              className={styles.navButton}
            >
              Home
            </button>
            <button 
              onClick={handleMemberClick} 
              className={styles.navButton}
            >
              Members
            </button>
          </nav>
        </div>

        {/* 오른쪽 영역 - 로그인/프로필 */}
        <div className={styles.rightSection}>
          {isAuthenticated ? (
            <ProfileDropdown />
          ) : (
            <button
              onClick={openLoginModal}
              className={styles.authButton}
            >
              <HiOutlineLogin className={styles.authIcon} />
              <span>로그인</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};