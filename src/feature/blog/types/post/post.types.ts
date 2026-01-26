import type { PostStatus, PostType } from "../../../../api/post/services/post.enums";

/**
 * 게시글 생성 폼 (파일 제외)
 */
export interface PostCreateForm {
  title: string;
  excerpt: string;
  postType: PostType;
  content: string;
  status: PostStatus;
  stacks: string[];
  tags: string[];
}

/**
 * 게시글 수정 폼 (파일 제외)
 */
export interface PostEditForm {
  title: string;
  excerpt: string;
  postType: PostType;
  content: string;
  status: PostStatus;
  stacks: string[];
  tags: string[];
}

/**
 * 게시글 필터
 */
export interface PostsFilter {
  postType?: PostType;
  stack?: string;
  keyword?: string;
}