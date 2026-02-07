import { Outlet } from 'react-router-dom';
import styles from './UserLayout.module.css';
import { UserHeader } from './_components';

export const UserLayout = () => {

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <UserHeader />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};