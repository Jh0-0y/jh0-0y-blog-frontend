import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import VideoNodeView from '../nodes/VideoNodeView';

export interface VideoAttributes {
  src: string;
  filename: string;
  size: number;
  fileId: number;
}

/**
 * 커스텀 비디오 노드 (v3) - S3 URL 기반
 */
export const CustomVideo = Node.create({
  name: 'customVideo',
  
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
        default: 'video.mp4',
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
    };
  },
  
  parseHTML() {
    return [
      {
        tag: 'div[data-type="custom-video"]',
      },
    ];
  },
  
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-type': 'custom-video' }, HTMLAttributes)];
  },
  
  addNodeView() {
    return ReactNodeViewRenderer(VideoNodeView);
  },
  
  addCommands() {
    return {
      setCustomVideo: (attributes: VideoAttributes) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
        });
      },
    };
  },
});