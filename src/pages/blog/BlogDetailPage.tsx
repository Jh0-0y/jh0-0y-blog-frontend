import { Navigate, useParams } from 'react-router-dom';
import { usePostDetails } from '@/feature/blog/hooks/post/usePostDeteils';
import { useTocItems } from '@/components/editor/hooks/useTocItems';
import { TableOfContents } from '@/components/editor/base/TableOfContents';
import { 
  ThumbnailBanner,
  BlogDetailHeader,
  BlogDetailContents,
  RelatedPosts,
} from '@/feature/blog/components/blog-detail';
import styles from './BlogDetailPage.module.css';

export const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, isLoading } = usePostDetails(slug);
  
  const tocItems = useTocItems('.tiptap-viewer');

  if(isLoading) return null;

  // 게시글 없음 (로딩 중이거나 실제로 없는 경우)
  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className={styles.pageWrapper}>
      {/* 썸네일 배너 */}
      <ThumbnailBanner thumbnailUrl={post.thumbnailUrl} title={post.title} />

      {/* 본문 컨테이너 */}
      <div className={styles.container}>
        {/* 게시글 헤더 */}
        <BlogDetailHeader
          postType={post.postType}
          title={post.title}
          stacks={post.stacks}
          tags={post.tags}
          createdAt={post.createdAt}
        />

        {/* 게시글 본문 */}
        <article className={styles.content}>
          <BlogDetailContents markdownContent={post.content} />
        </article>

        {/* 관련 게시글 */}
        <RelatedPosts relatedPosts={post.relatedPosts || []} />
      </div>

      {/* 목차 */}
      <TableOfContents items={tocItems} />
    </div>
  );
};