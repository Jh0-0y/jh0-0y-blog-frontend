import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components';
import styles from './BlogLayout.module.css';

export const BlogLayout = () => {

  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.main}>
        <Outlet />
      </main>

      {/* 글쓰기 버튼 (FAB) */}
      <button className={styles.writeButton}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span>글쓰기</span>
      </button>
    </div>
  );
};
