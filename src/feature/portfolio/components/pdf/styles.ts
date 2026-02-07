import { StyleSheet, Font } from '@react-pdf/renderer';

// 한글 폰트 등록 (Noto Sans KR)
// 폰트는 한 번만 등록되며, 실제 로딩은 loadPDFFonts 유틸리티에서 처리
Font.register({
  family: 'NotoSansKR',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-400-normal.woff',
      fontWeight: 400,
    },
    {
      src: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-700-normal.woff',
      fontWeight: 700,
    },
  ],
});

// 색상 팔레트
export const colors = {
  primary: '#333333',
  secondary: '#666666',
  muted: '#999999',
  border: '#e0e0e0',
  background: '#ffffff',
  backgroundGray: '#f9f9f9',
} as const;

// 폰트 크기
export const fontSizes = {
  xlarge: 24,
  large: 16,
  medium: 14,
  base: 12,
  small: 11,
  xsmall: 10,
  tiny: 9,
} as const;

// 폰트 두께
export const fontWeights = {
  bold: 700,
  semibold: 600,
  normal: 400,
} as const;

// 간격
export const spacing = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  xxxl: 24,
} as const;

// 테두리
export const borders = {
  radius: {
    sm: 4,
    md: 8,
  },
  width: {
    thin: 1,
  },
} as const;

// 크기
export const sizes = {
  profileImage: 70,
  contactIcon: 12,
  minWidthRight: 140,
  minWidthContact: 180,
  minWidthListRight: 120,
} as const;

// 라인 높이
export const lineHeights = {
  tight: 1.5,
  normal: 1.6,
} as const;

// 공통 스타일
export const styles = StyleSheet.create({
  // 페이지
  page: {
    padding: spacing.xxxl + spacing.xl,
    fontFamily: 'NotoSansKR',
    fontSize: fontSizes.xsmall,
    color: colors.primary,
    backgroundColor: colors.background,
  },

  // 헤더 (About)
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing.xxxl,
    borderBottomWidth: borders.width.thin,
    borderBottomColor: colors.border,
    marginBottom: spacing.xxxl,
  },
  headerLeft: {
    flex: 1,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    marginBottom: spacing.xl,
  },
  profileImage: {
    width: sizes.profileImage,
    height: sizes.profileImage,
    borderRadius: borders.radius.sm,
  },
  name: {
    fontSize: fontSizes.xlarge,
    fontWeight: fontWeights.bold,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontSizes.medium,
    fontWeight: fontWeights.semibold,
    color: colors.primary,
  },
  slogan: {
    fontSize: fontSizes.small,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  introduction: {
    fontSize: fontSizes.xsmall,
    lineHeight: lineHeights.normal,
    color: colors.secondary,
  },
  headerRight: {
    minWidth: sizes.minWidthContact,
    alignItems: 'flex-start',
    gap: spacing.md - spacing.xs,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  contactText: {
    fontSize: fontSizes.xsmall,
    color: colors.primary,
  },

  // 섹션 공통
  section: {
    marginBottom: spacing.xxl,
  },
  sectionWithBorder: {
    marginBottom: spacing.xxl,
    paddingBottom: spacing.xxl,
    borderBottomWidth: borders.width.thin,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: fontSizes.large,
    fontWeight: fontWeights.bold,
    marginBottom: spacing.lg,
    color: colors.primary,
  },

  // Skills
  skillRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  skillCategory: {
    fontWeight: fontWeights.semibold,
    width: 50,
    color: colors.primary,
  },
  skillSeparator: {
    marginHorizontal: spacing.md - spacing.xs,
    color: colors.primary,
  },
  skillList: {
    flex: 1,
    color: colors.secondary,
  },

  // Projects
  projectItem: {
    flexDirection: 'row',
    marginBottom: spacing.xxl,
  },
  projectLeft: {
    flex: 1,
    paddingRight: spacing.xxl,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  projectTitle: {
    fontSize: fontSizes.medium,
    fontWeight: fontWeights.bold,
  },
  projectGithub: {
    fontSize: fontSizes.tiny,
    color: colors.secondary,
  },
  projectDivider: {
    fontSize: fontSizes.tiny,
    color: colors.muted,
    marginBottom: spacing.sm,
  },
  projectDesc: {
    fontSize: fontSizes.xsmall,
    lineHeight: lineHeights.tight,
    color: colors.secondary,
    marginBottom: spacing.md,
  },
  featureList: {
    paddingLeft: spacing.lg,
  },
  featureItem: {
    fontSize: fontSizes.xsmall,
    lineHeight: lineHeights.tight,
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  troubleshootingItem: {
    fontSize: fontSizes.xsmall,
    lineHeight: lineHeights.tight,
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  projectRight: {
    width: sizes.minWidthRight,
    alignItems: 'flex-end',
  },
  projectPeriod: {
    fontSize: fontSizes.xsmall,
    fontWeight: fontWeights.semibold,
    marginBottom: spacing.xs,
  },
  projectTeam: {
    fontSize: fontSizes.tiny,
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  projectRole: {
    fontSize: fontSizes.tiny,
    color: colors.secondary,
    marginBottom: spacing.md,
  },
  projectSkillsLabel: {
    fontSize: fontSizes.tiny,
    fontWeight: fontWeights.semibold,
    marginBottom: spacing.sm,
  },
  projectSkillItem: {
    fontSize: fontSizes.tiny,
    color: colors.secondary,
    marginBottom: 1,
    textAlign: 'right',
  },

  // Education, Certificates, Activities
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  listLeft: {
    flex: 1,
  },
  listTitle: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    marginBottom: spacing.xs,
  },
  listDesc: {
    fontSize: fontSizes.xsmall,
    color: colors.secondary,
  },
  listRight: {
    minWidth: sizes.minWidthListRight,
    alignItems: 'flex-end',
  },
  listPeriod: {
    fontSize: fontSizes.xsmall,
    color: colors.primary,
  },

  // 페이지 번호
  pageNumber: {
    position: 'absolute',
    bottom: spacing.xxl,
    right: spacing.xxxl + spacing.xl,
    fontSize: fontSizes.tiny,
    color: colors.muted,
  },
});