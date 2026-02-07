import type { Certificate } from '@/api/portfolio/types';
import styles from './CertificatesSection.module.css';

interface CertificatesSectionProps {
  data: Certificate[];
}

export const CertificatesSection = ({ data }: CertificatesSectionProps) => {
  return (
    <section id="certificates" className={styles.section}>
      <h2 className={styles.sectionTitle}>Certificates</h2>
      <div className={styles.certificatesContainer}>
        {data.map((cert) => (
          <div key={cert.id} className={styles.certificateItem}>
            <div className={styles.certificateLeft}>
              <h3 className={styles.certName}>{cert.name}</h3>
              <p className={styles.organization}>{cert.organization}</p>
            </div>
            <div className={styles.certificateRight}>
              <p className={styles.date}>{cert.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
