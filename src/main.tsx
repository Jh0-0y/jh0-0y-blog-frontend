import ReactDOM from 'react-dom/client'
import '@/styles/global.css';
import { AppRouter } from './router/AppRouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/api/core/queryClient';
import { GlobalLoading } from '@/shared/loading/GlobalLoading';
import { Toast } from '@/shared/toast/Toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AppRouter />
    <Toast />
    <GlobalLoading />
  </QueryClientProvider>
)