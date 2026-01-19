import type { Editor } from '@tiptap/react';

// ===== 타입 정의 =====

interface NodeAttrs {
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

interface MarkAttrs {
  href?: string;
}

interface Mark {
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

type NodeHandler = (node: TiptapNode, depth: number) => string;
type MarkHandler = (text: string, mark: Mark) => string;

// ===== 파일 ID 추출 =====

/**
 * 에디터에서 사용된 파일 ID 추출
 */
export const extractFileIds = (editor: Editor | null): number[] => {
  if (!editor) return [];
  
  const json = editor.getJSON();
  const fileIds: number[] = [];

  const traverse = (node: TiptapNode): void => {
    const isCustomNode = ['customImage', 'customVideo', 'customFile'].includes(node.type);
    if (isCustomNode && node.attrs?.fileId) {
      fileIds.push(node.attrs.fileId);
    }

    if (node.content) {
      node.content.forEach(traverse);
    }
  };

  traverse(json as TiptapNode);
  return [...new Set(fileIds)];
};

// ===== Markdown 변환 (Editor → Markdown) =====

/**
 * Tiptap 에디터 → Markdown 변환
 */
export const editorToMarkdown = (editor: Editor | null): string => {
  if (!editor) return '';
  
  const json = editor.getJSON();
  return jsonToMarkdown(json as TiptapNode);
};

/**
 * JSON → Markdown 재귀 변환
 */
export const jsonToMarkdown = (node: TiptapNode, depth = 0): string => {
  const handler = nodeHandlers[node.type];
  if (handler) {
    return handler(node, depth);
  }
  
  // 기본 처리: 자식 노드만 처리
  if (node.content) {
    return node.content.map((child) => jsonToMarkdown(child, depth)).join('');
  }
  
  return '';
};

// ===== 노드 핸들러 =====

/**
 * 노드 타입별 핸들러
 */
const nodeHandlers: Record<string, NodeHandler> = {
  // 문서
  doc: (node) => {
    if (!node.content) return '';
    return node.content.map((child) => jsonToMarkdown(child, 0)).join('\n\n');
  },

  // 단락
  paragraph: (node) => {
    if (!node.content) return '';
    return node.content.map((child) => jsonToMarkdown(child, 0)).join('');
  },

  // 텍스트
  text: (node) => {
    let text = node.text || '';
    
    if (node.marks) {
      node.marks.forEach((mark) => {
        const markHandler = markHandlers[mark.type];
        if (markHandler) {
          text = markHandler(text, mark);
        }
      });
    }
    
    return text;
  },

  // 제목
  heading: (node) => {
    if (!node.content) return '';
    const content = node.content.map((child) => jsonToMarkdown(child, 0)).join('');
    const level = node.attrs?.level || 1;
    return '#'.repeat(level) + ' ' + content;
  },

  // 순서 없는 리스트
  bulletList: (node) => {
    if (!node.content) return '';
    return node.content.map((child) => jsonToMarkdown(child, 0)).join('\n');
  },

  // 순서 있는 리스트
  orderedList: (node) => {
    if (!node.content) return '';
    return node.content.map((child, index) => {
      const itemContent = jsonToMarkdown(child, 0);
      return itemContent.replace(/^- /, `${index + 1}. `);
    }).join('\n');
  },

  // 리스트 항목
  listItem: (node, depth) => {
    if (!node.content) return '';
    const content = node.content.map((child) => jsonToMarkdown(child, depth + 1)).join('\n');
    return '  '.repeat(depth) + '- ' + content;
  },

  // 코드블록
  customCodeBlock: (node) => {
    const code = node.content?.[0]?.text || '';
    const lang = node.attrs?.language || 'javascript';
    return '```' + lang + '\n' + code + '\n```';
  },

  codeBlock: (node) => {
    const code = node.content?.[0]?.text || '';
    const lang = node.attrs?.language || 'javascript';
    return '```' + lang + '\n' + code + '\n```';
  },

  // 커스텀 이미지
  customImage: (node) => {
    const attrs = node.attrs || {};
    const src = attrs.src || '';
    const filename = attrs.filename || 'image.png';
    const size = attrs.size || 0;
    const fileId = attrs.fileId || 0;
    const alt = attrs.alt || filename;
    return `:::image[src="${src}" name="${filename}" size="${size}" fileId="${fileId}" alt="${alt}"]:::`;
  },

  // 커스텀 비디오
  customVideo: (node) => {
    const attrs = node.attrs || {};
    const src = attrs.src || '';
    const filename = attrs.filename || 'video.mp4';
    const size = attrs.size || 0;
    const fileId = attrs.fileId || 0;
    return `:::video[src="${src}" name="${filename}" size="${size}" fileId="${fileId}"]:::`;
  },

  // 커스텀 파일
  customFile: (node) => {
    const attrs = node.attrs || {};
    const src = attrs.src || '';
    const filename = attrs.filename || 'file.pdf';
    const size = attrs.size || 0;
    const fileId = attrs.fileId || 0;
    const fileType = attrs.fileType || 'application/octet-stream';
    return `:::file[src="${src}" name="${filename}" size="${size}" fileId="${fileId}" type="${fileType}"]:::`;
  },

  // 테이블
  table: (node) => {
    if (!node.content) return '';
    
    let tableMarkdown = '\n';
    const rows = node.content;
    
    rows.forEach((row, rowIndex) => {
      const cells = row.content || [];
      const cellContents = cells.map((cell) => {
        if (!cell.content) return '';
        return cell.content.map((p) => jsonToMarkdown(p, 0)).join(' ');
      });
      
      tableMarkdown += '| ' + cellContents.join(' | ') + ' |\n';
      
      if (rowIndex === 0) {
        tableMarkdown += '| ' + cellContents.map(() => '---').join(' | ') + ' |\n';
      }
    });
    
    return tableMarkdown;
  },

  // 인용구
  blockquote: (node) => {
    if (!node.content) return '';
    const content = node.content.map((child) => jsonToMarkdown(child, 0)).join('\n');
    return content.split('\n').map((line) => '> ' + line).join('\n');
  },

  // 줄바꿈
  hardBreak: () => '\n',
};

// ===== 마크 핸들러 =====

/**
 * 마크(강조) 타입별 핸들러
 */
const markHandlers: Record<string, MarkHandler> = {
  bold: (text) => `**${text}**`,
  italic: (text) => `*${text}*`,
  code: (text) => `\`${text}\``,
  link: (text, mark) => `[${text}](${mark.attrs?.href || '#'})`,
};

// ===== Markdown → HTML 변환 =====

/**
 * Markdown → HTML 변환
 */
export const markdownToHTML = (markdown: string): string => {
  const lines = markdown.split('\n');
  const htmlParts: string[] = [];
  let i = 0;
  
  const patterns = {
    image: /:::image\[src="(.+?)" name="(.+?)" size="(\d+)" fileId="(\d+)"(?: alt="(.+?)")?\]:::/,
    video: /:::video\[src="(.+?)" name="(.+?)" size="(\d+)" fileId="(\d+)"\]:::/,
    file: /:::file\[src="(.+?)" name="(.+?)" size="(\d+)" fileId="(\d+)" type="(.+?)"\]:::/,
  };
  
  while (i < lines.length) {
    const line = lines[i];
    
    // 커스텀 이미지
    const imageMatch = line.match(patterns.image);
    if (imageMatch) {
      htmlParts.push(
        `<div data-type="custom-image" data-src="${imageMatch[1]}" data-filename="${imageMatch[2]}" data-size="${imageMatch[3]}" data-file-id="${imageMatch[4]}" data-alt="${imageMatch[5] || imageMatch[2]}"></div>`
      );
      i++;
      continue;
    }
    
    // 커스텀 비디오
    const videoMatch = line.match(patterns.video);
    if (videoMatch) {
      htmlParts.push(
        `<div data-type="custom-video" data-src="${videoMatch[1]}" data-filename="${videoMatch[2]}" data-size="${videoMatch[3]}" data-file-id="${videoMatch[4]}"></div>`
      );
      i++;
      continue;
    }
    
    // 커스텀 파일
    const fileMatch = line.match(patterns.file);
    if (fileMatch) {
      htmlParts.push(
        `<div data-type="custom-file" data-src="${fileMatch[1]}" data-filename="${fileMatch[2]}" data-size="${fileMatch[3]}" data-file-id="${fileMatch[4]}" data-file-type="${fileMatch[5]}"></div>`
      );
      i++;
      continue;
    }
    
    // 코드블록
    if (line.startsWith('```')) {
      const lang = line.substring(3).trim() || 'javascript';
      const codeLines: string[] = [];
      i++;
      
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      
      htmlParts.push(
        `<pre><code class="language-${lang}">${escapeHTML(codeLines.join('\n'))}</code></pre>`
      );
      i++;
      continue;
    }
    
    // 제목
    if (line.startsWith('### ')) {
      htmlParts.push(`<h3>${escapeHTML(line.substring(4))}</h3>`);
    } else if (line.startsWith('## ')) {
      htmlParts.push(`<h2>${escapeHTML(line.substring(3))}</h2>`);
    } else if (line.startsWith('# ')) {
      htmlParts.push(`<h1>${escapeHTML(line.substring(2))}</h1>`);
    } else if (line.trim()) {
      htmlParts.push(`<p>${parseInlineMarkdown(line)}</p>`);
    }
    
    i++;
  }
  
  return htmlParts.join('');
};

/**
 * 인라인 Markdown 파싱
 */
const parseInlineMarkdown = (text: string): string => {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
};

/**
 * HTML 이스케이프
 */
const escapeHTML = (str: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  
  return str.replace(/[&<>"']/g, (char) => map[char]);
};