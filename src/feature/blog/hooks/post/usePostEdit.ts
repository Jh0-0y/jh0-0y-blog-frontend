import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage, getFieldErrors } from '@/api/core/api.error';
import { useToast } from '@/hooks/toast/useToast';
import { postApi } from '@/feature/blog/api/post.api';
import {
  validatePostForm,
  validateContentLength,
  canAddTag,
  canAddStack,
  VALIDATION_LIMITS,
} from '../../utils/postValidation';
import type { UpdatePostRequest } from '@/feature/blog/types/post/post.request';
import type { PostType, PostStatus } from '@/feature/blog/types/post/post.enums';

export interface PostEditForm {
  title: string;
  excerpt: string;
  postType: PostType;
  content: string;
  status: PostStatus;
  stacks: string[];
  tags: string[];
  thumbnail?: File;
  removeThumbnail?: boolean;
  contentsFileIds?: number[];
  deletedFileIds?: number[];
}

export interface UsePostEditReturn {
  form: PostEditForm;
  originalThumbnailUrl: string | null;
  isLoading: boolean;
  isFetching: boolean;
  error: string | null;
  fieldErrors: Record<string, string> | null;
  contentLengthError: string | null;
  hasUnsavedChanges: boolean;
  updateField: <K extends keyof PostEditForm>(key: K, value: PostEditForm[K]) => void;
  setThumbnail: (file: File | undefined) => void;
  setRemoveThumbnail: (remove: boolean) => void;
  addContentFileId: (fileId: number) => void;
  addDeletedFileId: (fileId: number) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  addStack: (stack: string) => void;
  removeStack: (stack: string) => void;
  toggleStatus: () => void;
  submit: () => Promise<void>;
}

const INITIAL_FORM: PostEditForm = {
  title: '',
  excerpt: '',
  postType: 'CORE',
  content: '',
  status: 'PUBLIC',
  stacks: [],
  tags: [],
  removeThumbnail: false,
  contentsFileIds: [],
  deletedFileIds: [],
};

export const usePostEdit = (slug: string): UsePostEditReturn => {
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState<PostEditForm>(INITIAL_FORM);
  const [originalForm, setOriginalForm] = useState<PostEditForm>(INITIAL_FORM);
  const [originalThumbnailUrl, setOriginalThumbnailUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string> | null>(null);
  const [contentLengthError, setContentLengthError] = useState<string | null>(null);

  // 변경사항이 있는지 확인
  const hasUnsavedChanges = useMemo(() => {
    // 기본 필드 비교
    if (
      form.title !== originalForm.title ||
      form.excerpt !== originalForm.excerpt ||
      form.postType !== originalForm.postType ||
      form.content !== originalForm.content ||
      form.status !== originalForm.status
    ) {
      return true;
    }

    // 배열 비교 (stacks, tags)
    if (
      form.stacks.length !== originalForm.stacks.length ||
      !form.stacks.every((stack) => originalForm.stacks.includes(stack))
    ) {
      return true;
    }

    if (
      form.tags.length !== originalForm.tags.length ||
      !form.tags.every((tag) => originalForm.tags.includes(tag))
    ) {
      return true;
    }

    // 썸네일 변경 확인
    if (form.thumbnail !== undefined || form.removeThumbnail === true) {
      return true;
    }

    // 파일 변경 확인
    if (
      (form.contentsFileIds && form.contentsFileIds.length > 0) ||
      (form.deletedFileIds && form.deletedFileIds.length > 0)
    ) {
      return true;
    }

    return false;
  }, [form, originalForm]);

  // 기존 데이터 로드
  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      setIsFetching(true);
      setError(null);

      try {
        const response = await postApi.getPostBySlug(slug);
        if (response.success) {
          const post = response.data;
          const initialData: PostEditForm = {
            title: post.title,
            excerpt: post.excerpt,
            postType: post.postType,
            content: post.content,
            status: post.status,
            stacks: post.stacks,
            tags: post.tags,
            removeThumbnail: false,
            contentsFileIds: [],
            deletedFileIds: [],
          };

          setForm(initialData);
          setOriginalForm(initialData);

          // 기존 썸네일 URL 저장
          setOriginalThumbnailUrl(post.thumbnailUrl);

          // 기존 본문 길이 검사
          setContentLengthError(validateContentLength(post.content));
        }
      } catch (err) {
        const message = getErrorMessage(err);
        setError(message);
        toast.error(message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // 필드 업데이트
  const updateField = useCallback(
    <K extends keyof PostEditForm>(key: K, value: PostEditForm[K]) => {
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
    setForm((prev) => ({ ...prev, thumbnail: file, removeThumbnail: false }));
  }, []);

  // 썸네일 제거 플래그
  const setRemoveThumbnail = useCallback((remove: boolean) => {
    setForm((prev) => ({ ...prev, removeThumbnail: remove, thumbnail: undefined }));
  }, []);

  // 본문 파일 ID 추가
  const addContentFileId = useCallback((fileId: number) => {
    setForm((prev) => ({
      ...prev,
      contentsFileIds: [...(prev.contentsFileIds || []), fileId],
    }));
  }, []);

  // 삭제할 파일 ID 추가
  const addDeletedFileId = useCallback((fileId: number) => {
    setForm((prev) => ({
      ...prev,
      deletedFileIds: [...(prev.deletedFileIds || []), fileId],
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

  // 수정 제출
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
      const request: UpdatePostRequest = {
        title: form.title,
        excerpt: form.excerpt,
        postType: form.postType,
        content: form.content,
        status: form.status,
        stacks: form.stacks,
        tags: form.tags,
        contentsFileIds: form.contentsFileIds,
        deletedFileIds: form.deletedFileIds,
        removeThumbnail: form.removeThumbnail,
      };

      const response = await postApi.updatePost(slug, request, form.thumbnail);

      if (response.success) {
        toast.success(response.message || '게시글이 수정되었습니다');
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
  }, [form, slug, navigate, toast]);

  return {
    form,
    originalThumbnailUrl,
    isLoading,
    isFetching,
    error,
    fieldErrors,
    contentLengthError,
    hasUnsavedChanges,
    updateField,
    setThumbnail,
    setRemoveThumbnail,
    addContentFileId,
    addDeletedFileId,
    addTag,
    removeTag,
    addStack,
    removeStack,
    toggleStatus,
    submit,
  };
};