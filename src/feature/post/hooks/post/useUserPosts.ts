import { useCallback, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getErrorMessage } from '@/api/core';
import { useUserPublicPostsQuery } from '@/api/post/queries';
import type { PostType } from '@/api/post/types';

export interface UserPostsFilter {
  postType?: PostType;
  stack?: string;
  keyword?: string;
}

const DEFAULT_PAGE_SIZE = 6;
const POST_TYPES: PostType[] = ['CORE', 'ARCHITECTURE', 'TROUBLESHOOTING', 'ESSAY'];

const isPostType = (value: string | undefined): value is PostType => {
  if (!value) return false;
  return POST_TYPES.includes(value.toUpperCase() as PostType);
};

/**
 * 유저별 게시글 목록 조회 훅
 * - URL에서 nickname, postType, stack, keyword, page 파싱
 * - useUserPublicPostsQuery 사용
 */
export const useUserPosts = () => {
  const params = useParams<{ 
    nickname: string;
    postType?: string; 
    stack?: string;
  }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const nickname = params.nickname ?? '';

  // URL에서 필터 파싱
  const filter = useMemo((): UserPostsFilter => {
    const { postType: postTypeParam, stack: stackParam } = params;
    const keyword = searchParams.get('q') || undefined;

    return {
      postType: postTypeParam && isPostType(postTypeParam) 
        ? postTypeParam.toUpperCase() as PostType 
        : undefined,
      stack: stackParam || undefined,
      keyword,
    };
  }, [params, searchParams]);

  // URL에서 페이지 파싱
  const currentPage = useMemo(() => {
    const page = searchParams.get('page');
    return page ? parseInt(page, 10) : 0;
  }, [searchParams]);

  // React Query로 데이터 조회
  const query = useUserPublicPostsQuery(nickname, {
    page: currentPage,
    size: DEFAULT_PAGE_SIZE,
    postType: filter.postType,
    stack: filter.stack,
    keyword: filter.keyword,
  });

  // 페이지 변경 (query string으로)
  const setPage = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (page > 0) {
          newParams.set('page', String(page));
        } else {
          newParams.delete('page');
        }
        return newParams;
      });
    },
    [setSearchParams]
  );

  const pageData = query.data?.data;

  return {
    nickname,
    posts: pageData?.content ?? [],
    pagination: {
      page: currentPage,
      size: DEFAULT_PAGE_SIZE,
      totalPages: pageData?.totalPages ?? 0,
      totalElements: pageData?.totalElements ?? 0,
      hasNext: pageData?.hasNext ?? false,
      hasPrevious: pageData?.hasPrevious ?? false,
    },
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error ? getErrorMessage(query.error) : null,
    filter,
    setPage,
    refetch: query.refetch,
  };
};