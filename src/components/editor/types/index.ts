import type { FileMetadataType } from '@/feature/blog/types/file';
import type { Editor } from '@tiptap/react';


/**
 * 파일 메타데이터
 */
export interface FileMetadata {
  id: number;
  url: string;
  fileName: string;
  size: number;
  type: FileMetadataType;
}

/**
 * 이미지 노드 속성
 */
export interface ImageNodeAttrs {
  id: number;
  url: string;
  fileName: string;
  size: number;
  alt?: string;
}

/**
 * 비디오 노드 속성
 */
export interface VideoNodeAttrs {
  id: number;
  url: string;
  fileName: string;
  size: number;
}

/**
 * 파일 노드 속성
 */
export interface FileNodeAttrs {
  id: number;
  url: string;
  fileName: string;
  size: number;
}

/**
 * 에디터 모드
 */
export type EditorMode = 'editor' | 'viewer';

/**
 * 에디터 옵션
 */
export interface EditorOptions {
  mode: EditorMode;
  content?: string;
  placeholder?: string;
  onUpdate?: (markdown: string) => void;
  editable?: boolean;
}

/**
 * useMyEditor 반환 타입
 */
export interface UseMyEditorReturn {
  editor: Editor | null;
  getMarkdown: () => string;
  setMarkdown: (markdown: string) => void;
  clear: () => void;
}

/**
 * 툴바 버튼 타입
 */
export type ToolbarButtonType =
  | 'undo'
  | 'redo'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'bold'
  | 'italic'
  | 'strike'
  | 'underline'
  | 'code'
  | 'highlight'
  | 'link'
  | 'bulletList'
  | 'orderedList'
  | 'taskList'
  | 'blockquote'
  | 'horizontalRule'
  | 'codeBlock'
  | 'table'
  | 'clearFormat';

/**
 * 파일 업로드 결과
 */
export interface UploadResult {
  success: boolean;
  data?: FileMetadata;
  error?: string;
}
