import type { Activity } from '@/api/portfolio/types';
import styles from './ActivitiesSection.module.css';

interface ActivitiesSectionProps {
  data: Activity[];
}

export const ActivitiesSection = ({ data }: ActivitiesSectionProps) => {
  return (
    <section id="activities" className={styles.section}>
      <h2 className={styles.sectionTitle}>Activities</h2>
      <div className={styles.activitiesContainer}>
        {data.map((activity) => (
          <div key={activity.id} className={styles.activityItem}>
            <div className={styles.activityLeft}>
              <h3 className={styles.activityTitle}>{activity.title}</h3>
              <p className={styles.description}>{activity.description}</p>
            </div>
            <div className={styles.activityRight}>
              <p className={styles.period}>{activity.period}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
