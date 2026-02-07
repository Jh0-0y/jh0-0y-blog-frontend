import { Font } from '@react-pdf/renderer';

let fontsLoaded = false;
let fontLoadingPromise: Promise<void> | null = null;

/**
 * PDF 폰트를 미리 로드하고 캐시합니다.
 * 여러 번 호출해도 한 번만 로드됩니다.
 */
export const loadPDFFonts = async (): Promise<void> => {
  if (fontsLoaded) {
    return;
  }

  // 이미 로딩 중인 경우 기존 Promise 반환
  if (fontLoadingPromise) {
    return fontLoadingPromise;
  }

  fontLoadingPromise = (async () => {
    try {
      // 폰트 파일들을 병렬로 로드
      await Promise.all([
        fetch('https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-400-normal.woff'),
        fetch('https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-700-normal.woff'),
      ]);

      fontsLoaded = true;
    } catch (error) {
      console.error('폰트 로딩 실패:', error);
      fontLoadingPromise = null;
      throw error;
    }
  })();

  return fontLoadingPromise;
};

/**
 * 폰트 로딩 상태를 반환합니다.
 */
export const areFontsLoaded = (): boolean => {
  return fontsLoaded;
};
