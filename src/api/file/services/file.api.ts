import { apiClient } from '@/api/core/apiClient';
import type { ApiResponse } from '@/api/core/api.response';
import type { FileUploadResponse } from '../types';
import { FileValidator, FileValidationError } from '../utils/file.validator';

export const fileApi = {
  /**
   * 파일 임시 업로드 (MIME 타입 기반 자동 분류)
   * 
   * 처리 흐름:
   * 1. 클라이언트 측 파일 검증 (크기, 확장자, MIME 타입)
   * 2. FormData 생성
   * 3. 서버에 업로드 요청
   * 
   * @param file 업로드할 파일 객체
   * @param fileKey 서버에서 받는 파라미터 명 (기본값: 'file')
   * @throws FileValidationError 파일 검증 실패 시
   */
  uploadFile: async (
    file: File,
    fileKey: string = 'file'
  ): Promise<ApiResponse<FileUploadResponse>> => {
    try {
      // 1. 클라이언트 측 파일 검증
      FileValidator.validateFile(file);

      // 2. FormData 생성
      const formData = new FormData();
      formData.append(fileKey, file);

      // 3. 서버에 업로드 요청
      const response = await apiClient.post<ApiResponse<FileUploadResponse>>(
        '/files/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error) {
      // FileValidationError는 그대로 throw
      if (error instanceof FileValidationError) {
        throw error;
      }
      // 기타 에러는 일반 에러로 처리
      throw error;
    }
  },
};