import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { GenerationProgress, GenerationStep } from '../types/PDFGenerationOverlay.types';
import { IDLE_PROGRESS } from '../types/PDFGenerationOverlay.types';
import PDFProgressContext from '../context/PDFProgressContext';

export const PDFProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<GenerationProgress>(IDLE_PROGRESS);

  const updateProgress = useCallback(
    (
      step: GenerationStep,
      message: string,
      subMessage: string,
      percentage: number,
      elapsedTime?: number
    ) => {
      setProgress({ step, message, subMessage, percentage, elapsedTime });
    },
    []
  );

  const resetProgress = useCallback(() => {
    setProgress(IDLE_PROGRESS);
  }, []);

  return (
    <PDFProgressContext.Provider value={{ progress, updateProgress, resetProgress }}>
      {children}
    </PDFProgressContext.Provider>
  );
};