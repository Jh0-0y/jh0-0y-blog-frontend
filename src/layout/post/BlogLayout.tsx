import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { BlogFooter, BlogHeader, BlogSidebar } from './_components';
import styles from './BlogLayout.module.css';

export const BlogLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <BlogHeader />
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <BlogFooter />
      </footer>

      <aside className={`${styles.aside} ${isSidebarOpen ? styles.open :''}`}>
        <BlogSidebar />
      </aside>

      {isSidebarOpen && <div className={styles.overlay} onClick={handleCloseSidebar} />}
    </div>
  );
};