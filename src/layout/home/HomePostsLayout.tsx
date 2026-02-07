import { Outlet } from 'react-router-dom';
import { HomeHeader, HomeFooter, HomeBanner } from './_components';
import styles from './HomePostsLayout.module.css';


export const HomePostsLayout = () => {

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <HomeHeader />
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