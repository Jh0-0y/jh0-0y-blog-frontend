import { apiClient } from '@/api/core/apiClient';
import type { ApiResponse } from '@/api/core';
import type {
  StackResponse,
  GroupedStacks,
  PopularStack,
  CreateStackRequest,
  UpdateStackRequest,
} from '../types';

export const stackApi = {
  /**
   * 전체 스택 목록 조회 (게시글 작성용)
   * GET /api/stacks
   */
  getAllStacks: async (
  ): Promise<ApiResponse<StackResponse[]>> => {
    const response = await apiClient.get<ApiResponse<StackResponse[]>>('/stacks');
    return response.data;
  },

  /**
   * 그룹별 스택 + 게시글 수 목록 조회 - 전체 (게시글 필터링용)
   * GET /api/stacks/grouped
   */
  getGroupedStacks: async (): Promise<ApiResponse<GroupedStacks>> => {
    const response = await apiClient.get<ApiResponse<GroupedStacks>>('/stacks/grouped');
    return response.data;
  },

  /**
   * 그룹별 스택 + 게시글 수 목록 조회 - 사용자별 (게시글 필터링용)
   * GET /api/stacks/grouped/user/{nickname}
   */
  getGroupedStacksByUser: async (nickname: string): Promise<ApiResponse<GroupedStacks>> => {
    const response = await apiClient.get<ApiResponse<GroupedStacks>>(
      `/stacks/grouped/user/${nickname}`
    );
    return response.data;
  },

  /**
   * 인기 스택 조회 (사이드바 Popular Stacks용)
   * GET /api/stacks/popular?limit=5
   */
  getPopularStacks: async (limit: number = 5): Promise<ApiResponse<PopularStack[]>> => {
    const response = await apiClient.get<ApiResponse<PopularStack[]>>('/stacks/popular', {
      params: { limit },
    });
    return response.data;
  },

  //============== 어드민 기능 =================

  /**
   * 스택 생성
   * POST /api/admin/stacks
   */
  createStack: async (
    request: CreateStackRequest,
  ): Promise<ApiResponse<StackResponse>> => {
    const response = await apiClient.post<ApiResponse<StackResponse>>(
      '/admin/stacks',
      request
    );
    return response.data;
  },

  /**
   * 스택 수정
   * PUT /api/admin/stacks/{stackId}
   */
  updateStack: async (
    stackId: number,
    request: UpdateStackRequest
  ): Promise<ApiResponse<StackResponse>> => {
    const response = await apiClient.put<ApiResponse<StackResponse>>(
      `/admin/stacks/${stackId}`,
      request
    );
    return response.data;
  },

  /**
   * 스택 삭제
   * DELETE /api/admin/stacks/{stackId}
   */
  deleteStack: async (stackId: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/admin/stacks/${stackId}`);
    return response.data;
  },
};