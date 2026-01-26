import { useQuery } from '@tanstack/react-query';
import { postApi } from '../services';
import type { PostSearchParams } from '../types';

/**
 * 게시글 쿼리 키 팩토리
 */
export const postKeys = {
  all: ['posts'] as const,
  
  // Public posts
  publicLists: () => [...postKeys.all, 'public', 'list'] as const,
  publicList: (params: PostSearchParams) => [...postKeys.publicLists(), params] as const,
  publicDetails: () => [...postKeys.all, 'public', 'detail'] as const,
  publicDetail: (slug: string) => [...postKeys.publicDetails(), slug] as const,
  userPublicLists: (nickname: string) => [...postKeys.all, 'public', 'user', nickname] as const,
  userPublicList: (nickname: string, params: PostSearchParams) => 
    [...postKeys.userPublicLists(nickname), params] as const,
  
  // My posts
  myLists: () => [...postKeys.all, 'my', 'list'] as const,
  myList: (params: PostSearchParams) => [...postKeys.myLists(), params] as const,
  myDeletedLists: () => [...postKeys.all, 'my', 'deleted'] as const,
  myDeletedList: (params: Pick<PostSearchParams, 'page' | 'size'>) => 
    [...postKeys.myDeletedLists(), params] as const,
  edits: () => [...postKeys.all, 'my', 'edit'] as const,
  edit: (slug: string) => [...postKeys.edits(), slug] as const,
};

/**
 * 공개 게시글 목록 조회
 * GET /api/public/posts
 */
export const usePublicPostsQuery = (params: PostSearchParams = {}) => {
  return useQuery({
    queryKey: postKeys.publicList(params),
    queryFn: () => postApi.searchPublicPosts(params),
  });
};

// post.queries.ts 수정
export const usePublicPostDetailQuery = (slug: string) => {
  return useQuery({
    queryKey: postKeys.publicDetail(slug),
    queryFn: () => postApi.getPublicPostBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,  // 5분간 fresh 유지
  });
};

/**
 * 특정 사용자의 공개 게시글 조회
 * GET /api/public/posts/user/{nickname}
 */
export const useUserPublicPostsQuery = (
  nickname: string,
  params: PostSearchParams = {}
) => {
  return useQuery({
    queryKey: postKeys.userPublicList(nickname, params),
    queryFn: () => postApi.getUserPublicPosts(nickname, params),
    enabled: !!nickname,
  });
};

/**
 * 내 게시글 목록 조회
 * GET /api/my/posts
 */
export const useMyPostsQuery = (params: PostSearchParams = {}) => {
  return useQuery({
    queryKey: postKeys.myList(params),
    queryFn: () => postApi.searchMyPosts(params),
  });
};

/**
 * 삭제된 게시글 목록 조회
 * GET /api/my/posts/deleted
 */
export const useDeletedPostsQuery = (
  params: Pick<PostSearchParams, 'page' | 'size'> = {}
) => {
  return useQuery({
    queryKey: postKeys.myDeletedList(params),
    queryFn: () => postApi.getDeletedPosts(params),
  });
};

/**
 * 게시글 수정용 조회
 * GET /api/my/posts/{slug}/edit
 */
export const usePostEditQuery = (slug: string) => {
  return useQuery({
    queryKey: postKeys.edit(slug),
    queryFn: () => postApi.getPostForEdit(slug),
    enabled: !!slug,
  });
};