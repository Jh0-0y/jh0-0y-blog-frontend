export interface UpdateProfileRequest {
  nickname?: string;
  profileImageId?: number | null;
  profileImageUrl?: string | null;
}

export interface ChangePasswordRequest {
  currentPassword:  string;
  newPassword: string;
  newPasswordConfirm: string;
}