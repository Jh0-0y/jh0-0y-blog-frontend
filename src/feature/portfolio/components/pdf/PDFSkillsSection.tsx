import { View, Text } from '@react-pdf/renderer';
import type { SkillCategory } from '@/api/portfolio/types';
import { styles } from './styles';

interface PDFSkillsSectionProps {
  data: SkillCategory[];
}

export const PDFSkillsSection = ({ data }: PDFSkillsSectionProps) => {
  return (
    <View style={styles.sectionWithBorder}>
      <Text style={styles.sectionTitle}>Skills</Text>
      {data.map((category, idx) => (
        <View key={idx} style={styles.skillRow}>
          <Text style={styles.skillCategory}>{category.category}</Text>
          <Text style={styles.skillSeparator}>.</Text>
          <Text style={styles.skillList}>{category.skills.join(', ')}</Text>
        </View>
      ))}
    </View>
  );
};