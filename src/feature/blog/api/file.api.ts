import { uploadFile } from '@/api/core/apiClient';
import type { UploadResponse } from '../types/file';

export const fileApi = {

  /**
   * 에디터 파일 임시 업로드 (MIME 타입 기반 자동 분류)
   * POST /api/files/upload
   */
  uploadFile: async (file: File): Promise<UploadResponse> => {
    const response = await uploadFile<UploadResponse>('/files/upload', file);
    return response.data;
  },
};