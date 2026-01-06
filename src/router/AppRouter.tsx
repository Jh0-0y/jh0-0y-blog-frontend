import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BlogLayout } from '@/domains/blog/layouts';
import { BlogHomePage, BlogPostPage, BlogWritePage } from '@/domains/blog/pages';
import { LoginPage, SignupPage } from '@/pages/auth';
import { NotFoundPage } from '@/pages/notfound';

export const AppRouter = () => (
  <BrowserRouter basename="/jh0-0y-blog">
    <Routes>
      <Route path="/" element={<BlogLayout />}>
        <Route index element={<BlogHomePage />} />
        <Route path="post/:id" element={<BlogPostPage />} />
        <Route path="write" element={<BlogWritePage />} />
        <Route path="edit/:id" element={<BlogWritePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);