import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseSearchReturn {
  // 상태
  keyword: string;
  inputValue: string;
  
  // 액션
  setInputValue: (value: string) => void;
  handleSearch: () => void;
  clearSearch: () => void;
}

export const useSearch = (): UseSearchReturn => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // URL의 keyword 파라미터
  const keyword = searchParams.get('keyword') || '';
  
  // 입력 필드 값 (URL과 별도로 관리)
  const [inputValue, setInputValue] = useState(keyword);

  // URL keyword가 변경되면 input도 동기화
  useEffect(() => {
    setInputValue(keyword);
  }, [keyword]);

  // 검색 실행 (URL 업데이트)
  const handleSearch = useCallback(() => {
    const trimmed = inputValue.trim();
    
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      
      if (trimmed) {
        newParams.set('keyword', trimmed);
      } else {
        newParams.delete('keyword');
      }
      
      // 페이지는 1로 리셋
      newParams.delete('page');
      
      return newParams;
    });
  }, [inputValue, setSearchParams]);

  // 검색어 초기화
  const clearSearch = useCallback(() => {
    setInputValue('');
    
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.delete('keyword');
      newParams.delete('page');
      return newParams;
    });
  }, [setSearchParams]);

  return {
    keyword,
    inputValue,
    setInputValue,
    handleSearch,
    clearSearch,
  };
};