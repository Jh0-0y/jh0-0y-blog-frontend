import { Outlet } from 'react-router-dom';
import styles from './UserEditorLayout.module.css';

export const UserEditorLayout = () => {

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};