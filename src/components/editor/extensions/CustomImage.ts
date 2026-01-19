import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ImageNodeView from '../nodes/ImageNodeView';

export interface ImageAttributes {
  src: string;
  filename: string;
  size: number;
  fileId: number;
  alt?: string;
}

/**
 * 커스텀 이미지 노드 (v3) - S3 URL 기반
 * - S3에 업로드된 이미지 표시
 * - fileId 메타데이터 보존
 */
export const CustomImage = Node.create({
  name: 'customImage',
  
  group: 'block',
  
  atom: true,
  
  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: element => element.getAttribute('data-src'),
        renderHTML: attributes => {
          if (!attributes.src) return {};
          return { 'data-src': attributes.src };
        },
      },
      filename: {
        default: 'image.png',
        parseHTML: element => element.getAttribute('data-filename'),
        renderHTML: attributes => {
          return { 'data-filename': attributes.filename };
        },
      },
      size: {
        default: 0,
        parseHTML: element => parseInt(element.getAttribute('data-size') || '0'),
        renderHTML: attributes => {
          return { 'data-size': attributes.size };
        },
      },
      fileId: {
        default: 0,
        parseHTML: element => parseInt(element.getAttribute('data-file-id') || '0'),
        renderHTML: attributes => {
          return { 'data-file-id': attributes.fileId };
        },
      },
      alt: {
        default: null,
        parseHTML: element => element.getAttribute('data-alt'),
        renderHTML: attributes => {
          if (!attributes.alt) return {};
          return { 'data-alt': attributes.alt };
        },
      },
    };
  },
  
  parseHTML() {
    return [
      {
        tag: 'div[data-type="custom-image"]',
      },
    ];
  },
  
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-type': 'custom-image' }, HTMLAttributes)];
  },
  
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
  
  addCommands() {
    return {
      setCustomImage: (attributes: ImageAttributes) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
        });
      },
    };
  },
});