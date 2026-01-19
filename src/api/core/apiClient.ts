import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth/authStore';

// API 기본 URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// 응답 인터셉터 - 401 에러 시 토큰 재발급 시도
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 401 에러 + 재시도 안 한 경우 + refresh/login/signup 요청이 아닌 경우
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh') &&
      !originalRequest.url?.includes('/auth/login') &&
      !originalRequest.url?.includes('/auth/signup')
    ) {
      originalRequest._retry = true;

      try {
        // 토큰 재발급 요청 (쿠키가 자동으로 포함됨)
        await apiClient.post('/auth/refresh');

        // 원래 요청 재시도
        return apiClient(originalRequest);
      } catch (refreshError) {
        // 재발급 실패 시 로그아웃
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);



/**
 * FormData 생성 헬퍼 - JSON 데이터 + 파일
 * 
 * @param data JSON 데이터 객체
 * @param file 단일 파일 (선택)
 * @param fileKey 파일 필드명 (기본값: 'file')
 * @returns FormData 객체
 */
const createFormData = (
  data: object,
  file?: File,
  fileKey: string = 'thumbnail'
): FormData => {
  const formData = new FormData();

  // JSON 데이터를 Blob으로 변환하여 추가
  const jsonBlob = new Blob([JSON.stringify(data)], {
    type: 'application/json',
  });
  formData.append('request', jsonBlob);

  // 파일 추가
  if (file) {
    formData.append(fileKey, file);
  }

  return formData;
};

/**
 * 멀티파트 POST 요청 (JSON + 파일)
 */
export const postMultipart = async <T>(
  url: string,
  data: object,
  file?: File,
  fileKey: string = 'thumbnail'
) => {
  return apiClient.post<T>(url, createFormData(data, file, fileKey), {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

/**
 * 멀티파트 PUT 요청 (JSON + 파일)
 */
export const putMultipart = async <T>(
  url: string,
  data: object,
  file?: File,
  fileKey: string = 'thumbnail'
) => {
  return apiClient.put<T>(url, createFormData(data, file, fileKey), {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

/**
 * 멀티파트 PATCH 요청 (JSON + 파일)
 */
export const patchMultipart = async <T>(
  url: string,
  data: object,
  file?: File,
  fileKey: string = 'thumbnail'
) => {
  return apiClient.patch<T>(url, createFormData(data, file, fileKey), {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

/**
 * 파일만 업로드 (JSON 데이터 없음)
 */
export const uploadFile = async <T>(
  url: string,
  file: File,
  fileKey: string = 'file'
) => {
  const formData = new FormData();
  formData.append(fileKey, file);

  return apiClient.post<T>(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};