import type { TagGroup } from '../types/stack.enums';

/**
 * 태그 그룹 우선순위
 * 낮을수록 먼저 표시
 */
const TAG_GROUP_PRIORITY: Record<TagGroup, number> = {
  LANGUAGE: 1,
  FRAMEWORK: 2,
  LIBRARY: 3,
  DATABASE: 4,
  DEVOPS: 5,
  TOOL: 6,
  ETC: 7,
};

/**
 * 태그 그룹 우선순위 반환
 */
export const getTagGroupPriority = (tagGroup: TagGroup): number => {
  return TAG_GROUP_PRIORITY[tagGroup] ?? 999;
};

/**
 * 태그 정렬 (그룹 우선순위 → 이름순)
 */
export const sortTags = <T extends { tagGroup: TagGroup; name: string }>(
  tags: T[]
): T[] => {
  return [...tags].sort((a, b) => {
    // 1. 그룹 우선순위
    const priorityDiff = getTagGroupPriority(a.tagGroup) - getTagGroupPriority(b.tagGroup);
    if (priorityDiff !== 0) return priorityDiff;

    // 2. 이름순 (가나다/알파벳)
    return a.name.localeCompare(b.name, 'ko');
  });
};

/**
 * 태그 이름 배열 정렬 (그룹 정보가 있는 태그 목록 기준)
 * - 전체 태그 목록에서 그룹 정보를 찾아서 정렬
 */
export const sortTagNames = <T extends { tagGroup: TagGroup; name: string }>(
  tagNames: string[],
  allTags: T[]
): string[] => {
  const tagMap = new Map(allTags.map((tag) => [tag.name, tag]));

  return [...tagNames].sort((a, b) => {
    const tagA = tagMap.get(a);
    const tagB = tagMap.get(b);

    // 그룹 정보가 없으면 맨 뒤로
    if (!tagA && !tagB) return a.localeCompare(b, 'ko');
    if (!tagA) return 1;
    if (!tagB) return -1;

    // 1. 그룹 우선순위
    const priorityDiff = getTagGroupPriority(tagA.tagGroup) - getTagGroupPriority(tagB.tagGroup);
    if (priorityDiff !== 0) return priorityDiff;

    // 2. 이름순
    return a.localeCompare(b, 'ko');
  });
};