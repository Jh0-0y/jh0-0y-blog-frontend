import { useNavigate } from 'react-router-dom';
import { HiHome, HiPencilAlt, HiChat } from 'react-icons/hi';
import styles from './ProfileCard.module.css';

export const ProfileCard = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleWriteClick = () => {
    navigate('/write');
  };

  const handleGuestbookClick = () => {
    navigate('/guestbook');
  };

  return (
    <div className={styles.profileCard}>
      {/* 배경 배너 */}
      <div className={styles.profileBanner} />

      {/* 프로필 이미지 */}
      <div className={styles.profileAvatar}>
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=developer"
          alt="프로필"
          className={styles.avatarImg}
        />
      </div>

      {/* 콘텐츠 */}
      <div className={styles.profileContent}>
        <h2 className={styles.profileName}>Jh0-0y</h2>

        {/* 액션 버튼들 */}
        <div className={styles.profileActions}>
          <button
            onClick={handleHomeClick}
            className={styles.actionButton}
            aria-label="홈"
          >
            <HiHome />
          </button>

          <button
            onClick={handleWriteClick}
            className={`${styles.actionButton} ${styles.primary}`}
            aria-label="글쓰기"
          >
            <HiPencilAlt />
          </button>

          <button
            onClick={handleGuestbookClick}
            className={styles.actionButton}
            aria-label="방명록"
          >
            <HiChat />
          </button>
        </div>
      </div>
    </div>
  );
};