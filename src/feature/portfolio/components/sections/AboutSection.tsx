import type { About } from '@/api/portfolio/types';
import { Mail, Github, FileText } from 'lucide-react';
import styles from './AboutSection.module.css';

interface AboutSectionProps {
  data: About;
}

export const AboutSection = ({ data }: AboutSectionProps) => {
  return (
    <section id="about" className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.profileRow}>
          <img
            src={data.profileImage}
            alt="Profile"
            className={styles.profileImage}
          />
          <div className={styles.nameInfo}>
            <h1 className={styles.name}>{data.name}</h1>
            <p className={styles.title}>{data.title}</p>
          </div>
        </div>
        <div className={styles.introduction}>
          <p className={styles.slogan}>"{data.slogan}"</p>
          <p className={styles.description}>{data.introduction}</p>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.contactItem}>
          <Mail className={styles.contactIcon} size={16} />
          <a href={`mailto:${data.email}`} className={styles.contactLink}>
            {data.email}
          </a>
        </div>
        <div className={styles.contactItem}>
          <Github className={styles.contactIcon} size={16} />
          <a
            href={data.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            {data.githubUrl}
          </a>
        </div>
        <div className={styles.contactItem}>
          <FileText className={styles.contactIcon} size={16} />
          <a
            href={data.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            {data.blogUrl}
          </a>
        </div>
      </div>
    </section>
  );
};