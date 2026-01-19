import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TerminalLoader } from './TerminalLoader';

interface PageTransitionContextType {
  isLoading: boolean;
  navigateWithTransition: (to: string, messages?: string[]) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | null>(null);

interface PageTransitionProviderProps {
  children: ReactNode;
  defaultMessages?: string[];
}

export const PageTransitionProvider = ({
  children,
  defaultMessages,
}: PageTransitionProviderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [customMessages, setCustomMessages] = useState<string[] | undefined>(undefined);

  // 페이지 전환 함수
  const navigateWithTransition = useCallback((to: string, messages?: string[]) => {
    if (location.pathname === to) return; // 같은 페이지면 무시

    setCustomMessages(messages);
    setIsLoading(true);
    setPendingPath(to);
  }, [location.pathname]);

  // 로딩 완료 후 실제 페이지 이동
  const handleTransitionComplete = useCallback(() => {
    if (pendingPath) {
      navigate(pendingPath);
      setPendingPath(null);
      setCustomMessages(undefined);
    }
    setIsLoading(false);
  }, [pendingPath, navigate]);

  // 로딩이 시작되면 일정 시간 후 완료 처리
  useEffect(() => {
    if (isLoading && pendingPath) {
      const timer = setTimeout(() => {
        // 최소 로딩 시간 (메시지 타이핑이 끝날 때까지)
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, pendingPath]);

  return (
    <PageTransitionContext.Provider value={{ isLoading, navigateWithTransition }}>
      {children}
      <TerminalLoader
        isLoading={isLoading}
        onComplete={handleTransitionComplete}
        messages={customMessages || defaultMessages}
      />
    </PageTransitionContext.Provider>
  );
};

// 커스텀 훅
export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within PageTransitionProvider');
  }
  return context;
};
