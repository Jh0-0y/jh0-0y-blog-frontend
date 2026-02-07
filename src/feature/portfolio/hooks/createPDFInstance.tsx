import { pdf } from '@react-pdf/renderer';
import { PortfolioPDFDocument } from '@/feature/portfolio/components/pdf';
import type { PortfolioData } from '@/api/portfolio/types';

/** pdf() 호출과 JSX는 여기에만 감싸둜. 훅(.ts)에서는 이 함수만 호출 */
export const createPDFInstance = (data: PortfolioData) => {
  return pdf(<PortfolioPDFDocument data={data} />);
};