import type { PostType, PostStatus } from '../types/post.enums';

export interface PostListItem {
  id: number;
  title: string;
  excerpt: string;
  postType: PostType;
  status: PostStatus;
  stacks: string[];
  tags: string[];
  createdAt: string;
}

export interface AdjacentPost {
  id: number;
  title: string;
  postType: PostType;
}

export interface PostDetail {
  id: number;
  title: string;
  excerpt: string;
  postType: PostType;
  content: string;
  status: PostStatus;
  stacks: string[];
  tags: string[];
  prev: AdjacentPost | null;
  next: AdjacentPost | null;
  createdAt: string;
  updatedAt: string;
}