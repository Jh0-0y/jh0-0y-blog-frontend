import { apiClient } from '@/services/core/apiClient';
import type { ApiResponse, PageResponse } from '@/services/core/api.response';

import type { PostType } from '../types/post.enums';
import type { CreatePostRequest, UpdatePostRequest } from './post.request';
import type { PostDetail, PostListItem } from './post.response';

export interface PostSearchParams {
  page?: number;
  size?: number;
  postType?: PostType;
  stack?: string;
  keyword?: string;
}

export const postApi = {
  getPosts: async (params?: PostSearchParams) =>
    (await apiClient.get<ApiResponse<PageResponse<PostListItem>>>('/posts', { params })).data,

  getPost: async (postId: number) =>
    (await apiClient.get<ApiResponse<PostDetail>>(`/posts/${postId}`)).data,

  createPost: async (request: CreatePostRequest) =>
    (await apiClient.post<ApiResponse<PostDetail>>('/posts', request)).data,

  updatePost: async (postId: number, request: UpdatePostRequest) =>
    (await apiClient.put<ApiResponse<PostDetail>>(`/posts/${postId}`, request)).data,

  deletePost: async (postId: number) =>
    (await apiClient.delete<ApiResponse<void>>(`/posts/${postId}`)).data,
};