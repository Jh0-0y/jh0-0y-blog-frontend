import { apiClient } from '../core/apiClient';
import type { ApiResponse } from '@/api/core/api.response';

import type { LoginRequest, SignUpRequest } from './auth.request';
import type { UserResponse } from '../user/user.response';

export const authApi = {
  /**
   * 회원가입
   * - 성공 시 쿠키에 토큰 자동 저장
   */
  signUp: async (request: SignUpRequest): Promise<ApiResponse<UserResponse>> => {
    const response = await apiClient.post<ApiResponse<UserResponse>>('/auth/signup', request);
    return response.data;
  },

  /**
   * 로그인
   * - 성공 시 쿠키에 토큰 자동 저장
   */
  login: async (request: LoginRequest): Promise<ApiResponse<UserResponse>> => {
    const response = await apiClient.post<ApiResponse<UserResponse>>('/auth/login', request);
    return response.data;
  },

  /**
   * 로그아웃
   * - 쿠키에서 토큰 삭제
   */
  logout: async (): Promise<ApiResponse<void>> => {
    const response = await apiClient.post<ApiResponse<void>>('/auth/logout');
    return response.data;
  },

  /**
   * 토큰 재발급
   * - 쿠키의 Refresh Token으로 자동 처리
   */
  refresh: async (): Promise<ApiResponse<UserResponse>> => {
    const response = await apiClient.post<ApiResponse<UserResponse>>('/auth/refresh');
    return response.data;
  },
};