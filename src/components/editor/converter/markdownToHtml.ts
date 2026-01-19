import { marked } from 'marked';

/**
 * 커스텀 마크다운 태그를 HTML로 변환하는 정규식 패턴
 */
const CUSTOM_TAG_PATTERNS = {
  image: /::image\[id=(\d+)\s+url=([^\s]+)\s+fileName=([^\s]+)\s+size=(\d+)\]::/g,
  video: /::video\[id=(\d+)\s+url=([^\s]+)\s+fileName=([^\s]+)\s+size=(\d+)\]::/g,
  file: /::file\[id=(\d+)\s+url=([^\s]+)\s+fileName=([^\s]+)\s+size=(\d+)\]::/g,
};

/**
 * 커스텀 이미지 태그를 HTML로 변환
 */
const convertImageTag = (markdown: string): string => {
  return markdown.replace(
    CUSTOM_TAG_PATTERNS.image,
    (match, id, url, fileName, size) => {
      return `<div data-type="custom-image" data-id="${id}" data-url="${url}" data-filename="${fileName}" data-size="${size}"></div>`;
    }
  );
};

/**
 * 커스텀 비디오 태그를 HTML로 변환
 */
const convertVideoTag = (markdown: string): string => {
  return markdown.replace(
    CUSTOM_TAG_PATTERNS.video,
    (match, id, url, fileName, size) => {
      return `<div data-type="custom-video" data-id="${id}" data-url="${url}" data-filename="${fileName}" data-size="${size}"></div>`;
    }
  );
};

/**
 * 커스텀 파일 태그를 HTML로 변환
 */
const convertFileTag = (markdown: string): string => {
  return markdown.replace(
    CUSTOM_TAG_PATTERNS.file,
    (match, id, url, fileName, size) => {
      return `<div data-type="custom-file" data-id="${id}" data-url="${url}" data-filename="${fileName}" data-size="${size}"></div>`;
    }
  );
};

/**
 * Markdown을 HTML로 변환
 */
export const markdownToHtml = (markdown: string): string => {
  if (!markdown) return '';

  // 1. 커스텀 태그를 임시 플레이스홀더로 변환
  const customTagPlaceholders: { placeholder: string; html: string }[] = [];
  let processedMarkdown = markdown;

  // 커스텀 태그 추출 및 플레이스홀더로 교체
  const customTagRegex = /::(image|video|file)\[([^\]]+)\]::/g;
  processedMarkdown = processedMarkdown.replace(customTagRegex, (match) => {
    const placeholder = `___CUSTOM_TAG_${customTagPlaceholders.length}___`;
    
    // 커스텀 태그를 HTML로 변환
    let html = match;
    html = convertImageTag(html);
    html = convertVideoTag(html);
    html = convertFileTag(html);
    
    customTagPlaceholders.push({ placeholder, html });
    return placeholder;
  });

  // 2. marked로 일반 마크다운 변환
  let html = marked.parse(processedMarkdown, {
    async: false,
    breaks: true, // 줄바꿈을 <br>로 변환
    gfm: true, // GitHub Flavored Markdown 지원
    tables: true, // 테이블 지원 명시
  }) as string;

  // 3. 플레이스홀더를 실제 HTML로 복원
  customTagPlaceholders.forEach(({ placeholder, html: customHtml }) => {
    html = html.replace(placeholder, customHtml);
  });

  return html;
};