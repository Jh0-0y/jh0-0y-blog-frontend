import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/feature/auth/stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * 인증이 필요한 라우트를 보호하는 컴포넌트
 * - 미인증 시 로그인 페이지로 리다이렉트
 * - 로그인 후 원래 페이지로 돌아올 수 있도록 현재 경로 저장
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // 로그인 후 돌아올 경로 저장
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

/**
 * 이미 로그인한 사용자의 접근을 막는 컴포넌트
 * - 로그인/회원가입 페이지에 사용
 * - 이미 로그인된 경우 메인 페이지로 리다이렉트
 */
export const GuestRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (isAuthenticated) {
    // 이전 페이지 또는 메인으로 리다이렉트
    const from = (location.state as { from?: Location })?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

