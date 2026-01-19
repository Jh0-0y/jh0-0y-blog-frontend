import { apiClient, patchMultipart } from '../core/apiClient';
import type { ApiResponse } from '@/api/core/api.response';
import type { UserResponse } from './user.response';
import type { ChangePasswordRequest, UpdateProfileRequest } from './user.request';

export const userApi = {
  /**
   * 내 정보 조회
   */
  getMe: async (): Promise<ApiResponse<UserResponse>> => {
    const response = await apiClient.get<ApiResponse<UserResponse>>('/auth/me');
    return response.data;
  },

  /**
   * 프로필 수정 (닉네임, 이미지)
   * PATCH /api/me/profile
   */
  updateProfile: async (
    request: UpdateProfileRequest,
    profileImage?: File
  ): Promise<ApiResponse<UserResponse>> => {
    const response = await patchMultipart<ApiResponse<UserResponse>>(
      '/me/profile',
      request,
      profileImage,
      'profileImage'
    );
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