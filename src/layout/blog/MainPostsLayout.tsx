import { Outlet } from 'react-router-dom';
import { SealogFooter, SealogHeader } from './_components';
import { SealogBanner } from './_components/SealogBanner';
import styles from './MainPostsLayout.module.css';


export const MainPostsLayout = () => {

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <SealogHeader />
      </header>

      <div className={styles.banner}>
        <SealogBanner />
      </div>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <SealogFooter />
      </footer>
    </div>
  );
};