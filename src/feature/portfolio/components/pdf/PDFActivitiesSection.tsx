import { View, Text } from '@react-pdf/renderer';
import type { Activity } from '@/api/portfolio/types';
import { styles } from './styles';

interface PDFActivitiesSectionProps {
  data: Activity[];
}

export const PDFActivitiesSection = ({ data }: PDFActivitiesSectionProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Activities</Text>
      {data.map((activity) => (
        <View key={activity.id} style={styles.listItem}>
          <View style={styles.listLeft}>
            <Text style={styles.listTitle}>{activity.title}</Text>
            <Text style={styles.listDesc}>{activity.description}</Text>
          </View>
          <View style={styles.listRight}>
            <Text style={styles.listPeriod}>{activity.period}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};