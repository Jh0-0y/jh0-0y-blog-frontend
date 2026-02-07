import type { SkillCategory } from '@/api/portfolio/types';
import styles from './SkillsSection.module.css';

interface SkillsSectionProps {
  data: SkillCategory[];
}

export const SkillsSection = ({ data }: SkillsSectionProps) => {
  return (
    <section id="skills" className={styles.section}>
      <h2 className={styles.sectionTitle}>Skills</h2>
      <div className={styles.skillsContainer}>
        {data.map((category, idx) => (
          <div key={idx} className={styles.skillRow}>
            <span className={styles.categoryName}>{category.category}</span>
            <span className={styles.separator}>.</span>
            <span className={styles.skillList}>
              {category.skills.join(', ')}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
