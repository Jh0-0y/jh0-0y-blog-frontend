import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage, getFieldErrors } from '@/api/core/api.error';
import { useToast } from '@/hooks/toast/useToast';
import { postApi } from '@/feature/blog/api/post.api';

import type { CreatePostRequest } from '@/feature/blog/types/post/post.request';
import type { PostType, PostStatus } from '@/feature/blog/types/post/post.enums';
import {
  canAddStack,
  canAddTag,
  validateContentLength,
  validatePostForm,
  VALIDATION_LIMITS,
} from '../../utils/postValidation';

export interface PostCreateForm {
  title: string;
  excerpt: string;
  postType: PostType;
  content: string;
  status: PostStatus;
  stacks: string[];
  tags: string[];
  thumbnail?: File;
  contentsFileIds?: number[];
}

export interface UsePostCreateReturn {
  form: PostCreateForm;
  isLoading: boolean;
  error: string | null;
  fieldErrors: Record<string, string> | null;
  contentLengthError: string | null;
  hasUnsavedChanges: boolean;
  updateField: <K extends keyof PostCreateForm>(key: K, value: PostCreateForm[K]) => void;
  setThumbnail: (file: File | undefined) => void;
  addContentFileId: (fileId: number) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  addStack: (stack: string) => void;
  removeStack: (stack: string) => void;
  toggleStatus: () => void;
  submit: () => Promise<void>;
  reset: () => void;
}

const INITIAL_FORM: PostCreateForm = {
  title: '',
  excerpt: '',
  postType: 'CORE',
  content: '',
  status: 'PUBLIC',
  stacks: [],
  tags: [],
  contentsFileIds: [],
};

export const usePostCreate = (): UsePostCreateReturn => {
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState<PostCreateForm>(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string> | null>(null);
  const [contentLengthError, setContentLengthError] = useState<string | null>(null);

  // 변경사항이 있는지 확인
  const hasUnsavedChanges = useMemo(() => {
    return (
      form.title.trim() !== '' ||
      form.excerpt.trim() !== '' ||
      form.content.trim() !== '' ||
      form.stacks.length > 0 ||
      form.tags.length > 0 ||
      form.thumbnail !== undefined
    );
  }, [form]);

  // 필드 업데이트
  const updateField = useCallback(
    <K extends keyof PostCreateForm>(key: K, value: PostCreateForm[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));

      // 본문 실시간 길이 검사
      if (key === 'content' && typeof value === 'string') {
        setContentLengthError(validateContentLength(value));
      }

      // 해당 필드 에러 제거
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

  // 썸네일 설정
  const setThumbnail = useCallback((file: File | undefined) => {
    setForm((prev) => ({ ...prev, thumbnail: file }));
  }, []);

  // 본문 파일 ID 추가
  const addContentFileId = useCallback((fileId: number) => {
    setForm((prev) => ({
      ...prev,
      contentsFileIds: [...(prev.contentsFileIds || []), fileId],
    }));
  }, []);

  // 태그 추가
  const addTag = useCallback(
    (tag: string) => {
      const trimmed = tag.trim();
      if (!trimmed) return;

      if (!canAddTag(form.tags)) {
        toast.warning(`태그는 ${VALIDATION_LIMITS.TAGS_MAX}개까지만 추가 가능합니다`);
        return;
      }

      if (form.tags.includes(trimmed)) {
        toast.warning('이미 추가된 태그입니다');
        return;
      }

      setForm((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }));

      // 태그 에러 제거
      if (fieldErrors?.tags) {
        setFieldErrors((prev) => {
          if (!prev) return null;
          const { tags: _, ...rest } = prev;
          return Object.keys(rest).length > 0 ? rest : null;
        });
      }
    },
    [form.tags, fieldErrors, toast]
  );

  // 태그 제거
  const removeTag = useCallback((tagToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  }, []);

  // 스택 추가
  const addStack = useCallback(
    (stack: string) => {
      if (!canAddStack(form.stacks)) {
        toast.warning(`스택은 ${VALIDATION_LIMITS.STACKS_MAX}개까지만 선택 가능합니다`);
        return;
      }

      if (form.stacks.includes(stack)) return;

      setForm((prev) => ({ ...prev, stacks: [...prev.stacks, stack] }));

      // 스택 에러 제거
      if (fieldErrors?.stacks) {
        setFieldErrors((prev) => {
          if (!prev) return null;
          const { stacks: _, ...rest } = prev;
          return Object.keys(rest).length > 0 ? rest : null;
        });
      }
    },
    [form.stacks, fieldErrors, toast]
  );

  // 스택 제거
  const removeStack = useCallback((stackToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      stacks: prev.stacks.filter((stack) => stack !== stackToRemove),
    }));
  }, []);

  // 공개/비공개 토글
  const toggleStatus = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      status: prev.status === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC',
    }));
  }, []);

  // 폼 초기화
  const reset = useCallback(() => {
    setForm(INITIAL_FORM);
    setError(null);
    setFieldErrors(null);
    setContentLengthError(null);
  }, []);

  // 제출
  const submit = useCallback(async () => {
    // 클라이언트 유효성 검사
    const validationErrors = validatePostForm(form);
    if (validationErrors) {
      setFieldErrors(validationErrors);

      // 첫 번째 에러 메시지 토스트
      const firstError = Object.values(validationErrors)[0];
      toast.error(firstError);
      return;
    }

    setIsLoading(true);
    setError(null);
    setFieldErrors(null);

    try {
      const request: CreatePostRequest = {
        title: form.title,
        excerpt: form.excerpt,
        postType: form.postType,
        content: form.content,
        status: form.status,
        stacks: form.stacks,
        tags: form.tags,
        contentsFileIds: form.contentsFileIds,
      };

      const response = await postApi.createPost(request, form.thumbnail);

      if (response.success) {
        toast.success(response.message || '게시글이 발행되었습니다');
        navigate(`/post/${response.data.slug}`);
      }
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      setFieldErrors(getFieldErrors(err));
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [form, navigate, toast]);

  return {
    form,
    isLoading,
    error,
    fieldErrors,
    contentLengthError,
    hasUnsavedChanges,
    updateField,
    setThumbnail,
    addContentFileId,
    addTag,
    removeTag,
    addStack,
    removeStack,
    toggleStatus,
    submit,
    reset,
  };
};