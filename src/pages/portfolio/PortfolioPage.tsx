import {
  AboutSection,
  SkillsSection,
  ProjectsSection,
  EducationSection,
  CertificatesSection,
  ActivitiesSection,
} from '@/feature/portfolio/components/sections';
import { portfolioData } from '@/api/portfolio/data';
import { usePDFDownload } from '@/feature/portfolio/hooks/usePDFDownload';
import styles from './PortfolioPage.module.css';

export const PortfolioPage = () => {
  const { fontsReady, handleDownloadPDF } = usePDFDownload();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <AboutSection data={portfolioData.about} />
        <SkillsSection data={portfolioData.skills} />
        <ProjectsSection data={portfolioData.projects} />
        <EducationSection data={portfolioData.education} />
        <CertificatesSection data={portfolioData.certificates} />
        <ActivitiesSection data={portfolioData.activities} />
      </div>

      <button
        className={styles.pdfButton}
        onClick={handleDownloadPDF}
        disabled={!fontsReady}
        title={
          !fontsReady
            ? '폰트를 로딩 중입니다...'
            : 'PDF 파일을 생성하고 다운로드합니다'
        }
      >
        {!fontsReady ? '⏳ 준비 중...' : '📄 PDF 저장'}
      </button>
    </div>
  );
};