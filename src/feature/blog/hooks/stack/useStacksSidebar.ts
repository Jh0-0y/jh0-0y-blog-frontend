import { useGroupedStacksQuery, usePopularStacksQuery } from '@/api/stack/queries';

/**
 * 사이드바용 스택 훅
 * 사용처: StackList
 */
export const useStacksSidebar = () => {
  const { data: popularStacks, isLoading: isPopularLoading } = usePopularStacksQuery(5);
  const { data: groupedStacks, isLoading: isGroupedLoading } = useGroupedStacksQuery();

  return {
    popularStacks: popularStacks ?? [],
    groupedStacks: groupedStacks ?? null,
    isLoading: isPopularLoading || isGroupedLoading,
  };
};