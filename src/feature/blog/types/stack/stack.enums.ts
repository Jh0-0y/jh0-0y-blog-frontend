export type StackGroup =
  | 'LANGUAGE'
  | 'FRAMEWORK'
  | 'LIBRARY'
  | 'DATABASE'
  | 'DEVOPS'
  | 'KNOWLEDGE'
  | 'TOOL'
  | 'ETC';

// 그룹별 표시 라벨 (백엔드 title과 매칭)
export const STACK_GROUP_LABELS: Record<StackGroup, string> = {
  LANGUAGE: 'Language',
  FRAMEWORK: 'Framework',
  LIBRARY: 'Library',
  DATABASE: 'Database',
  DEVOPS: 'DevOps',
  KNOWLEDGE: 'Knowledge',
  TOOL: 'Tool',
  ETC: 'Etc',
};

// 그룹 순서 (사이드바 표시용)
export const STACK_GROUP_ORDER: StackGroup[] = [
  'LANGUAGE',
  'FRAMEWORK',
  'LIBRARY',
  'DATABASE',
  'DEVOPS',
  'KNOWLEDGE',
  'TOOL',
  'ETC',
];