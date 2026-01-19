import type { FileMetadataType } from "@/feature/blog/types/file";
import type { FileMetadata, UploadResult } from "../types";
import { fileApi } from "@/feature/blog/api/file.api";


/**
 * 파일 타입별 허용 확장자
 */
const ALLOWED_EXTENSIONS: Record<FileMetadataType, string[]> = {
  IMAGE: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'],
  VIDEO: ['.mp4', '.webm', '.mov', '.avi', '.mkv'],
  DOCUMENT: [
    '.pdf',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
    '.ppt',
    '.pptx',
    '.txt',
    '.zip',
    '.rar',
    '.7z',
  ],
};

/**
 * 파일 타입별 최대 크기 (바이트)
 */
const MAX_FILE_SIZE: Record<FileMetadataType, number> = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  VIDEO: 100 * 1024 * 1024, // 100MB
  DOCUMENT: 1024 * 1024 * 1024, // 1GB
};

/**
 * MIME 타입으로 파일 메타데이터 타입 결정
 */
export const getFileMetadataType = (mimeType: string): FileMetadataType => {
  if (mimeType.startsWith('image/')) return 'IMAGE';
  if (mimeType.startsWith('video/')) return 'VIDEO';
  return 'DOCUMENT';
};

/**
 * 파일 확장자 검증
 */
export const validateFileExtension = (
  fileName: string,
  type: FileMetadataType
): boolean => {
  const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
  return ALLOWED_EXTENSIONS[type].includes(extension);
};

/**
 * 파일 크기 검증
 */
export const validateFileSize = (
  size: number,
  type: FileMetadataType
): boolean => {
  return size <= MAX_FILE_SIZE[type];
};

/**
 * 파일 크기를 읽기 쉬운 형식으로 변환
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * 파일 업로드
 */
export const uploadFile = async (file: File): Promise<UploadResult> => {
  try {
    const fileType = getFileMetadataType(file.type);

    // 확장자 검증
    if (!validateFileExtension(file.name, fileType)) {
      return {
        success: false,
        error: `지원하지 않는 파일 형식입니다. (${ALLOWED_EXTENSIONS[fileType].join(', ')})`,
      };
    }

    // 크기 검증
    if (!validateFileSize(file.size, fileType)) {
      return {
        success: false,
        error: `파일 크기가 너무 큽니다. (최대 ${formatFileSize(MAX_FILE_SIZE[fileType])})`,
      };
    }

    // 업로드
    const response = await fileApi.uploadFile(file);

    const metadata: FileMetadata = {
      id: response.id,
      url: response.url,
      fileName: response.originalName,
      size: response.fileSize || file.size,
      type: response.fileMetadataType,
    };

    return {
      success: true,
      data: metadata,
    };
  } catch (error) {
    console.error('File upload error:', error);
    return {
      success: false,
      error: '파일 업로드에 실패했습니다.',
    };
  }
};

/**
 * 드래그 앤 드롭 파일 추출
 */
export const extractFilesFromDrop = (
  dataTransfer: DataTransfer
): File[] | null => {
  const files = Array.from(dataTransfer.files);
  return files.length > 0 ? files : null;
};

/**
 * 파일 아이콘 클래스명 반환
 */
export const getFileIconClass = (fileName: string): string => {
  const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));

  const iconMap: Record<string, string> = {
    '.pdf': 'file-pdf',
    '.doc': 'file-word',
    '.docx': 'file-word',
    '.xls': 'file-excel',
    '.xlsx': 'file-excel',
    '.ppt': 'file-powerpoint',
    '.pptx': 'file-powerpoint',
    '.zip': 'file-archive',
    '.rar': 'file-archive',
    '.7z': 'file-archive',
    '.txt': 'file-text',
  };

  return iconMap[extension] || 'file-default';
};
