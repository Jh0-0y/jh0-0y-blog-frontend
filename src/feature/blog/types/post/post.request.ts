import type { PostStatus, PostType } from "./post.enums";

/**
 * 게시글 검색 조건
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
 * 게시글 생성 요청
 */
export interface CreatePostRequest {
  title: string;
  excerpt: string;
  postType: PostType;
  content: string;
  status?: PostStatus;
  tags?: string[];
  stacks?: string[];
  contentsFileIds?: number[];
}

/**
 * 게시글 수정 요청
 */
export interface UpdatePostRequest {
  title: string;
  excerpt: string;
  postType: PostType;
  content: string;
  status?: PostStatus;
  tags?: string[];
  stacks?: string[];
  contentsFileIds?: number[];
  deletedFileIds?: number[];
  removeThumbnail?: boolean;
}