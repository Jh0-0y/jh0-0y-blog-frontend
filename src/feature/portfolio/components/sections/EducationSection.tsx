import type { Education } from '@/api/portfolio/types';
import styles from './EducationSection.module.css';

interface EducationSectionProps {
  data: Education[];
}

export const EducationSection = ({ data }: EducationSectionProps) => {
  return (
    <section id="education" className={styles.section}>
      <h2 className={styles.sectionTitle}>Education</h2>
      <div className={styles.educationContainer}>
        {data.map((edu) => (
          <div key={edu.id} className={styles.educationItem}>
            <div className={styles.educationLeft}>
              <h3 className={styles.institution}>{edu.institution}</h3>
              <p className={styles.description}>{edu.description}</p>
            </div>
            <div className={styles.educationRight}>
              <p className={styles.period}>{edu.period}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
