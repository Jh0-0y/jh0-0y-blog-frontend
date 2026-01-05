import type { PostCategory, PostStatus } from './common.types';

// 게시글 작성/수정 폼 데이터
export interface PostFormData {
  title: string;
  excerpt: string;
  category: PostCategory;
  tags: string[];
  content: string;
  status: PostStatus;
}