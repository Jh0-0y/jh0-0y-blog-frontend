export interface UpdateProfileRequest {
  nickname?: string;
  position?: string;
  about?: string;
  profileImageId?: number | null;
  profileImageUrl?: string | null;
  removeProfileImage?: boolean;
}

export interface ChangePasswordRequest {
  currentPassword:  string;
  newPassword: string;
  newPasswordConfirm: string;
}