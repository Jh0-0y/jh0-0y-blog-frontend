import styles from './SearchBar.module.css';

export const SearchBar = () => {

  return (
    <div className={styles.searchBar}>
      <div className={styles.iconWrapper}>
        <svg
          className={styles.searchIcon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type="text"
        className={styles.input}
      />

      <div className={styles.actions}>
          <button className={styles.clearButton} type="button">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        <kbd className={styles.shortcut}>⌘K</kbd>
      </div>
    </div>
  );
};
