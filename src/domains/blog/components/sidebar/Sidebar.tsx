import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { SearchBar } from './SearchBar';

export const Sidebar = () => {
  return (
    <>
      {/* 모바일 오버레이 */}
      <div className={styles.overlay} />

      <aside className={`${styles.sidebar} ${styles.open}`}>
        {/* 로고/홈 */}
        <div className={styles.header}>
          <Link to="/blog" className={styles.logo}>
            hyunyoung.dev
          </Link>
          <p className={styles.subtitle}>Junior Backend Developer</p>
        </div>

        {/* 검색 */}
        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>

        {/* 스크롤 영역 */}
        <div className={styles.scrollArea}>
          {/* 인기 태그 */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Popular Tags</h3>
            <div className={styles.popularTags}>
              <button className={`${styles.popularTag} ${styles.active}`}>
                <span className={styles.tagRank}>1</span>
                <span className={styles.tagName}>Spring Boot</span>
                <span className={styles.tagCount}>12</span>
              </button>
              <button className={styles.popularTag}>
                <span className={styles.tagRank}>2</span>
                <span className={styles.tagName}>React</span>
                <span className={styles.tagCount}>8</span>
              </button>
              <button className={styles.popularTag}>
                <span className={styles.tagRank}>3</span>
                <span className={styles.tagName}>WebSocket</span>
                <span className={styles.tagCount}>5</span>
              </button>
              <button className={styles.popularTag}>
                <span className={styles.tagRank}>4</span>
                <span className={styles.tagName}>Redis</span>
                <span className={styles.tagCount}>4</span>
              </button>
              <button className={styles.popularTag}>
                <span className={styles.tagRank}>5</span>
                <span className={styles.tagName}>Docker</span>
                <span className={styles.tagCount}>3</span>
              </button>
            </div>
          </div>

          {/* 전체 태그 */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>All Tags</h3>

            {/* Language 그룹 */}
            <div className={styles.tagGroup}>
              <div className={styles.groupHeader}>
                <span className={`${styles.groupDot} ${styles.language}`} />
                <span className={styles.groupLabel}>Language</span>
              </div>
              <div className={styles.groupTags}>
                <button className={`${styles.tag} ${styles.active}`}>
                  <span>Java</span>
                  <span className={styles.tagCountSmall}>10</span>
                </button>
                <button className={styles.tag}>
                  <span>TypeScript</span>
                  <span className={styles.tagCountSmall}>6</span>
                </button>
                <button className={styles.tag}>
                  <span>JavaScript</span>
                  <span className={styles.tagCountSmall}>4</span>
                </button>
              </div>
            </div>

            {/* Framework 그룹 */}
            <div className={styles.tagGroup}>
              <div className={styles.groupHeader}>
                <span className={`${styles.groupDot} ${styles.framework}`} />
                <span className={styles.groupLabel}>Framework</span>
              </div>
              <div className={styles.groupTags}>
                <button className={styles.tag}>
                  <span>Spring Boot</span>
                  <span className={styles.tagCountSmall}>12</span>
                </button>
                <button className={styles.tag}>
                  <span>React</span>
                  <span className={styles.tagCountSmall}>8</span>
                </button>
                <button className={styles.tag}>
                  <span>JPA</span>
                  <span className={styles.tagCountSmall}>3</span>
                </button>
              </div>
            </div>

            {/* Area 그룹 */}
            <div className={styles.tagGroup}>
              <div className={styles.groupHeader}>
                <span className={`${styles.groupDot} ${styles.area}`} />
                <span className={styles.groupLabel}>Area</span>
              </div>
              <div className={styles.groupTags}>
                <button className={styles.tag}>
                  <span>Backend</span>
                  <span className={styles.tagCountSmall}>15</span>
                </button>
                <button className={styles.tag}>
                  <span>Frontend</span>
                  <span className={styles.tagCountSmall}>8</span>
                </button>
                <button className={styles.tag}>
                  <span>DevOps</span>
                  <span className={styles.tagCountSmall}>4</span>
                </button>
              </div>
            </div>

            {/* Topic 그룹 */}
            <div className={styles.tagGroup}>
              <div className={styles.groupHeader}>
                <span className={`${styles.groupDot} ${styles.topic}`} />
                <span className={styles.groupLabel}>Topic</span>
              </div>
              <div className={styles.groupTags}>
                <button className={styles.tag}>
                  <span>WebSocket</span>
                  <span className={styles.tagCountSmall}>5</span>
                </button>
                <button className={styles.tag}>
                  <span>Redis</span>
                  <span className={styles.tagCountSmall}>4</span>
                </button>
                <button className={styles.tag}>
                  <span>MSA</span>
                  <span className={styles.tagCountSmall}>2</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 모바일 닫기 버튼 */}
        <button className={styles.closeButton}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </aside>
    </>
  );
};