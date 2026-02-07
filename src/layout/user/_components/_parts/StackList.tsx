import { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  HiOutlineCode,
  HiOutlineCube,
  HiOutlinePuzzle,
  HiOutlineDatabase,
  HiOutlineCloud,
  HiOutlineLightBulb,
  HiOutlineTerminal,
  HiOutlineDotsHorizontal,
  HiChevronDown,
} from 'react-icons/hi';

import { STACK_GROUP_LABELS, STACK_GROUP_ORDER, type StackGroup } from '@/api/stack/types';
import { useUserStacks } from '@/feature/post/hooks/stack/useUserStacks';
import styles from './StackList.module.css';

// 그룹별 아이콘 매핑
const GROUP_ICONS: Record<StackGroup, React.ComponentType<{ className?: string }>> = {
  LANGUAGE: HiOutlineCode,
  FRAMEWORK: HiOutlineCube,
  LIBRARY: HiOutlinePuzzle,
  DATABASE: HiOutlineDatabase,
  DEVOPS: HiOutlineCloud,
  KNOWLEDGE: HiOutlineLightBulb,
  TOOL: HiOutlineTerminal,
  ETC: HiOutlineDotsHorizontal,
};

interface StackListProps {
  onStackSelect?: () => void;
}

export const StackList = ({ onStackSelect }: StackListProps) => {
  const navigate = useNavigate();
  const params = useParams<{ nickname: string; postType?: string; stack?: string }>();
  const [searchParams] = useSearchParams();
  const { nickname, groupedStacks, isLoading } = useUserStacks();

  // 현재 선택된 스택 (URL path에서 읽기)
  const selectedStack = params.stack || null;

  // 펼쳐진 그룹 상태 관리
  const [expandedGroups, setExpandedGroups] = useState<Set<StackGroup>>(new Set());

  // 그룹 토글 핸들러
  const handleGroupToggle = (group: StackGroup) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) {
        next.delete(group);
      } else {
        next.add(group);
      }
      return next;
    });
  };

  // 스택 클릭 핸들러
  const handleStackClick = (stackName: string) => {
    const keyword = searchParams.get('q');

    // 이미 선택된 스택이면 해제 (유저 홈으로)
    if (selectedStack === stackName) {
      const basePath = `/user/${nickname}`;
      navigate(keyword ? `${basePath}?q=${keyword}` : basePath);
    } else {
      // 새 스택 선택
      const basePath = `/user/${nickname}/stack/${stackName}`;
      navigate(keyword ? `${basePath}?q=${keyword}` : basePath);
    }

    // 모바일에서 사이드바 닫기
    onStackSelect?.();
  };

  // 그룹별 전체 포스트 수 계산
  const getGroupPostCount = (stacks: Array<{ postCount: number }>) => {
    return stacks.reduce((sum, stack) => sum + stack.postCount, 0);
  };

  if (isLoading) {
    return <div className={styles.loading}>로딩중...</div>;
  }

  // 스택이 없을 때
  if (groupedStacks && Object.values(groupedStacks).every((g) => g.length === 0)) {
    return (
      <div className={styles.emptyState}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
        <p>등록된 스택이 없습니다</p>
      </div>
    );
  }

  return (
    <div className={styles.scrollArea}>
      <div className={styles.stackList}>
        {groupedStacks &&
          STACK_GROUP_ORDER.map((group) => {
            const stacks = groupedStacks[group];

            // 해당 그룹에 스택이 없으면 스킵
            if (!stacks || stacks.length === 0) return null;

            const isExpanded = expandedGroups.has(group);
            const groupPostCount = getGroupPostCount(stacks);
            const IconComponent = GROUP_ICONS[group];
            const hasActiveStack = stacks.some((s) => s.name === selectedStack);

            return (
              <div key={group} className={styles.groupWrapper}>
                {/* 그룹 헤더 */}
                <button
                  className={`${styles.groupHeader} ${hasActiveStack ? styles.active : ''}`}
                  onClick={() => handleGroupToggle(group)}
                >
                  <div className={styles.groupIcon}>
                    <IconComponent />
                  </div>
                  <div className={styles.groupInfo}>
                    <span className={styles.groupLabel}>{STACK_GROUP_LABELS[group]}</span>
                    <span className={styles.groupCount}>{groupPostCount}</span>
                  </div>
                  <HiChevronDown
                    className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ''}`}
                  />
                </button>

                {/* 스택 목록 (드롭다운) */}
                {isExpanded && (
                  <div className={styles.stackItems}>
                    {stacks.map((stack) => (
                      <button
                        key={stack.id}
                        className={`${styles.stackItem} ${
                          selectedStack === stack.name ? styles.stackActive : ''
                        }`}
                        onClick={() => handleStackClick(stack.name)}
                      >
                        <div className={styles.stackInfo}>
                          <span className={styles.stackName}>{stack.name}</span>
                          <span className={styles.stackCount}>{stack.postCount}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};