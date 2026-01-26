import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../services';
import { userKeys } from '../queries';
import type { UpdateProfileRequest, ChangePasswordRequest } from '../types';

/**
 * 프로필 수정 mutation
 */
export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdateProfileRequest) => userApi.updateProfile(request),
    onSuccess: (data) => {
      if (data.data) {
        queryClient.setQueryData(userKeys.me(), data);
      }
    },
  });
};

/**
 * 비밀번호 변경 mutation
 */
export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (request: ChangePasswordRequest) => userApi.changePassword(request),
  });
};