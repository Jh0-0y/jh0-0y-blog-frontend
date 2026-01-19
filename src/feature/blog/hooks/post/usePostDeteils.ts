import { useState, useEffect, useCallback } from 'react';
import { getErrorMessage } from '@/api/core/api.error';
import { postApi } from '@/feature/blog/api/post.api';
import type { PostDetailResponse } from '@/feature/blog/types/post/post.response';

export interface UsePostDetailsReturn {
  post: PostDetailResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const usePostDetails = (slug: string | undefined): UsePostDetailsReturn => {
  const [post, setPost] = useState<PostDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    if (!slug) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await postApi.getPostBySlug(slug);
      if (response.success) {
        setPost(response.data);
      }
    } catch (err) {
      setError(getErrorMessage(err));
      setPost(null);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return {
    post,
    isLoading,
    error,
    refetch: fetchPost,
  };
};