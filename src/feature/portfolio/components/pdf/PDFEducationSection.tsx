import { View, Text } from '@react-pdf/renderer';
import type { Education } from '@/api/portfolio/types';
import { styles } from './styles';

interface PDFEducationSectionProps {
  data: Education[];
}

export const PDFEducationSection = ({ data }: PDFEducationSectionProps) => {
  return (
    <View style={styles.sectionWithBorder}>
      <Text style={styles.sectionTitle}>Education</Text>
      {data.map((edu) => (
        <View key={edu.id} style={styles.listItem}>
          <View style={styles.listLeft}>
            <Text style={styles.listTitle}>{edu.institution}</Text>
            <Text style={styles.listDesc}>{edu.description}</Text>
          </View>
          <View style={styles.listRight}>
            <Text style={styles.listPeriod}>{edu.period}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};