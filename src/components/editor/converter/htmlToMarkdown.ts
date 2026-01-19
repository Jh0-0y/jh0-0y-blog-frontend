import TurndownService from 'turndown';
import { tables } from 'turndown-plugin-gfm';

/**
 * Turndown 인스턴스 생성
 */
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '*',
  emDelimiter: '*',
  strongDelimiter: '**',
});

/**
 * GFM Tables 플러그인 사용
 */
turndownService.use(tables);

/**
 * Tiptap 테이블을 위한 커스텀 규칙
 * - Tiptap은 테이블에 class와 style을 추가함
 * - 셀 안에 <p> 태그를 넣음
 * 이를 표준 HTML 테이블로 인식하도록 전처리
 */
turndownService.addRule('tiptapTableCleanup', {
  filter: (node) => {
    // tiptap-table 클래스를 가진 table 요소
    return (
      node.nodeName === 'TABLE' &&
      (node.classList.contains('tiptap-table') || 
       node.hasAttribute('style'))
    );
  },
  replacement: (content, node) => {
    // GFM tables 플러그인이 처리할 수 있도록
    // 표준 테이블 마크다운으로 변환
    const rows: string[] = [];
    const table = node as HTMLTableElement;
    
    // thead와 tbody 모두 처리
    const allRows = Array.from(table.querySelectorAll('tr'));
    
    allRows.forEach((row, rowIndex) => {
      const cells = Array.from(row.querySelectorAll('th, td'));
      const cellContents = cells.map(cell => {
        // <p> 태그 제거하고 텍스트만 추출
        return cell.textContent?.trim() || '';
      });
      
      rows.push('| ' + cellContents.join(' | ') + ' |');
      
      // 첫 번째 행 다음에 구분선 추가
      if (rowIndex === 0) {
        const separator = cells.map(() => '---').join(' | ');
        rows.push('| ' + separator + ' |');
      }
    });
    
    return '\n\n' + rows.join('\n') + '\n\n';
  },
});

/**
 * 커스텀 이미지 노드 변환 규칙
 */
turndownService.addRule('customImage', {
  filter: (node) => {
    return (
      node.nodeName === 'DIV' &&
      node.getAttribute('data-type') === 'custom-image'
    );
  },
  replacement: (content, node) => {
    const element = node as HTMLElement;
    const id = element.getAttribute('data-id');
    const url = element.getAttribute('data-url');
    const fileName = element.getAttribute('data-filename');
    const size = element.getAttribute('data-size');

    return `\n::image[id=${id} url=${url} fileName=${fileName} size=${size}]::\n`;
  },
});

/**
 * 커스텀 비디오 노드 변환 규칙
 */
turndownService.addRule('customVideo', {
  filter: (node) => {
    return (
      node.nodeName === 'DIV' &&
      node.getAttribute('data-type') === 'custom-video'
    );
  },
  replacement: (content, node) => {
    const element = node as HTMLElement;
    const id = element.getAttribute('data-id');
    const url = element.getAttribute('data-url');
    const fileName = element.getAttribute('data-filename');
    const size = element.getAttribute('data-size');

    return `\n::video[id=${id} url=${url} fileName=${fileName} size=${size}]::\n`;
  },
});

/**
 * 커스텀 파일 노드 변환 규칙
 */
turndownService.addRule('customFile', {
  filter: (node) => {
    return (
      node.nodeName === 'DIV' &&
      node.getAttribute('data-type') === 'custom-file'
    );
  },
  replacement: (content, node) => {
    const element = node as HTMLElement;
    const id = element.getAttribute('data-id');
    const url = element.getAttribute('data-url');
    const fileName = element.getAttribute('data-filename');
    const size = element.getAttribute('data-size');

    return `\n::file[id=${id} url=${url} fileName=${fileName} size=${size}]::\n`;
  },
});

/**
 * HTML을 Markdown으로 변환
 */
export const htmlToMarkdown = (html: string): string => {
  return turndownService.turndown(html);
};