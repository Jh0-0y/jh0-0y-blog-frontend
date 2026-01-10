import type { PostType, PostStatus } from '../types';

export interface PostForm {
  title: string;
  excerpt: string;
  postType: PostType;
  content: string;
  status: PostStatus;
  stacks: string[];
  tags: string[];
}

export interface UsePostWriteReturn {
  form: PostForm;
  isLoading: boolean;
  isFetching: boolean;
  error: string | null;
  fieldErrors: Record<string, string> | null;
  updateField: <K extends keyof PostForm>(key: K, value: PostForm[K]) => void;
  setForm: (form: PostForm) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  submit: () => Promise<void>;
  toggleStatus: () => void;
}