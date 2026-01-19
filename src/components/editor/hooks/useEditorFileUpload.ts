import { useState, useCallback } from 'react';
import { fileApi } from '@/feature/blog/api/file.api';
import { getErrorMessage } from '@/api/core/api.error';
import type { UploadResponse } from '@/feature/blog/types/file/file.response';

export interface UploadedFile {
  id: number;
  url: string;
  filename: string;
  size: number;
  type: 'IMAGE' | 'VIDEO' | 'DOCUMENT';
}

export interface UseEditorFileUploadReturn {
  uploadedFiles: UploadedFile[];
  isUploading: boolean;
  uploadError: string | null;
  uploadFile: (file: File) => Promise<UploadedFile | null>;
  getUploadedFileIds: () => number[];
  clearUploadError: () => void;
}

/**
 * 에디터 파일 업로드 훅
 * - S3 업로드
 * - 업로드된 파일 추적
 * - contentsFileIds 관리
 */
export const useEditorFileUpload = (): UseEditorFileUploadReturn => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  /**
   * 파일 업로드 (S3)
   */
  const uploadFile = useCallback(async (file: File): Promise<UploadedFile | null> => {
    setIsUploading(true);
    setUploadError(null);

    try {
      // S3 업로드
      const response: UploadResponse = await fileApi.uploadFile(file);

      // 업로드된 파일 정보 저장
      const uploadedFile: UploadedFile = {
        id: response.id,
        url: response.url,
        filename: response.originalName,
        size: response.fileSize || file.size,
        type: response.fileMetadataType,
      };

      setUploadedFiles((prev) => [...prev, uploadedFile]);

      return uploadedFile;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setUploadError(errorMessage);
      console.error('파일 업로드 실패:', errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  /**
   * 업로드된 파일 ID 목록 반환
   */
  const getUploadedFileIds = useCallback((): number[] => {
    return uploadedFiles.map((file) => file.id);
  }, [uploadedFiles]);

  /**
   * 업로드 에러 초기화
   */
  const clearUploadError = useCallback(() => {
    setUploadError(null);
  }, []);

  return {
    uploadedFiles,
    isUploading,
    uploadError,
    uploadFile,
    getUploadedFileIds,
    clearUploadError,
  };
};