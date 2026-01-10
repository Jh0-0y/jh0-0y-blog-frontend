import type { PostListItem } from '../api/post.response';
import type { PostType } from '../types';

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
  posts: PostListItem[];
  pagination: Pagination;
  isLoading: boolean;
  error: string | null;
  filter: PostsFilter;
  setFilter: (filter: PostsFilter) => void;
  setPage: (page: number) => void;
  refetch: () => Promise<void>;
}