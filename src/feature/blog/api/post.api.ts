import { apiClient, postMultipart, putMultipart  } from '@/api/core/apiClient';
import type { ApiResponse, PageResponse } from '@/api/core/api.response';
import type {
  CreatePostRequest,
  UpdatePostRequest,
  PostSearchParams,
  PostDetailResponse,
  PostItemResponse,
} from '../types/post';

export const postApi = {

  /**
   * 게시글 생성 (썸네일 포함)
   * POST /api/posts
   */
  createPost: async (
    request: CreatePostRequest,
    thumbnail?: File
  ): Promise<ApiResponse<PostDetailResponse>> => {
    const response = await postMultipart<ApiResponse<PostDetailResponse>>(
      '/posts',
      request,
      thumbnail,
      'thumbnail'
    );
    return response.data;
  },

  /**
   * 게시글 수정 (썸네일 포함) - Slug 기반
   * PUT /api/posts/{slug}
   */
  updatePost: async (
    slug: string,
    request: UpdatePostRequest,
    thumbnail?: File
  ): Promise<ApiResponse<PostDetailResponse>> => {
    const response = await putMultipart<ApiResponse<PostDetailResponse>>(
      `/posts/${slug}`,
      request,
      thumbnail,
      'thumbnail'
    );
    return response.data;
  },

  /**
   * 게시글 삭제 - Slug 기반
   * DELETE /api/posts/{slug}
   */
  deletePost: async (slug: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/posts/${slug}`);
    return response.data;
  },

  /**
   * 게시글 상세 조회 - Slug 기반
   * GET /api/posts/{slug}
   */
  getPostBySlug: async (slug: string): Promise<ApiResponse<PostDetailResponse>> => {
    const response = await apiClient.get<ApiResponse<PostDetailResponse>>(
      `/posts/${slug}`
    );
    return response.data;
  },

  /**
   * 공개 게시글 검색 (복합 필터링)
   * GET /api/posts
   */
  searchPosts: async (
    params: PostSearchParams = {}
  ): Promise<ApiResponse<PageResponse<PostItemResponse>>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<PostItemResponse>>>(
      '/posts', { params }
    );
    return response.data;
  },

  /**
   * 내 게시글 검색 (복합 필터링)
   * GET /api/posts/my
   */
  searchMyPosts: async (
    params: PostSearchParams = {}
  ): Promise<ApiResponse<PageResponse<PostItemResponse>>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<PostItemResponse>>>(
      '/posts/my', { params }
    );
    return response.data;
  },
};