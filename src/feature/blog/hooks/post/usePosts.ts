import { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getErrorMessage } from '@/api/core/api.error';
import { postApi } from '@/feature/blog/api/post.api';
import type { PostItemResponse } from '@/feature/blog/types/post/post.response';
import type { PostType } from '@/feature/blog/types/post/post.enums';

export interface PostsFilter {
  postType?: PostType;
  stack?: string;
  keyword?: string;
}

export interface Pagination {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface UsePostsReturn {
  posts: PostItemResponse[];
  pagination: Pagination;
  isLoading: boolean;
  error: string | null;
  filter: PostsFilter;
  setPage: (page: number) => void;
  refetch: () => Promise<void>;
}

const DEFAULT_PAGE_SIZE = 6;

// PostType 검증
const POST_TYPES: PostType[] = ['CORE', 'ARCHITECTURE', 'TROUBLESHOOTING', 'ESSAY'];

const isPostType = (value: string | undefined): boolean => {
  if (!value) return false;
  return POST_TYPES.includes(value.toUpperCase() as PostType);
};

const toPostType = (value: string): PostType => {
  return value.toUpperCase() as PostType;
};

export const usePosts = (): UsePostsReturn => {
  const params = useParams<{ postType?: string; stack?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [posts, setPosts] = useState<PostItemResponse[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    size: DEFAULT_PAGE_SIZE,
    totalPages: 0,
    totalElements: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // URL에서 필터 파싱
  const getFilterFromURL = useCallback((): PostsFilter => {
    const { postType: postTypeParam, stack: stackParam } = params;
    const keyword = searchParams.get('q') || undefined;

    let postType: PostType | undefined;
    let stack: string | undefined;

    if (postTypeParam && isPostType(postTypeParam)) {
      postType = toPostType(postTypeParam);
    }

    if (stackParam) {
      stack = stackParam;
    }

    return { postType, stack, keyword };
  }, [params, searchParams]);

  // URL에서 페이지 읽기
  const getPageFromURL = useCallback((): number => {
    const page = searchParams.get('page');
    return page ? parseInt(page, 10) : 0;
  }, [searchParams]);

  const filter = getFilterFromURL();
  const currentPage = getPageFromURL();

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await postApi.searchPosts({
        page: currentPage,
        size: pagination.size,
        postType: filter.postType,
        stack: filter.stack,
        keyword: filter.keyword,
      });

      if (response.success) {
        const data = response.data;
        setPosts(data.content);
        setPagination((prev) => ({
          ...prev,
          page: currentPage,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          hasNext: data.hasNext,
          hasPrevious: data.hasPrevious,
        }));
      }
    } catch (err) {
      setError(getErrorMessage(err));
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pagination.size, filter.postType, filter.stack, filter.keyword]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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

  return {
    posts,
    pagination: {
      ...pagination,
      page: currentPage,
    },
    isLoading,
    error,
    filter,
    setPage,
    refetch: fetchPosts,
  };
};