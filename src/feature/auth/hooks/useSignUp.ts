import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/api/auth/auth.api';
import type { SignUpRequest } from '@/api/auth/auth.request';
import { useAuthStore } from '@/stores/auth/authStore';
import { getErrorMessage, getFieldErrors } from '@/api/core/api.error';

interface UseSignUpReturn {
  isLoading: boolean;
  error: string | null;
  fieldErrors: Record<string, string> | null;
  signUp: (request: SignUpRequest) => Promise<void>;
  clearError: () => void;
}

export const useSignUp = (): UseSignUpReturn => {
  const navigate = useNavigate();
  const { login: setAuth } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string> | null>(null);

  const signUp = async (request: SignUpRequest) => {
    setIsLoading(true);
    setError(null);
    setFieldErrors(null);

    try {
      const response = await authApi.signUp(request);

      if (response.success) {
        // 사용자 정보만 저장 (토큰은 쿠키에 자동 저장됨)
        setAuth(response.data.user);

        // 메인 페이지로 이동
        navigate('/');
      }
    } catch (err) {
      setError(getErrorMessage(err));
      setFieldErrors(getFieldErrors(err));
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
    setFieldErrors(null);
  };

  return {
    isLoading,
    error,
    fieldErrors,
    signUp,
    clearError,
  };
};