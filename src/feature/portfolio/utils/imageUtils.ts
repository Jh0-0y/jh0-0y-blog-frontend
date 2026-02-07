/**
 * 이미지 URL을 Base64 문자열로 변환합니다.
 * 네트워크 요청을 미리 처리하여 PDF 생성 속도를 향상시킵니다.
 */
export const imageUrlToBase64 = async (url: string): Promise<string> => {
  try {
    // 이미 Base64인 경우 그대로 반환
    if (url.startsWith('data:')) {
      return url;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`이미지 로드 실패: ${response.statusText}`);
    }

    const blob = await response.blob();

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = () => {
        reject(new Error('FileReader 오류'));
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('이미지를 Base64로 변환하는 중 오류 발생:', error);
    // 변환 실패 시 원본 URL 반환 (fallback)
    return url;
  }
};

/**
 * 여러 이미지 URL을 병렬로 Base64로 변환합니다.
 */
export const imagesToBase64 = async (urls: string[]): Promise<string[]> => {
  return Promise.all(urls.map((url) => imageUrlToBase64(url)));
};
