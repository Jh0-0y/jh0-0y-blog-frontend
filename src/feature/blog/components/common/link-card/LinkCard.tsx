import { HiExternalLink, HiGlobe } from 'react-icons/hi';
import styles from './LinkCard.module.css';

interface LinkCardProps {
  href: string;
  children?: React.ReactNode;
}

export const LinkCard = ({ href, children }: LinkCardProps) => {
  // URL 파싱
  const parseUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return {
        protocol: urlObj.protocol,
        domain: urlObj.hostname,
        path: urlObj.pathname + urlObj.search + urlObj.hash,
        fullUrl: url,
      };
    } catch {
      return {
        protocol: '',
        domain: url,
        path: '',
        fullUrl: url,
      };
    }
  };

  const { domain, path, fullUrl } = parseUrl(href);

  // 도메인에서 favicon URL 생성 (localhost는 기본 아이콘 사용)
  const isLocalhost = domain === 'localhost' || domain.startsWith('127.0.0.1') || domain.startsWith('192.168.');
  const faviconUrl = isLocalhost 
    ? '' 
    : `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

  // 링크 텍스트 (children이 있으면 사용, 없으면 domain 사용)
  const linkText = children || domain;

  return (
    <a
      href={fullUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.linkCard}
    >
      <div className={styles.iconWrapper}>
        {!isLocalhost && faviconUrl ? (
          <img
            src={faviconUrl}
            alt={`${domain} favicon`}
            className={styles.favicon}
            onError={(e) => {
              // favicon 로드 실패 시 기본 아이콘으로 대체
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const icon = parent.querySelector(`.${styles.defaultIcon}`) as HTMLElement;
                if (icon) icon.style.display = 'flex';
              }
            }}
          />
        ) : null}
        <div className={styles.defaultIcon} style={{ display: isLocalhost ? 'flex' : 'none' }}>
          <HiGlobe />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.title}>{linkText}</div>
        <div className={styles.url}>
          {domain}
          {path && <span className={styles.path}>{path}</span>}
        </div>
      </div>

      <div className={styles.externalIcon}>
        <HiExternalLink />
      </div>
    </a>
  );
};