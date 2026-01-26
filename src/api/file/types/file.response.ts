/**
 * 파일 업로드 응답
 */
export interface FileUploadResponse {
  id: number;
  originalName: string;
  url: string;
  size: number;
  contentType: string;
}