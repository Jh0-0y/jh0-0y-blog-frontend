import { Anchor } from 'lucide-react';
import styles from './UserFooter.module.css';

export const UserFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.container}>
        <footer className={styles.footer}>
          <div className={styles.footerLogo}>
            <Anchor size={24} className={styles.footerLogoIcon} />
            <span className={styles.footerLogoText}>sealog.dev</span>
          </div>
          <p className={styles.footerDescription}>
            깊이 있는 개발 지식을 함께 나누는 공간
          </p>
          <p className={styles.footerCopyright}>
            © {currentYear} sealog.dev All rights reserved.
          </p>
        </footer>
    </div>
  );
};