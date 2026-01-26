import { useQuery } from '@tanstack/react-query';
import { userApi } from '../services';

export const userKeys = {
  all: ['user'] as const,
  me: () => [...userKeys.all, 'me'] as const,
};

/**
 * 내 정보 조회 query
 */
export const useMeQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: () => userApi.getMe(),
    select: (response) => response.data,
    staleTime: 1000 * 60 * 5, // 5분
    ...options,
  });
};