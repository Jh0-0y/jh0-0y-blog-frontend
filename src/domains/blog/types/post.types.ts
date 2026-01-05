import type { PostCategory, PostStatus } from './common.types';

// 게시글
export interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: PostCategory;
  date: string;
  readTime: string;
  tags: string[];
  content?: string | null;
  status?: PostStatus;
  createdAt?: string;
  updatedAt?: string;
}

// 목차 섹션
export interface TableOfContentsSection {
  id: string;
  title: string;
  level: 1 | 2 | 3;
}

// 인접 게시글 (이전/다음)
export interface AdjacentPosts {
  prev: Post | null;
  next: Post | null;
}