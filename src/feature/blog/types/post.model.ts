import type { PostType, PostStatus } from './post.enums';

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  PostType: PostType;
  date: string;
  stacks: string[];
  tags: string[];
  content?: string | null;
  status?: PostStatus;
  createdAt?: string;
  updatedAt?: string;
}