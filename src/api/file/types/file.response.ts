/**
 * 파일 업로드 응답
 */
export interface FileUploadResponse {
  id: number;
  originalName: string;
  path: string;
  size: number;
  contentType: string;
}