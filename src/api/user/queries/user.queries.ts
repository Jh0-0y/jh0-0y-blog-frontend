import { useQuery } from '@tanstack/react-query';
import { userApi } from '../services';

export const userKeys = {
  all: ['user'] as const,
  me: () => [...userKeys.all, 'me'] as const,
  blogUser: (nickname: string) => [...userKeys.all, 'blog', nickname] as const,
};

/**
 * 블로그 사용자 정보 조회 query
 */
export const useBlogUserQuery = (nickname: string) => {
  return useQuery({
    queryKey: userKeys.blogUser(nickname),
    queryFn: () => userApi.getBlogUser(nickname),
    select: (response) => response.data,
    staleTime: 1000 * 60 * 5, // 5분
    enabled: !!nickname,
  });
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