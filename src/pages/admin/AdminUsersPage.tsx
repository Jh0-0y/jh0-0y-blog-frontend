import { Users } from 'lucide-react';
import styles from './ComingSoon.module.css';

export const AdminUsersPage = () => {
  return (
    <div className={styles.container}>
      <Users size={64} className={styles.icon} />
      <h1 className={styles.title}>사용자 관리</h1>
      <p className={styles.description}>준비중입니다.</p>
    </div>
  );
}