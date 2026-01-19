// PostType별 색상
export const POST_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  CORE: { bg: 'linear-gradient(135deg, #1a3a1a 0%, #0d1117 100%)', text: '#6ee7b7' },
  ARCHITECTURE: { bg: 'linear-gradient(135deg, #1a2a3a 0%, #0d1117 100%)', text: '#60a5fa' },
  TROUBLESHOOTING: { bg: 'linear-gradient(135deg, #3a2a1a 0%, #0d1117 100%)', text: '#f97316' },
  ESSAY: { bg: 'linear-gradient(135deg, #2a1a3a 0%, #0d1117 100%)', text: '#a78bfa' },
};

// PostType 아이콘
export const POST_TYPE_ICONS: Record<string, string> = {
  CORE: '{ }',
  ARCHITECTURE: '⚙',
  TROUBLESHOOTING: '🔧',
  ESSAY: '✎',
};