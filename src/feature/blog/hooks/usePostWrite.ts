import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage, getFieldErrors } from '@/services/core/api.error';
import { postApi } from '../api/post.api';
import type { CreatePostRequest, UpdatePostRequest } from '../api/post.request';
import type { PostForm, UsePostWriteReturn } from './usePostWrite.types';

const INITIAL_FORM: PostForm = {
  title: '',
  excerpt: '',
  postType: 'CORE',
  content: '',
  status: 'PRIVATE',
  stacks: [],
  tags: [],
};

export const usePostWrite = (postId?: number): UsePostWriteReturn => {
  const navigate = useNavigate();
  const isEditMode = Boolean(postId);

  const [form, setForm] = useState<PostForm>(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string> | null>(null);

  // 수정 모드: 기존 데이터 로드
  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      setIsFetching(true);
      try {
        const response = await postApi.getPost(postId);
        if (response.success) {
          const post = response.data;
          setForm({
            title: post.title,
            excerpt: post.excerpt,
            postType: post.postType,
            content: post.content,
            status: post.status,
            stacks: post.stacks,
            tags: post.tags,
          });
        }
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsFetching(false);
      }
    };

    fetchPost();
  }, [postId]);

  // 필드 업데이트
  const updateField = useCallback(
    <K extends keyof PostForm>(key: K, value: PostForm[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      if (fieldErrors?.[key]) {
        setFieldErrors((prev) => {
          if (!prev) return null;
          const { [key]: _, ...rest } = prev;
          return Object.keys(rest).length > 0 ? rest : null;
        });
      }
    },
    [fieldErrors]
  );

  // 태그 추가
  const addTag = useCallback(
    (tag: string) => {
      const trimmed = tag.trim();
      if (trimmed && !form.tags.includes(trimmed)) {
        setForm((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }));
      }
    },
    [form.tags]
  );

  // 태그 제거
  const removeTag = useCallback((tagToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  }, []);

  // 공개/비공개 토글
  const toggleStatus = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      status: prev.status === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC',
    }));
  }, []);

  // 제출
  const submit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setFieldErrors(null);

    try {
      const request: CreatePostRequest | UpdatePostRequest = {
        title: form.title,
        excerpt: form.excerpt,
        postType: form.postType,
        content: form.content,
        status: form.status,
        stacks: form.stacks,
        tags: form.tags,
      };

      let response;
      if (isEditMode && postId) {
        response = await postApi.updatePost(postId, request);
      } else {
        response = await postApi.createPost(request);
      }

      if (response.success) {
        navigate(`/post/${response.data.id}`);
      }
    } catch (err) {
      setError(getErrorMessage(err));
      setFieldErrors(getFieldErrors(err));
    } finally {
      setIsLoading(false);
    }
  }, [form, isEditMode, postId, navigate]);

  return {
    form,
    isLoading,
    isFetching,
    error,
    fieldErrors,
    updateField,
    setForm,
    addTag,
    removeTag,
    submit,
    toggleStatus,
  };
};