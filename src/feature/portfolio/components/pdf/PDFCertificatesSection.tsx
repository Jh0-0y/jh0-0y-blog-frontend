import { View, Text } from '@react-pdf/renderer';
import type { Certificate } from '@/api/portfolio/types';
import { styles } from './styles';

interface PDFCertificatesSectionProps {
  data: Certificate[];
}

export const PDFCertificatesSection = ({ data }: PDFCertificatesSectionProps) => {
  return (
    <View style={styles.sectionWithBorder}>
      <Text style={styles.sectionTitle}>Certificates</Text>
      {data.map((cert) => (
        <View key={cert.id} style={styles.listItem}>
          <View style={styles.listLeft}>
            <Text style={styles.listTitle}>{cert.name}</Text>
            <Text style={styles.listDesc}>{cert.organization}</Text>
          </View>
          <View style={styles.listRight}>
            <Text style={styles.listPeriod}>{cert.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};