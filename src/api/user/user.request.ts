export interface UpdateProfileRequest {
  nickname?: string;
}

export interface ChangePasswordRequest {
  currentPassword:  string;
  newPassword: string;
  newPasswordConfirm: string;
}