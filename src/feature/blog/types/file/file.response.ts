import type { FileMetadataType } from './file.enums';

/**
 * 파일 업로드 응답
 */
export interface UploadResponse {
  id: number;
  originalName: string;
  url: string;
  fileSize?: number;
  fileMetadataType: FileMetadataType;
}