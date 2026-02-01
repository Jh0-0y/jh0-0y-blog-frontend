import { Navigate, useParams } from 'react-router-dom';
import { usePostDetails } from '@/feature/blog/hooks/post/usePostDetails';
import { useTocItems } from '@/shared/editor/hooks/useTocItems';
import { TableOfContents } from '@/shared/editor/base/TableOfContents';
import { 
  PostThumbnail,
  PostDetailHeader,
  PostDetailContents,
  PostRelated,
} from '@/feature/blog/components/post-detail';
import styles from './PostDetailPage.module.css';
import { SwimmingDolphin } from '@/shared/dolphin/SwimmingDolphin';

export const PostDetailPage = () => {
  const { nickname, slug } = useParams<{ nickname: string, slug: string }>();
  const { post, isLoading } = usePostDetails(nickname!, slug!);

  const tocItems = useTocItems('.tiptap-viewer');

  if (isLoading) {
    return null; // 또는 <div>Loading...</div>
  }

  // 게시글 없음 (로딩 중이거나 실제로 없는 경우)
  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className={styles.pageWrapper}>
      <SwimmingDolphin />
      {/* 썸네일 배너 */}
      <PostThumbnail thumbnailPath={post.thumbnailPath} title={post.title} />

      {/* 본문 컨테이너 */}
      <div className={styles.container}>
        {/* 게시글 헤더 */}
        <PostDetailHeader
          postType={post.postType}
          title={post.title}
          stacks={post.stacks}
          tags={post.tags}
          createdAt={post.createdAt}
        />

        {/* 게시글 본문 */}
        <article className={styles.content}>
          <PostDetailContents markdownContent={post.content} />
        </article>

        {/* 관련 게시글 */}
        <PostRelated relatedPosts={post.relatedPosts || []} />
      </div>

      {/* 목차 */}
      <TableOfContents items={tocItems} />
    </div>
  );
};