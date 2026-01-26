import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from '../services';
import { postKeys } from '../queries/post.queries';
import type { CreatePostRequest, UpdatePostRequest } from '../types';

/**
 * 게시글 생성 Mutation
 * POST /api/my/posts
 */
export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreatePostRequest) => postApi.createPost(request),
    onSuccess: () => {
      // 공개 게시글 목록 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.publicLists() });
      // 내 게시글 목록 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.myLists() });
    },
  });
};

/**
 * 게시글 수정 Mutation
 * PUT /api/my/posts/{slug}
 */
export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, request }: { slug: string; request: UpdatePostRequest }) =>
      postApi.updatePost(slug, request),
    onSuccess: (_data, variables) => {
      // 해당 게시글 상세 무효화 (공개)
      queryClient.invalidateQueries({ queryKey: postKeys.publicDetail(variables.slug) });
      // 해당 게시글 수정용 데이터 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.edit(variables.slug) });
      // 공개 게시글 목록 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.publicLists() });
      // 내 게시글 목록 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.myLists() });
    },
  });
};

/**
 * 게시글 삭제 Mutation (소프트 삭제)
 * DELETE /api/my/posts/{slug}
 */
export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => postApi.deletePost(slug),
    onSuccess: (_data, slug) => {
      // 해당 게시글 관련 쿼리 제거
      queryClient.removeQueries({ queryKey: postKeys.publicDetail(slug) });
      queryClient.removeQueries({ queryKey: postKeys.edit(slug) });
      // 공개 게시글 목록 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.publicLists() });
      // 내 게시글 목록 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.myLists() });
      // 삭제된 게시글 목록 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.myDeletedLists() });
    },
  });
};

/**
 * 게시글 복구 Mutation
 * POST /api/my/posts/{slug}/restore
 */
export const useRestorePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => postApi.restorePost(slug),
    onSuccess: () => {
      // 공개 게시글 목록 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.publicLists() });
      // 내 게시글 목록 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.myLists() });
      // 삭제된 게시글 목록 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.myDeletedLists() });
    },
  });
};