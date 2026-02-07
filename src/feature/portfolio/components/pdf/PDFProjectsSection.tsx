import { View, Text } from '@react-pdf/renderer';
import type { Project } from '@/api/portfolio/types';
import { styles } from './styles';

interface PDFProjectsSectionProps {
  data: Project[];
}

export const PDFProjectsSection = ({ data }: PDFProjectsSectionProps) => {
  return (
    <View style={styles.sectionWithBorder}>
      <Text style={styles.sectionTitle}>Projects</Text>
      {data.map((project) => (
        <View key={project.id} style={styles.projectItem} wrap={false}>
          <View style={styles.projectLeft}>
            <View style={styles.projectHeader}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              {project.github && (
                <Text style={styles.projectGithub}>@GitHub</Text>
              )}
            </View>

            <Text style={styles.projectDivider}>── 프로젝트 소개 ──</Text>
            <Text style={styles.projectDesc}>{project.description}</Text>

            {project.features.length > 0 && (
              <>
                <Text style={styles.projectDivider}>── 주요 기능 ──</Text>
                <View style={styles.featureList}>
                  {project.features.map((feature, idx) => (
                    <Text key={idx} style={styles.featureItem}>
                      • {feature}
                    </Text>
                  ))}
                </View>
              </>
            )}

            {project.troubleshooting.length > 0 && (
              <>
                <Text style={styles.projectDivider}>── 트러블슈팅 ──</Text>
                <View style={styles.featureList}>
                  {project.troubleshooting.map((item, idx) => (
                    <Text key={idx} style={styles.troubleshootingItem}>
                      • {item.problem} → {item.solution} ({item.result})
                    </Text>
                  ))}
                </View>
              </>
            )}
          </View>

          <View style={styles.projectRight}>
            <Text style={styles.projectPeriod}>{project.period}</Text>
            <Text style={styles.projectTeam}>{project.team}</Text>
            <Text style={styles.projectRole}>{project.role}</Text>
            <Text style={styles.projectSkillsLabel}>Skills</Text>
            {project.skills.map((skill, idx) => (
              <Text key={idx} style={styles.projectSkillItem}>
                • {skill}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};