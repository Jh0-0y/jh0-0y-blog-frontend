/**
 * 파일 타입별 상수 정의
 * 프론트엔드 검증에 필요한 최소 상수만 유지
 */

export const FileTypeConstants = {
  Image: {
    ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'],
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    TYPE_NAME: '이미지',
  },
  Video: {
    ALLOWED_EXTENSIONS: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'],
    MAX_SIZE: 100 * 1024 * 1024, // 100MB
    TYPE_NAME: '비디오',
  },
  Document: {
    ALLOWED_EXTENSIONS: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'],
    MAX_SIZE: 20 * 1024 * 1024, // 20MB
    TYPE_NAME: '문서',
  },
  Audio: {
    ALLOWED_EXTENSIONS: ['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aac'],
    MAX_SIZE: 20 * 1024 * 1024, // 20MB
    TYPE_NAME: '오디오',
  },
  Archive: {
    ALLOWED_EXTENSIONS: ['zip', 'rar', '7z', 'tar', 'gz'],
    MAX_SIZE: 100 * 1024 * 1024, // 100MB
    TYPE_NAME: '압축 파일',
  },
};

/**
 * 모든 허용된 확장자
 */
export const ALL_ALLOWED_EXTENSIONS = [
  ...FileTypeConstants.Image.ALLOWED_EXTENSIONS,
  ...FileTypeConstants.Video.ALLOWED_EXTENSIONS,
  ...FileTypeConstants.Document.ALLOWED_EXTENSIONS,
  ...FileTypeConstants.Audio.ALLOWED_EXTENSIONS,
  ...FileTypeConstants.Archive.ALLOWED_EXTENSIONS,
];