import { Document, Page, Text } from '@react-pdf/renderer';
import type { PortfolioData } from '@/api/portfolio/types';
import { styles } from './styles';
import { PDFAboutSection } from './PDFAboutSection';
import { PDFSkillsSection } from './PDFSkillsSection';
import { PDFProjectsSection } from './PDFProjectsSection';
import { PDFEducationSection } from './PDFEducationSection';
import { PDFCertificatesSection } from './PDFCertificatesSection';
import { PDFActivitiesSection } from './PDFActivitiesSection';

interface PortfolioPDFDocumentProps {
  data: PortfolioData;
}

export const PortfolioPDFDocument = ({ data }: PortfolioPDFDocumentProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PDFAboutSection data={data.about} />
        <PDFSkillsSection data={data.skills} />
        <PDFProjectsSection data={data.projects} />
        <PDFEducationSection data={data.education} />
        <PDFCertificatesSection data={data.certificates} />
        <PDFActivitiesSection data={data.activities} />

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};