import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute, GuestRoute } from '@/router/guards';

import { BlogLayout } from '@/layout/post/BlogLayout';
import { BlogHomePage, BlogDetailPage, BlogWritePage, BlogEditPage } from '@/pages/blog';
import { LoginPage, SignUpPage } from '@/pages/auth';
import { NotFoundPage } from '@/pages/notfound';

import ToastTest from '@/pages/test/ToastTest';
import { AuthLayout } from '@/layout/auth/AuthLayout';
import EditorTest from '@/pages/test/EditorTest';

export const AppRouter = () => (
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<BlogLayout />}>
        <Route index element={<BlogHomePage />} />
        <Route path=":postType">
          <Route index element={<BlogHomePage />} />
          <Route path="post/:slug" element={<BlogDetailPage />} />
        </Route>

        <Route path=":group/:stack">
          <Route index element={<BlogHomePage />} />
          <Route path="post/:slug" element={<BlogDetailPage />} />
        </Route>

        <Route path=":group/:stack/:postType">
          <Route index element={<BlogHomePage />} />
          <Route path="post/:slug" element={<BlogDetailPage />} />
        </Route>

        <Route path="post/:slug" element={<BlogDetailPage />} />
        

        <Route path="write" element={
          <ProtectedRoute>
            <BlogWritePage />
          </ProtectedRoute>
        } />
        
        <Route path="post/:slug/edit" element={
          <ProtectedRoute>
            <BlogEditPage />
          </ProtectedRoute>
        } />
      </Route>

     {/* 로그인/회원가입 (비로그인만) - GuestRoute를 element로 */}
      <Route path="auth" element={
        <GuestRoute>
          <AuthLayout />
        </GuestRoute>
      }>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>

      <Route path="test" element={
        <ToastTest />
      } />

      <Route path="editor" element={
        <EditorTest />
      } />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);