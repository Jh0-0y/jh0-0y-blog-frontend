import { View, Text, Image, Svg, Path } from '@react-pdf/renderer';
import type { About } from '@/api/portfolio/types';
import { styles } from './styles';

interface PDFAboutSectionProps {
  data: About;
}

// PDF용 아이콘 컴포넌트
const MailIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24" style={{ marginTop: 2 }}>
    <Path
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      fill="none"
      stroke="#333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 6l-10 7L2 6"
      fill="none"
      stroke="#333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const GithubIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24" style={{ marginTop: 2 }}>
    <Path
      d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      fill="none"
      stroke="#333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 18c-4.51 2-5-2-7-2"
      fill="none"
      stroke="#333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const FileTextIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24" style={{ marginTop: 2 }}>
    <Path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      fill="none"
      stroke="#333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 2v6h6"
      fill="none"
      stroke="#333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 13H8"
      fill="none"
      stroke="#333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 17H8"
      fill="none"
      stroke="#333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 9H8"
      fill="none"
      stroke="#333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const PDFAboutSection = ({ data }: PDFAboutSectionProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.profileRow}>
          {/* 이미지는 미리 Base64로 변환되어 전달됨 */}
          <Image src={data.profileImage} style={styles.profileImage} />
          <View>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.title}>{data.title}</Text>
          </View>
        </View>
        <Text style={styles.slogan}>"{data.slogan}"</Text>
        <Text style={styles.introduction}>{data.introduction}</Text>
      </View>
      <View style={styles.headerRight}>
        <View style={styles.contactItem}>
          <MailIcon />
          <Text style={styles.contactText}>{data.email}</Text>
        </View>
        <View style={styles.contactItem}>
          <GithubIcon />
          <Text style={styles.contactText}>{data.githubUrl}</Text>
        </View>
        <View style={styles.contactItem}>
          <FileTextIcon />
          <Text style={styles.contactText}>{data.blogUrl}</Text>
        </View>
      </View>
    </View>
  );
};