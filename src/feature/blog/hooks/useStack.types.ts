import type { StackWithCount, GroupedStacks, PopularStack } from '../api/stack.response';

export interface UseStacksWithCountReturn {
  stacks: StackWithCount[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseGroupedStacksReturn {
  groupedStacks: GroupedStacks | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UsePopularStacksReturn {
  popularStacks: PopularStack[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}