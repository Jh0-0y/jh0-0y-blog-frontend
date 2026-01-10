import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '@/services/core/api.error';
import { postApi } from '../api/post.api';
import type { UsePostDeleteReturn } from './usePostDelete.types';

export const usePostDelete = (): UsePostDeleteReturn => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deletePost = useCallback(
    async (postId: number): Promise<boolean> => {
      if (!window.confirm('정말 삭제하시겠습니까?')) {
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await postApi.deletePost(postId);
        if (response.success) {
          navigate('/');
          return true;
        }
        return false;
      } catch (err) {
        setError(getErrorMessage(err));
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  return {
    isLoading,
    error,
    deletePost,
  };
};