import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  requestCount: number;
  showLoading: () => void;
  hideLoading: () => void;
}

// 내부 스토어 (외부 노출 X)
const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  requestCount: 0,
  
  showLoading: () => set((state) => ({
    requestCount: state.requestCount + 1,
    isLoading: true,
  })),
  
  hideLoading: () => set((state) => {
    const newCount = Math.max(0, state.requestCount - 1);
    return {
      requestCount: newCount,
      isLoading: newCount > 0,
    };
  }),
}));

// 컴포넌트에서 사용할 훅
export const useLoading = () => {
  return useLoadingStore((state) => state.isLoading);
};

// Axios 인터셉터에서 사용 (내부 전용)
export const _getLoadingStore = () => useLoadingStore.getState();