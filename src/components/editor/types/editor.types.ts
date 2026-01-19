/**
 * Tiptap v3 에디터 타입 정의
 * 모든 커스텀 확장과 노드에 대한 타입 안정성 제공
 */

import type { Editor } from '@tiptap/react';

// ===== 파일 관련 타입 =====

export type FileMetadataType = 'IMAGE' | 'VIDEO' | 'DOCUMENT';

export interface UploadedFile {
  id: number;
  url: string;
  filename: string;
  size: number;
  type: FileMetadataType;
}

export interface UploadResponse {
  id: number;
  url: string;
  originalName: string;
  fileSize: number;
  fileMetadataType: FileMetadataType;
}

// ===== 노드 속성 타입 =====

export interface ImageAttributes {
  src: string;
  filename: string;
  size: number;
  fileId: number;
  alt?: string;
}

export interface VideoAttributes {
  src: string;
  filename: string;
  size: number;
  fileId: number;
}

export interface FileAttributes {
  src: string;
  filename: string;
  size: number;
  fileId: number;
  fileType: string;
}

// ===== 에디터 커맨드 타입 확장 =====

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customImage: {
      /**
       * 커스텀 이미지 노드 삽입
       */
      setCustomImage: (attributes: ImageAttributes) => ReturnType;
    };
    customVideo: {
      /**
       * 커스텀 비디오 노드 삽입
       */
      setCustomVideo: (attributes: VideoAttributes) => ReturnType;
    };
    customFile: {
      /**
       * 커스텀 파일 노드 삽입
       */
      setCustomFile: (attributes: FileAttributes) => ReturnType;
    };
  }
}

// ===== 마크다운 변환 타입 =====

export interface NodeAttrs {
  level?: number;
  language?: string;
  src?: string;
  filename?: string;
  size?: number;
  fileId?: number;
  alt?: string;
  fileType?: string;
  href?: string;
}

export interface MarkAttrs {
  href?: string;
}

export interface Mark {
  type: string;
  attrs?: MarkAttrs;
}

export interface TiptapNode {
  type: string;
  attrs?: NodeAttrs;
  content?: TiptapNode[];
  text?: string;
  marks?: Mark[];
}

export type NodeHandler = (node: TiptapNode, depth: number) => string;
export type MarkHandler = (text: string, mark: Mark) => string;

// ===== 에디터 훅 타입 =====

export interface UseMyEditorProps {
  content?: string;
  editable?: boolean;
  onUpdate?: (content: string) => void;
}

export interface UseEditorFileUploadReturn {
  uploadedFiles: UploadedFile[];
  isUploading: boolean;
  uploadError: string | null;
  uploadFile: (file: File) => Promise<UploadedFile | null>;
  getUploadedFileIds: () => number[];
  clearUploadError: () => void;
}

// ===== 컴포넌트 Props 타입 =====

export interface EditorBaseProps {
  editable?: boolean;
  content?: string;
  onUpdate?: (content: string) => void;
  height?: string;
  className?: string;
}

export interface EditorWithUploadProps {
  editor: Editor | null;
  onFileUpload: (file: File) => Promise<UploadedFile | null>;
  children: React.ReactNode;
}

export interface EditorToolbarProps {
  editor: Editor;
}

// ===== NodeView Props 타입 =====

export interface ImageNodeViewProps {
  node: {
    attrs: ImageAttributes;
  };
}

export interface VideoNodeViewProps {
  node: {
    attrs: VideoAttributes;
  };
}

export interface FileNodeViewProps {
  node: {
    attrs: FileAttributes;
  };
}

export interface CodeBlockNodeViewProps {
  node: {
    attrs: {
      language: string;
    };
  };
  updateAttributes: (attributes: Record<string, unknown>) => void;
}

// ===== 유틸리티 타입 =====

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type SupportedLanguage = 
  | 'javascript'
  | 'typescript'
  | 'java'
  | 'python'
  | 'c'
  | 'cpp'
  | 'bash'
  | 'json'
  | 'html'
  | 'css'
  | 'sql'
  | 'jsx'
  | 'tsx';

export interface LanguageLabel {
  [key: string]: string;
}