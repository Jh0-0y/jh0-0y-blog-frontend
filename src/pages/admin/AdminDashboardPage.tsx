import { BarChart3 } from 'lucide-react';
import styles from './ComingSoon.module.css';

export const AdminDashboardPage = () => {
  return (
    <div className={styles.container}>
      <BarChart3 size={64} className={styles.icon} />
      <h1 className={styles.title}>대시보드</h1>
      <p className={styles.description}>준비중입니다.</p>
    </div>
  );
}