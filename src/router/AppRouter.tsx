import { BlogLayout } from '@/domains/blog/layouts';
import { BlogHomePage } from '@/domains/blog/pages';
import { BlogPostPage } from '@/domains/blog/pages/BlogPostPage';
import { BlogWritePage } from '@/domains/blog/pages/BlogWritePage';
import { NotFoundPage } from '@/pages/notfound';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BlogLayout />,
    children: [
      {
        index: true,
        element: <BlogHomePage />,
      },
      {
        path: 'post/:id',
        element: <BlogPostPage />,
      },
      {
        path: 'write',
        element: <BlogWritePage />,
      },
      {
        path: 'edit/:id',
        element: <BlogWritePage />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
]);