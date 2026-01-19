import type { PostType, PostStatus } from './post.enums';

/**
 * 게시글 목록 아이템
 */
export interface PostItemResponse {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  postType: PostType;
  status: PostStatus;
  thumbnailUrl: string | null;
  tags: string[];
  stacks: string[];
  createdAt: string;
}

/**
 * 게시글 상세
 */
export interface PostDetailResponse {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  postType: PostType;
  content: string;
  status: PostStatus;
  thumbnailUrl: string | null;
  tags: string[];
  stacks: string[];
  relatedPosts: PostItemResponse[];
  createdAt: string;
  updatedAt: string;
}