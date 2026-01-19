import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { ReactNodeViewRenderer } from '@tiptap/react';
import CodeBlockNodeView from '../nodes/CodeBlockNodeView';

/**
 * 커스텀 코드블록 (v3)
 * - MacOS 스타일 디자인
 * - 복사 버튼 내장
 * - Syntax Highlighting
 */
export const CustomCodeBlock = CodeBlockLowlight.extend({
  name: 'customCodeBlock',
  
  addAttributes() {
    return {
      ...this.parent?.(),
      language: {
        default: 'javascript',
        parseHTML: element => {
          const { languageClassPrefix } = this.options;
          const classNames = [...(element.firstElementChild?.classList || [])];
          const languages = classNames
            .filter(className => className.startsWith(languageClassPrefix))
            .map(className => className.replace(languageClassPrefix, ''));
          const language = languages[0];

          if (!language) {
            return null;
          }

          return language;
        },
        rendered: false,
      },
    };
  },
  
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockNodeView);
  },
});