import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { UserHeader, UserFooter, UserSidebar, UserBanner } from './_components';
import styles from './PostsLayout.module.css';

export const PostsLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  // ESC 키로 사이드바 닫기 (모바일에서만)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        handleCloseSidebar();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isSidebarOpen]);

  // 사이드바 열릴 때 body 스크롤 방지 (모바일에서만)
  useEffect(() => {
    if (isSidebarOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  return (
    <div className={styles.layout}>
      {/* 사이드바 - 1024px 이상에서는 항상 표시 */}
      <aside className={`${styles.aside} ${isSidebarOpen ? styles.open : ''}`}>
        <UserSidebar onCloseMobile={handleCloseSidebar} />
      </aside>

      {/* 메인 컨테이너 - 1024px 이상에서는 사이드바 크기만큼 이동 */}
      <div className={styles.mainContainer}>
        <header className={styles.header}>
          <UserHeader onSidebarToggle={handleToggleSidebar} />
        </header>

        <div className={styles.banner}>
          <UserBanner />
        </div>

        <main className={styles.main}>
          <Outlet />
        </main>

        <footer className={styles.footer}>
          <UserFooter />
        </footer>
      </div>

      {/* 오버레이 - 모바일에서만 표시 */}
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={handleCloseSidebar} />
      )}
    </div>
  );
};