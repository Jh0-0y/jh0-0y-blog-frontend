import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authApi } from '@/api/auth/auth.api';
import type { LoginRequest } from '@/api/auth/auth.request';
import { useAuthStore } from '@/stores/auth/authStore';
import { getErrorMessage, getFieldErrors } from '@/api/core/api.error';

interface UseLoginReturn {
  isLoading: boolean;
  error: string | null;
  fieldErrors: Record<string, string> | null;
  login: (request: LoginRequest) => Promise<void>;
  clearError: () => void;
}

export const useLogin = (): UseLoginReturn => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: setAuth } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string> | null>(null);

  const login = async (request: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    setFieldErrors(null);

    try {
      const response = await authApi.login(request);

      if (response.success) {
        setAuth(response.data.user);
        const from = (location.state as { from?: Location })?.from?.pathname || '/';
        navigate(from, { replace: true });
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
    login,
    clearError,
  };
};