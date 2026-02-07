import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { useTheme } from './useTheme';
import styles from './ThemeToggle.module.css';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.toggleButton}
      onClick={toggleTheme}
      aria-label="테마 전환"
    >
      {theme === 'light' ? (
        <HiOutlineSun className={styles.icon} />
      ) : (
        <HiOutlineMoon className={styles.icon} />
      )}
    </button>
  );
};
