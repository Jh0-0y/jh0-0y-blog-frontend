import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/feature/auth/stores/authStore';
import { toast } from '@/shared/toast/useToast';
import { getErrorMessage } from './api.error';
import type { ErrorResponse } from './api.response';
import { _getLoadingStore } from '@/shared/loading/useLoading';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://sealog-api.o-r.kr/api';
// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // globalLoading이 false면 로딩 스킵 (기본값: true)
    const shouldShowLoading = (config as any).globalLoading !== false;
    
    if (shouldShowLoading) {
      _getLoadingStore().showLoading();
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    // globalLoading이 false가 아닌 경우만 로딩 감소
    const shouldShowLoading = (response.config as any).globalLoading !== false;
    
    if (shouldShowLoading) {
      _getLoadingStore().hideLoading();
    }
    
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { 
      _retry?: boolean;
      _skipGlobalErrorHandler?: boolean;
    };

    // globalLoading이 false가 아닌 경우만 로딩 감소
    const shouldShowLoading = (originalRequest as any)?.globalLoading !== false;
    if (shouldShowLoading) {
      _getLoadingStore().hideLoading();
    }

    // 401 에러 처리
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh') &&
      !originalRequest.url?.includes('/auth/login') &&
      !originalRequest.url?.includes('/auth/signup')
    ) {
      originalRequest._retry = true;

      try {
        await apiClient.post('/auth/refresh', {}, { globalLoading: false } as any);
        return apiClient(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // 글로벌 에러 처리
    if (!originalRequest._skipGlobalErrorHandler) {
      const errorResponse = error.response?.data as ErrorResponse | undefined;
      const hasFieldErrors = errorResponse?.errors && Object.keys(errorResponse.errors).length > 0;
      
      if (!hasFieldErrors) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      }
    }

    return Promise.reject(error);
  }
);

declare module 'axios' {
  export interface AxiosRequestConfig {
    /**
     * 전역 로딩 표시 여부
     * @default true - 전역 로딩 표시
     * @example
     * // 전역 로딩 숨김 (컴포넌트 자체 로딩 사용)
     * apiClient.get('/users', { globalLoading: false })
     */
    globalLoading?: boolean;
  }
}