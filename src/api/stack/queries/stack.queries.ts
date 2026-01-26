import { useQuery } from '@tanstack/react-query';
import { stackApi } from '../services';
import type { StackGroup } from '../types';

const STALE_TIME = 1000 * 60 * 5; // 5분

export const stackKeys = {
  all: ['stack'] as const,
  lists: () => [...stackKeys.all, 'list'] as const,
  list: () => [...stackKeys.lists(), 'all'] as const,
  listByGroup: (group: StackGroup) => [...stackKeys.lists(), 'group', group] as const,
  withCount: () => [...stackKeys.all, 'withCount'] as const,
  grouped: () => [...stackKeys.all, 'grouped'] as const,
  popular: (limit: number) => [...stackKeys.all, 'popular', limit] as const,
};

/**
 * 전체 스택 목록 조회
 */
export const useStacksQuery = () => {
  return useQuery({
    queryKey: stackKeys.list(),
    queryFn: () => stackApi.getAllStacks(),
    staleTime: STALE_TIME,
    select: (response) => response.data,
  });
};

/**
 * 그룹별 스택 목록 조회
 */
export const useStacksByGroupQuery = (stackGroup: StackGroup) => {
  return useQuery({
    queryKey: stackKeys.listByGroup(stackGroup),
    queryFn: () => stackApi.getStacksByGroup(stackGroup),
    select: (response) => response.data,
  });
};

/**
 * 스택 + 게시글 수 목록 조회 (사이드바용)
 */
export const useStacksWithCountQuery = () => {
  return useQuery({
    queryKey: stackKeys.withCount(),
    queryFn: () => stackApi.getStacksWithCount(),
    select: (response) => response.data,
  });
};

/**
 * 그룹별 스택 + 게시글 수 목록 조회 (사이드바 All Stacks용)
 */
export const useGroupedStacksQuery = () => {
  return useQuery({
    queryKey: stackKeys.grouped(),
    queryFn: () => stackApi.getGroupedStacks(),
    staleTime: STALE_TIME,
    select: (response) => response.data?.groupedTags ?? null,
  });
};

export const usePopularStacksQuery = (limit: number = 5) => {
  return useQuery({
    queryKey: stackKeys.popular(limit),
    queryFn: () => stackApi.getPopularStacks(limit),
    staleTime: STALE_TIME,
    select: (response) => response.data,
  });
};