import { Link } from 'react-router-dom';
import styles from './AuthFooter.module.css';

interface AuthFooterProps {
  text: string;
  linkText: string;
  linkTo: string;
}

export const AuthFooter = ({ text, linkText, linkTo }: AuthFooterProps) => {
  return (
    <div className={styles.footer}>
      <p className={styles.footerText}>
        {text}{' '}
        <Link to={linkTo} className={styles.link}>
          {linkText}
        </Link>
      </p>
    </div>
  );
};