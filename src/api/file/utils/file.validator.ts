import { FileTypeConstants } from './file.constants';

/**
 * 파일 검증 에러 타입
 */
export class FileValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileValidationError';
  }
}

/**
 * 파일 업로드 전 검증 유틸리티 (완화된 버전)
 *
 * 검증 항목:
 * 1. 파일 존재 여부
 * 2. 파일명 유효성 (길이, 위험 문자)
 * 3. 확장자 허용 여부
 * 4. 파일 크기 (확장자 기반 카테고리별)
 */
export class FileValidator {
  /**
   * 파일 전체 검증
   *
   * 검증 순서:
   * 1. 파일 존재 여부
   * 2. 파일명 유효성
   * 3. 확장자 허용 여부
   * 4. 파일 크기 (확장자 기반 카테고리별)
   */
  static validateFile(file: File): void {
    // 1. 파일 존재 여부
    this.validateFileNotEmpty(file);

    // 2. 파일명 유효성
    this.validateFileName(file.name);

    const extension = this.extractExtension(file.name);

    // 3. 확장자 허용 여부
    this.validateExtension(extension);

    // 4. 확장자 기반으로 카테고리를 추론하고 파일 크기 검증
    this.validateFileSize(file.size, extension);

    console.log('파일 검증 완료:', {
      filename: file.name,
      size: file.size,
      extension,
    });
  }

  /**
   * 파일이 비어있지 않은지 검증
   */
  private static validateFileNotEmpty(file: File | null | undefined): void {
    if (!file || file.size === 0) {
      throw new FileValidationError('파일이 비어있습니다.');
    }
  }

  /**
   * 파일명 검증
   */
  private static validateFileName(filename: string): void {
    if (!filename || filename.trim().length === 0) {
      throw new FileValidationError('파일명을 확인할 수 없습니다.');
    }

    if (filename.length > 255) {
      throw new FileValidationError('파일명이 너무 깁니다. (최대 255자)');
    }

    // 위험한 문자 검증 (경로 조작 방지)
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      throw new FileValidationError('파일명에 허용되지 않는 문자가 포함되어 있습니다.');
    }
  }

  /**
   * 확장자가 허용 목록에 있는지 검증
   */
  private static validateExtension(extension: string): void {
    if (!extension || extension.trim().length === 0) {
      throw new FileValidationError('파일 확장자를 확인할 수 없습니다.');
    }

    if (!this.isAllowedExtension(extension)) {
      throw new FileValidationError(
        `지원하지 않는 파일 확장자입니다: .${extension}`
      );
    }
  }

  /**
   * 확장자 기반으로 파일 카테고리를 추론하고 해당 타입의 크기 제한 검증
   */
  private static validateFileSize(fileSize: number, extension: string): void {
    if (fileSize <= 0) {
      throw new FileValidationError('파일 크기를 확인할 수 없습니다.');
    }

    // 확장자로 파일 카테고리 추론
    let fileTypeName: string;
    let maxSize: number;

    if (FileTypeConstants.Image.ALLOWED_EXTENSIONS.includes(extension)) {
      fileTypeName = FileTypeConstants.Image.TYPE_NAME;
      maxSize = FileTypeConstants.Image.MAX_SIZE;
    } else if (FileTypeConstants.Video.ALLOWED_EXTENSIONS.includes(extension)) {
      fileTypeName = FileTypeConstants.Video.TYPE_NAME;
      maxSize = FileTypeConstants.Video.MAX_SIZE;
    } else if (FileTypeConstants.Document.ALLOWED_EXTENSIONS.includes(extension)) {
      fileTypeName = FileTypeConstants.Document.TYPE_NAME;
      maxSize = FileTypeConstants.Document.MAX_SIZE;
    } else if (FileTypeConstants.Audio.ALLOWED_EXTENSIONS.includes(extension)) {
      fileTypeName = FileTypeConstants.Audio.TYPE_NAME;
      maxSize = FileTypeConstants.Audio.MAX_SIZE;
    } else if (FileTypeConstants.Archive.ALLOWED_EXTENSIONS.includes(extension)) {
      fileTypeName = FileTypeConstants.Archive.TYPE_NAME;
      maxSize = FileTypeConstants.Archive.MAX_SIZE;
    } else {
      // 이 시점에서는 이미 허용된 확장자이므로 도달하지 않음
      throw new FileValidationError('알 수 없는 파일 타입입니다.');
    }

    // 크기 초과 시 카테고리별 메시지와 함께 예외 발생
    if (fileSize > maxSize) {
      const maxSizeMB = maxSize / (1024 * 1024);
      const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);
      throw new FileValidationError(
        `${fileTypeName}는 최대 ${maxSizeMB}MB까지 업로드 가능합니다. (현재 파일: ${fileSizeMB}MB)`
      );
    }
  }

  /**
   * 허용된 확장자인지 확인
   */
  private static isAllowedExtension(extension: string): boolean {
    if (!extension || extension.trim().length === 0) {
      return false;
    }

    return (
      FileTypeConstants.Image.ALLOWED_EXTENSIONS.includes(extension) ||
      FileTypeConstants.Video.ALLOWED_EXTENSIONS.includes(extension) ||
      FileTypeConstants.Document.ALLOWED_EXTENSIONS.includes(extension) ||
      FileTypeConstants.Audio.ALLOWED_EXTENSIONS.includes(extension) ||
      FileTypeConstants.Archive.ALLOWED_EXTENSIONS.includes(extension)
    );
  }

  /**
   * 파일명에서 확장자 추출
   */
  private static extractExtension(filename: string): string {
    if (!filename || filename.trim().length === 0) {
      return '';
    }

    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
      return '';
    }

    return filename.substring(lastDotIndex + 1).toLowerCase();
  }
}