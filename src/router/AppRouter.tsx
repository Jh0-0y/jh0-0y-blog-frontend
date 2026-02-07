import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminRoute, ProtectedRoute } from '@/router/Guard';
import { AuthProvider } from '@/feature/auth/providers/AuthProvider';

//layout
import { HomePostsLayout } from '@/layout/home';
import { UserContentLayout, UserPostsLayout, UserEditorLayout } from '@/layout/blog';
import { AdminLayout } from '@/layout/admin/AdminLayout';
import { PortfolioLayout } from '@/layout/portfolio/PortfolioLayout';

//page
import { HomePostsPage } from '@/pages/home';
import { PostDetailPage, PostWritePage, PostEditPage, UserPostsPage } from '@/pages/blog';
import { AdminAccountPage, AdminDashboardPage, AdminPostsPage, AdminStacksPage, AdminUsersPage } from '@/pages/admin';
import {PortfolioPage} from '@/pages/portfolio/PortfolioPage';

//404
import { NotFoundPage } from '@/pages/notfound';


export const AppRouter = () => (
  <BrowserRouter basename="/">
    <AuthProvider>
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<HomePostsLayout />}>
          <Route index element={<HomePostsPage />} />
          <Route path="type/:postType" element={<HomePostsPage />} />
        </Route>

        {/* 유저 - 콘텐츠 */}
        <Route path="/user/:nickname" element={<UserContentLayout />}>
          <Route path="entry/:slug" element={<PostDetailPage />} />
        </Route>

        {/* 유저 - 에디터 */}
        <Route path="/user/:nickname" element={<UserEditorLayout />}>
          <Route path="entry/:slug/edit" element={<ProtectedRoute><PostEditPage /></ProtectedRoute>} />
          <Route path="write" element={<ProtectedRoute><PostWritePage /></ProtectedRoute>} />
        </Route>

        {/* 유저 - 목록 */}
        <Route path="/user/:nickname" element={<UserPostsLayout />}>
          <Route index element={<UserPostsPage />} />
          {/* 타입별 */}
          <Route path="type/:postType" element={<UserPostsPage />} />
          {/* 스택별 */}
          <Route path="stack/:stack" element={<UserPostsPage />} />
          {/* 스택 + 타입 */}
          <Route path="stack/:stack/type/:postType" element={<UserPostsPage />} />
        </Route>

        {/* 어드민 페이지 */}
        <Route path="/admin" element={<AdminRoute children={<AdminLayout />} />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="posts" element={<AdminPostsPage />} />
          <Route path="stacks" element={<AdminStacksPage />} />
          <Route path="create-account" element={<AdminAccountPage />} />
        </Route>

        <Route path="/user/:nickname" element={<PortfolioLayout />}>
            <Route path="portfolio" element={<PortfolioPage />} />
        </Route>


        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);