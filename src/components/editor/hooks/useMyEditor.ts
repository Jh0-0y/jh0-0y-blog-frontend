import { useEditor, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { common, createLowlight } from 'lowlight';

// 커스텀 확장 임포트
import { CustomImage } from '../extensions/CustomImage';
import { CustomVideo } from '../extensions/CustomVideo';
import { CustomFile } from '../extensions/CustomFile';
import { CustomLink } from '../extensions/CustomLink';
import { CustomCodeBlock } from '../extensions/CustomCodeBlock';

// 타입 임포트
import type { UseMyEditorProps } from '../types/editor.types;

// Markdown 변환 유틸 임포트
import { editorToMarkdown, markdownToHTML } from './markdownConverter';

const lowlight = createLowlight(common);

/**
 * Tiptap v3 에디터 훅
 * 
 * @param content - 초기 마크다운 콘텐츠
 * @param editable - 편집 가능 여부 (기본값: true)
 * @param onUpdate - 콘텐츠 업데이트 시 호출되는 콜백 (마크다운 형식)
 * @returns Editor 인스턴스 또는 null
 * 
 * @example
 * ```tsx
 * const editor = useMyEditor({
 *   content: '# Hello World',
 *   editable: true,
 *   onUpdate: (markdown) => {
 *     console.log('Updated content:', markdown);
 *   }
 * });
 * ```
 */
export const useMyEditor = ({ 
  content = '', 
  editable = true,
  onUpdate 
}: UseMyEditorProps): Editor | null => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // CustomCodeBlock 사용
        hardBreak: {
          keepMarks: true,
        },
      }),
      CustomImage,
      CustomVideo,
      CustomFile,
      CustomLink.configure({
        openOnClick: !editable,
        HTMLAttributes: {
          class: 'custom-link',
        },
      }),
      CustomCodeBlock.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'custom-table',
        },
      }),
      TableRow,
      TableCell.configure({
        HTMLAttributes: {
          class: 'custom-table-cell',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'custom-table-header',
        },
      }),
    ],
    
    editable,
    content: content ? markdownToHTML(content) : '',
    
    onUpdate: ({ editor }) => {
      if (onUpdate) {
        const markdown = editorToMarkdown(editor);
        onUpdate(markdown);
      }
    },
  });

  return editor;
};

// ===== 마크다운 변환 유틸 내보내기 =====
export { extractFileIds, editorToMarkdown, markdownToHTML } from './markdownConverter';