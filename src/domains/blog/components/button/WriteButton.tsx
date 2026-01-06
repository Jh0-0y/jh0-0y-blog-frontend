import { useNavigate } from 'react-router-dom';
import styles from './WriteButton.module.css';

export const WriteButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/write');
  };

  return (
    <button className={styles.writeButton} onClick={handleClick}>
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
      <span>글쓰기</span>
    </button>
  );
};