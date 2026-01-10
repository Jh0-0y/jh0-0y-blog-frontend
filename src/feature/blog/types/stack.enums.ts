export type StackGroup =
  | 'LANGUAGE'
  | 'FRAMEWORK'
  | 'LIBRARY'
  | 'DATABASE'
  | 'DEVOPS'
  | 'TOOL'
  | 'ETC';

// 그룹별 표시 라벨 (백엔드 title과 매칭)
export const STACK_GROUP_LABELS: Record<StackGroup, string> = {
  LANGUAGE: '언어',
  FRAMEWORK: '프레임워크',
  LIBRARY: '라이브러리',
  DATABASE: '데이터베이스',
  DEVOPS: '데브옵스',
  TOOL: '툴',
  ETC: '기타',
};

// 그룹 순서 (사이드바 표시용)
export const STACK_GROUP_ORDER: StackGroup[] = [
  'LANGUAGE',
  'FRAMEWORK',
  'LIBRARY',
  'DATABASE',
  'DEVOPS',
  'TOOL',
  'ETC',
];