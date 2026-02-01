import { apiClient } from '@/api/core/apiClient';
import type { ApiResponse, PageResponse } from '@/api/core/api.response';
import type {
  CreatePostRequest,
  UpdatePostRequest,
  PostSearchParams,
  PostDetailResponse,
  PostItemResponse,
  PostEditResponse,
} from '../types';

export const postApi = {
  // ==================== Public APIs (인증 불필요) ====================

  /**
   * 공개 게시글 상세 조회 (nickname + slug 기반)
   * GET /api/posts/{nickname}/{slug}
   */
  getPublicPostByNicknameAndSlug: async (
    nickname: string,
    slug: string
  ): Promise<ApiResponse<PostDetailResponse>> => {
    const response = await apiClient.get<ApiResponse<PostDetailResponse>>(
      `/posts/${nickname}/${slug}`
    );
    return response.data;
  },

  /**
   * 공개 게시글 검색 (복합 필터링)
   * GET /api/posts
   */
  searchPublicPosts: async (
    params: PostSearchParams = {}
  ): Promise<ApiResponse<PageResponse<PostItemResponse>>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<PostItemResponse>>>(
      '/posts',
      { params }
    );
    return response.data;
  },

  /**
   * 특정 사용자의 공개 게시글 조회
   * GET /api/posts/user/{nickname}
   */
  getUserPublicPosts: async (
    nickname: string,
    params: PostSearchParams = {}
  ): Promise<ApiResponse<PageResponse<PostItemResponse>>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<PostItemResponse>>>(
      `/posts/user/${nickname}`,
      { params }
    );
    return response.data;
  },

  // ==================== My APIs (인증 필요) ====================

  /**
   * 게시글 생성
   * POST /api/my/posts
   */
  createPost: async (
    request: CreatePostRequest
  ): Promise<ApiResponse<PostDetailResponse>> => {
    const response = await apiClient.post<ApiResponse<PostDetailResponse>>(
      '/my/posts',
      request
    );
    return response.data;
  },

  /**
   * 게시글 수정
   * PUT /api/my/posts/{slug}
   */
  updatePost: async (
    slug: string,
    request: UpdatePostRequest
  ): Promise<ApiResponse<PostDetailResponse>> => {
    const response = await apiClient.put<ApiResponse<PostDetailResponse>>(
      `/my/posts/${slug}`,
      request
    );
    return response.data;
  },

  /**
   * 게시글 삭제 (소프트 삭제)
   * DELETE /api/my/posts/{slug}
   */
  deletePost: async (slug: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/my/posts/${slug}`
    );
    return response.data;
  },

  /**
   * 게시글 복구
   * POST /api/my/posts/{slug}/restore
   */
  restorePost: async (slug: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.post<ApiResponse<void>>(
      `/my/posts/${slug}/restore`
    );
    return response.data;
  },

  /**
   * 게시글 수정용 조회
   * GET /api/my/posts/{slug}/edit
   */
  getPostForEdit: async (slug: string): Promise<ApiResponse<PostEditResponse>> => {
    const response = await apiClient.get<ApiResponse<PostEditResponse>>(
      `/my/posts/${slug}/edit`
    );
    return response.data;
  },

  /**
   * 내 게시글 검색 (복합 필터링, DELETED 상태 제외)
   * GET /api/my/posts
   */
  searchMyPosts: async (
    params: PostSearchParams = {}
  ): Promise<ApiResponse<PageResponse<PostItemResponse>>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<PostItemResponse>>>(
      '/my/posts',
      { params }
    );
    return response.data;
  },

  /**
   * 삭제된 게시글 목록 조회
   * GET /api/my/posts/deleted
   */
  getDeletedPosts: async (
    params: Pick<PostSearchParams, 'page' | 'size'> = {}
  ): Promise<ApiResponse<PageResponse<PostItemResponse>>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<PostItemResponse>>>(
      '/my/posts/deleted',
      { params }
    );
    return response.data;
  },
};