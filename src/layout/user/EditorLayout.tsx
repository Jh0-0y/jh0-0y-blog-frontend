import { Outlet } from 'react-router-dom';
import styles from './EditorLayout.module.css';

export const EditorLayout = () => {

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};