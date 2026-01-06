import { Outlet } from 'react-router-dom';
import { Sidebar, WriteButton } from '../components';
import styles from './BlogLayout.module.css';

export const BlogLayout = () => {

  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.main}>
        <Outlet />
      </main>

      {/* 글쓰기 버튼 (FAB) */}
      <WriteButton />
    </div>
  );
};
