import { useState, useEffect, useCallback } from 'react';
import { getErrorMessage } from '@/services/core/api.error';
import { stackApi } from '../api/stack.api';
import type { StackWithCount, GroupedStacks, PopularStack } from '../api/stack.response';
import type {
  UseStacksWithCountReturn,
  UseGroupedStacksReturn,
  UsePopularStacksReturn,
} from './useStack.types';

// ========== useStacksWithCount ========== //
export const useStacksWithCount = (): UseStacksWithCountReturn => {
  const [stacks, setStacks] = useState<StackWithCount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStacks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await stackApi.getStacksWithCount();
      if (response.success) {
        setStacks(response.data);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStacks();
  }, [fetchStacks]);

  return { stacks, isLoading, error, refetch: fetchStacks };
};

// ========== useGroupedStacks ========== //
export const useGroupedStacks = (): UseGroupedStacksReturn => {
  const [groupedStacks, setGroupedStacks] = useState<GroupedStacks | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroupedStacks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await stackApi.getGroupedStacks();
      if (response.success) {
        setGroupedStacks(response.data);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroupedStacks();
  }, [fetchGroupedStacks]);

  return { groupedStacks, isLoading, error, refetch: fetchGroupedStacks };
};

// ========== usePopularStacks ========== //
export const usePopularStacks = (limit: number = 5): UsePopularStacksReturn => {
  const [popularStacks, setPopularStacks] = useState<PopularStack[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPopularStacks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await stackApi.getPopularStacks(limit);
      if (response.success) {
        setPopularStacks(response.data);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchPopularStacks();
  }, [fetchPopularStacks]);

  return { popularStacks, isLoading, error, refetch: fetchPopularStacks };
};