import type { PostType } from "./post.enums";

/**
 * 게시글 검색 파라미터
 */
export interface PostSearchParams {
  postType?: PostType;
  stack?: string;
  keyword?: string;
  page?: number;
  size?: number;
  sort?: string;
}

/**
 * 게시글 생성 요청 (Backend: PostRequest.Create)
 */
export interface CreatePostRequest {
  title: string;
  excerpt: string;
  postType: PostType;
  content: string;
  stacks: string[];
  tags: string[];
  thumbnailFileId?: number | null;
  thumbnailPath?: string | null;
}

/**
 * 게시글 수정 요청 (Backend: PostRequest.Update)
 */
export interface UpdatePostRequest {
  title: string;
  excerpt: string;
  postType: PostType;
  content: string;
  stacks: string[];
  tags: string[];
  thumbnailFileId?: number | null;
  thumbnailPath?: string | null;
  removeThumbnail?: boolean;
}