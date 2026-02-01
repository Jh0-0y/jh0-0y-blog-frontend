import type { PostType, PostStatus } from './post.enums';

/**
 * 작성자 정보 (Backend: PostResponse.AuthorInfo)
 */
export interface AuthorInfo {
  nickname: string;
  profileImageUrl: string | null;
}

/**
 * 게시글 목록 아이템 (Backend: PostResponse.PostItems)
 */
export interface PostItemResponse {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  postType: PostType;
  status: PostStatus;
  thumbnailPath: string | null;
  tags: string[];
  stacks: string[];
  author: AuthorInfo;
  createdAt: string;
}

/**
 * 게시글 상세 (Backend: PostResponse.Detail)
 */
export interface PostDetailResponse {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  postType: PostType;
  content: string;
  status: PostStatus;
  thumbnailPath: string | null;
  tags: string[];
  stacks: string[];
  author: AuthorInfo;
  relatedPosts: PostItemResponse[];
  createdAt: string;
  updatedAt: string;
}

/**
 * 게시글 수정용 응답 (Backend: PostResponse.Edit)
 */
export interface PostEditResponse {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  postType: PostType;
  content: string;
  status: PostStatus;
  thumbnailPath: string | null;
  tags: string[];
  stacks: string[];
  createdAt: string;
  updatedAt: string;
}