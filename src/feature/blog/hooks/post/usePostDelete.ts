import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '@/api/core/api.error';
import { useToast } from '@/hooks/toast/useToast';
import { postApi } from '@/feature/blog/api/post.api';

export interface UsePostDeleteReturn {
  isLoading: boolean;
  error: string | null;
  deletePost: (slug: string) => Promise<boolean>;
}

export const usePostDelete = (): UsePostDeleteReturn => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deletePost = useCallback(
    async (slug: string): Promise<boolean> => {
      if (!window.confirm('정말 삭제하시겠습니까?')) {
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await postApi.deletePost(slug);
        if (response.success) {
          toast.success(response.message || '게시글이 삭제되었습니다');
          navigate('/');
          return true;
        }
        return false;
      } catch (err) {
        const message = getErrorMessage(err);
        setError(message);
        toast.error(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, toast]
  );

  return {
    isLoading,
    error,
    deletePost,
  };
};