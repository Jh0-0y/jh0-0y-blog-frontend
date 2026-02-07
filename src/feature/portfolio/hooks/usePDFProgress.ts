import { useContext } from 'react';
import PDFProgressContext from '../context/PDFProgressContext';

export const usePDFProgress = () => {
  const context = useContext(PDFProgressContext);

  if (!context) {
    throw new Error('usePDFProgress는 PDFProgressProvider 내부에서만 사용할 수 있습니다.');
  }

  return context;
};