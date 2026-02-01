import { FileText } from 'lucide-react';
import styles from './ComingSoon.module.css';

export const AdminPostsPage = () => {
  return (
    <div className={styles.container}>
      <FileText size={64} className={styles.icon} />
      <h1 className={styles.title}>게시글 관리</h1>
      <p className={styles.description}>준비중입니다.</p>
    </div>
  );
}