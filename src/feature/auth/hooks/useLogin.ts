import { useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from '@/api/auth/mutations';
import { getErrorMessage, getFieldErrors } from '@/api/core/api.error';
import type { LoginRequest } from '@/api/auth/types';
import { useAuthStore } from '../stores';

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: setAuth } = useAuthStore();

  const mutation = useLoginMutation();

  const login = (request: LoginRequest) => {
    mutation.mutate(request, {
      onSuccess: (response) => {
        if (response.success) {
          setAuth(response.data);
          const from = (location.state as { from?: Location })?.from?.pathname || '/';
          navigate(from, { replace: true });
        }
      },
    });
  };

  const clearError = () => {
    mutation.reset();
  };

  return {
    isLoading: mutation.isPending,
    error: mutation.error ? getErrorMessage(mutation.error) : null,
    fieldErrors: mutation.error ? getFieldErrors(mutation.error) : null,
    login,
    clearError,
  };
};