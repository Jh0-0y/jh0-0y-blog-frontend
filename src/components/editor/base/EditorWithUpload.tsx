import React, { useCallback } from 'react';
import { Editor } from '@tiptap/react';

interface EditorWithUploadProps {
  editor: Editor | null;
  onFileUpload: (file: File) => Promise<{
    url: string;
    filename: string;
    size: number;
    fileId: number;
    type: 'IMAGE' | 'VIDEO' | 'DOCUMENT';
  } | null>;
  children: React.ReactNode;
}

/**
 * 드래그앤드롭 파일 업로드 (오버레이 없음)
 * - 커서 위치에 직접 삽입
 * - 조용히 처리
 */
const EditorWithUpload: React.FC<EditorWithUploadProps> = ({
  editor,
  onFileUpload,
  children,
}) => {
  /**
   * 파일 타입 확인
   */
  const getFileType = (file: File): 'image' | 'video' | 'file' | null => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (
      file.type === 'application/pdf' ||
      file.type.includes('document') ||
      file.type.includes('word') ||
      file.type.includes('excel') ||
      file.type.includes('spreadsheet')
    ) {
      return 'file';
    }
    return null;
  };

  /**
   * 파일 업로드 및 에디터 삽입
   */
  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!editor) return;

      const fileType = getFileType(file);
      if (!fileType) {
        alert('지원하지 않는 파일 형식입니다.');
        return;
      }

      try {
        // S3 업로드
        const uploadedFile = await onFileUpload(file);
        
        if (!uploadedFile) {
          alert('파일 업로드에 실패했습니다.');
          return;
        }

        // 커서 위치에 삽입 (타입 단언 사용)
        if (fileType === 'image') {
          (editor.chain().focus() as any).setCustomImage({
            src: uploadedFile.url,
            filename: uploadedFile.filename,
            size: uploadedFile.size,
            fileId: uploadedFile.fileId,
            alt: uploadedFile.filename,
          }).run();
        } else if (fileType === 'video') {
          (editor.chain().focus() as any).setCustomVideo({
            src: uploadedFile.url,
            filename: uploadedFile.filename,
            size: uploadedFile.size,
            fileId: uploadedFile.fileId,
          }).run();
        } else if (fileType === 'file') {
          (editor.chain().focus() as any).setCustomFile({
            src: uploadedFile.url,
            filename: uploadedFile.filename,
            size: uploadedFile.size,
            fileId: uploadedFile.fileId,
            fileType: file.type,
          }).run();
        }
      } catch (error) {
        console.error('파일 업로드 오류:', error);
        alert('파일 업로드 중 오류가 발생했습니다.');
      }
    },
    [editor, onFileUpload]
  );

  /**
   * 드롭 핸들러
   */
  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const files = Array.from(e.dataTransfer.files);
      if (files.length === 0) return;

      // 여러 파일을 순차적으로 업로드
      for (const file of files) {
        await handleFileUpload(file);
      }
    },
    [handleFileUpload]
  );

  /**
   * 드래그 오버 (기본 동작 방지)
   */
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </div>
  );
};

export default EditorWithUpload;