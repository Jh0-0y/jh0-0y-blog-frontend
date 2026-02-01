import { useQuery } from '@tanstack/react-query';
import { stackApi } from '../services';

const STALE_TIME = 1000 * 60 * 5; // 5분

export const stackKeys = {
  all: ['stack'] as const,
  lists: () => [...stackKeys.all, 'list'] as const,
  list: () => [...stackKeys.lists(), 'all'] as const,
  grouped: () => [...stackKeys.all, 'grouped'] as const,
  groupedByUser: (nickname: string) => [...stackKeys.all, 'grouped', 'user', nickname] as const,
  popular: (limit: number) => [...stackKeys.all, 'popular', limit] as const,
};

/**
 * 전체 스택 목록 조회 (게시글 작성용)
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
 * 그룹별 스택 + 게시글 수 목록 조회 - 전체 (사이드바 All Stacks용)
 */
export const useGroupedStacksQuery = () => {
  return useQuery({
    queryKey: stackKeys.grouped(),
    queryFn: () => stackApi.getGroupedStacks(),
    staleTime: STALE_TIME,
    select: (response) => response.data?.groupedTags ?? null,
  });
};

/**
 * 그룹별 스택 + 게시글 수 목록 조회 - 사용자별 (사용자 페이지 사이드바용)
 */
export const useGroupedStacksByUserQuery = (nickname: string) => {
  return useQuery({
    queryKey: stackKeys.groupedByUser(nickname),
    queryFn: () => stackApi.getGroupedStacksByUser(nickname),
    staleTime: STALE_TIME,
    enabled: !!nickname,
    select: (response) => response.data?.groupedTags ?? null,
  });
};

/**
 * 인기 스택 조회 (사이드바 Popular Stacks용)
 */
export const usePopularStacksQuery = (limit: number = 5) => {
  return useQuery({
    queryKey: stackKeys.popular(limit),
    queryFn: () => stackApi.getPopularStacks(limit),
    staleTime: STALE_TIME,
    select: (response) => response.data,
  });
};