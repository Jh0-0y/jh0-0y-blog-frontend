import { Outlet } from 'react-router-dom';
import { SealogHeader } from '../common';
import { HomeFooter, HomeBanner } from './_components';
import styles from './HomePostsLayout.module.css';


export const HomePostsLayout = () => {

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <SealogHeader />
      </header>

      <div className={styles.banner}>
        <HomeBanner />
      </div>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <HomeFooter />
      </footer>
    </div>
  );
};