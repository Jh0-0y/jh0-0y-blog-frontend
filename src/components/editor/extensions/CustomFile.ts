import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import FileNodeView from '../nodes/FileNodeView';

export interface FileAttributes {
  src: string;
  filename: string;
  size: number;
  fileId: number;
  fileType: string;
}

/**
 * 커스텀 파일 노드 (v3) - S3 URL 기반
 */
export const CustomFile = Node.create({
  name: 'customFile',
  
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
        default: 'file.pdf',
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
      fileType: {
        default: 'application/octet-stream',
        parseHTML: element => element.getAttribute('data-file-type'),
        renderHTML: attributes => {
          return { 'data-file-type': attributes.fileType };
        },
      },
    };
  },
  
  parseHTML() {
    return [
      {
        tag: 'div[data-type="custom-file"]',
      },
    ];
  },
  
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-type': 'custom-file' }, HTMLAttributes)];
  },
  
  addNodeView() {
    return ReactNodeViewRenderer(FileNodeView);
  },
  
  addCommands() {
    return {
      setCustomFile: (attributes: FileAttributes) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
        });
      },
    };
  },
});