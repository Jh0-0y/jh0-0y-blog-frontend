import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SealogHeader } from '../common';
import { UserFooter, UserSidebar } from './_components';
import styles from './UserPostsLayout.module.css';

export const UserPostsLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  // ESC 키로 사이드바 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        handleCloseSidebar();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isSidebarOpen]);

  // 사이드바 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isSidebarOpen) {
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
      <header className={styles.header}>
        <SealogHeader onSidebarToggle={handleToggleSidebar} />
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <UserFooter />
      </footer>

      <aside className={`${styles.aside} ${isSidebarOpen ? styles.open : ''}`}>
        <UserSidebar onCloseMobile={handleCloseSidebar} />
      </aside>

      {isSidebarOpen && (
        <div className={styles.overlay} onClick={handleCloseSidebar} />
      )}
    </div>
  );
};