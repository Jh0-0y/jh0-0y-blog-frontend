import Link from '@tiptap/extension-link';

/**
 * 커스텀 링크 확장
 * - 세련된 디자인
 * - Ocean/Glassmorphism 스타일
 */
export const CustomLink = Link.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: 'custom-link',
      },
    };
  },
});
