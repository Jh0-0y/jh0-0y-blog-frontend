import { createContext } from 'react';
import type { PDFProgressContextValue } from '../types/PDFGenerationOverlay.types';

const PDFProgressContext = createContext<PDFProgressContextValue | null>(null);

export default PDFProgressContext;