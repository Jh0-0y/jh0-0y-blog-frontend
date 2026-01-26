import { useMutation, useQueryClient } from '@tanstack/react-query';
import { stackApi } from '../services';
import { stackKeys } from '../queries';
import type { CreateStackRequest, UpdateStackRequest } from '@/api/stack/types';

/**
 * 스택 생성 mutation
 */
export const useCreateStackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateStackRequest) => stackApi.createStack(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stackKeys.all });
    },
  });
};

/**
 * 스택 수정 mutation
 */
export const useUpdateStackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ stackId, request }: { stackId: number; request: UpdateStackRequest }) =>
      stackApi.updateStack(stackId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stackKeys.all });
    },
  });
};

/**
 * 스택 삭제 mutation
 */
export const useDeleteStackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (stackId: number) => stackApi.deleteStack(stackId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stackKeys.all });
    },
  });
};