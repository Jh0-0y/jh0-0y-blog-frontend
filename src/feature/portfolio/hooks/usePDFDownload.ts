import { useState, useEffect, useRef, useCallback } from 'react';
import { portfolioData } from '@/api/portfolio/data';
import { loadPDFFonts, imageUrlToBase64 } from '@/feature/portfolio/utils';
import { createPDFInstance } from './createPDFInstance';
import { usePDFProgress } from './usePDFProgress';
import type { PortfolioData } from '@/api/portfolio/types';

export const usePDFDownload = () => {
  const { updateProgress, resetProgress } = usePDFProgress();

  const [fontsReady, setFontsReady] = useState(false);
  const isGeneratingRef = useRef(false);

  // ─── 폰트 미리 로딩 ────────────────────────────────────────────────────────

  useEffect(() => {
    const initializeFonts = async () => {
      try {
        await loadPDFFonts();
        setFontsReady(true);
      } catch (error) {
        console.error('폰트 초기화 실패:', error);
      }
    };

    initializeFonts();
  }, []);

  // ─── 데이터 전처리 ──────────────────────────────────────────────────────────

  const preparePortfolioData = useCallback(async (): Promise<PortfolioData> => {
    try {
      const profileImageBase64 = await imageUrlToBase64(
        portfolioData.about.profileImage
      );

      return {
        ...portfolioData,
        about: {
          ...portfolioData.about,
          profileImage: profileImageBase64,
        },
      };
    } catch (error) {
      console.error('데이터 전처리 실패:', error);
      return portfolioData;
    }
  }, []);

  // ─── PDF 생성 + 다운로드 ────────────────────────────────────────────────────

  const handleDownloadPDF = useCallback(async () => {
    if (isGeneratingRef.current) return;
    isGeneratingRef.current = true;

    const startTime = performance.now();

    try {
      // 1단계: 폰트 확인
      updateProgress('checking-fonts', '폰트 확인 중', '한글 폰트를 로딩하고 있습니다', 5);

      if (!fontsReady) {
        await loadPDFFonts();
      }

      // 2단계: 이미지 변환
      updateProgress('converting-images', '이미지 처리 중', '프로필 이미지를 Base64로 변환하고 있습니다', 15);

      const preparedData = await preparePortfolioData();

      // 3단계: 문서 생성
      updateProgress(
        'creating-document',
        '문서 구조 생성 중',
        'PDF 문서 구조를 만들고 있습니다',
        25,
        performance.now() - startTime
      );

      const pdfInstance = createPDFInstance(preparedData);

      // 4단계: PDF 렌더링 (가장 오래 걸림)
      const renderStartTime = performance.now();
      updateProgress(
        'rendering-pdf',
        'PDF 렌더링 중',
        '복잡한 레이아웃을 PDF로 변환하고 있습니다 (약 15~20초 소요)',
        30,
        renderStartTime - startTime
      );

      // 렌더링 중 진행률 시뮬레이션
      const renderProgressInterval = setInterval(() => {
        const renderElapsed = performance.now() - renderStartTime;
        const estimatedTotal = 17000;
        const renderProgress = Math.min((renderElapsed / estimatedTotal) * 60, 60);

        updateProgress(
          'rendering-pdf',
          'PDF 렌더링 중',
          `${(renderElapsed / 1000).toFixed(1)}초 경과... 조금만 기다려주세요`,
          Math.floor(30 + renderProgress),
          performance.now() - startTime
        );
      }, 1000);

      const blob = await pdfInstance.toBlob();
      clearInterval(renderProgressInterval);

      // 5단계: 다운로드
      updateProgress(
        'downloading',
        '다운로드 준비 중',
        'PDF 파일을 다운로드하고 있습니다',
        95,
        performance.now() - startTime
      );

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${portfolioData.about.name}_포트폴리오.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // 완료
      const totalElapsed = performance.now() - startTime;
      updateProgress(
        'complete',
        'PDF 생성 완료',
        `총 ${(totalElapsed / 1000).toFixed(1)}초 소요되었습니다`,
        100,
        totalElapsed
      );

      console.log(`✅ PDF 생성 완료: ${(totalElapsed / 1000).toFixed(2)}초`);

      // 2초 후 오버레이 닫기
      setTimeout(() => {
        resetProgress();
        isGeneratingRef.current = false;
      }, 2000);
    } catch (error) {
      console.error('❌ PDF 생성 실패:', error);

      setTimeout(() => {
        resetProgress();
        isGeneratingRef.current = false;
        alert('PDF 생성에 실패했습니다. 다시 시도해주세요.');
      }, 2000);
    }
  }, [fontsReady, preparePortfolioData, updateProgress, resetProgress]);

  // ─── 외로 노출 ──────────────────────────────────────────────────────────────

  return {
    fontsReady,
    handleDownloadPDF,
  };
};