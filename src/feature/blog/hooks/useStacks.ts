import { useState, useEffect, useCallback } from 'react';
import { getErrorMessage } from '@/services/core/api.error';
import { stackApi } from '../api/stack.api';
import type { PopularStack, StackWithCount } from '../api/stack.response';
import type { StackGroup } from '../types/stack.enums';

interface UseStacksReturn {
  // 데이터
  popularStacks: PopularStack[];
  groupedStacks: Record<StackGroup, StackWithCount[]> | null;

  // 상태
  isLoading: boolean;
  error: string | null;

  // 액션
  refetch: () => Promise<void>;
}

export const useStacks = (): UseStacksReturn => {
  const [popularStacks, setPopularStacks] = useState<PopularStack[]>([]);
  const [groupedStacks, setGroupedStacks] = useState<Record<StackGroup, StackWithCount[]> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStacks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [popularRes, groupedRes] = await Promise.all([
        stackApi.getPopularStacks(5),
        stackApi.getGroupedStacks(),
      ]);

      if (popularRes.success && popularRes.data) {
        setPopularStacks(popularRes.data);
      }

      if (groupedRes.success && groupedRes.data) {
        // 백엔드에서 groupedTags로 반환
        setGroupedStacks(groupedRes.data.groupedTags);
      }
    } catch (err) {
      setError(getErrorMessage(err));
      console.error('Failed to fetch stacks:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStacks();
  }, [fetchStacks]);

  return {
    popularStacks,
    groupedStacks,
    isLoading,
    error,
    refetch: fetchStacks,
  };
};