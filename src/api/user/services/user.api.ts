import { apiClient } from '@/api/core/apiClient';
import type { ApiResponse } from '@/api/core';
import type { BlogUserResponse, ChangePasswordRequest, UpdateProfileRequest, UserResponse } from '../types';


export const userApi = {

  /**
   * 블로그 사용자 정보 조회
   */
  getBlogUser: async (nickname: string): Promise<ApiResponse<BlogUserResponse>> => {
    const response = await apiClient.get<ApiResponse<BlogUserResponse>>(`/user/${nickname}`);
    return response.data;
  },

  /**
   * 내 정보 조회
   */
  getMe: async (): Promise<ApiResponse<UserResponse>> => {
    const response = await apiClient.get<ApiResponse<UserResponse>>('/me');
    return response.data;
  },

  /**
   * 프로필 수정 (닉네임, 이미지)
   * PATCH /api/me/profile
   */
  updateProfile: async (request: UpdateProfileRequest): Promise<ApiResponse<UserResponse>> => {
    const response = await apiClient.patch<ApiResponse<UserResponse>>('/me/profile', request);
    return response.data;
  },


  /**
   * 비밀번호 변경
   * PATCH /api/me/password
   */
  changePassword: async (request: ChangePasswordRequest): Promise<ApiResponse<void>> => {
    const response = await apiClient.patch<ApiResponse<void>>('/me/password', request);
    return response.data;
  },
};