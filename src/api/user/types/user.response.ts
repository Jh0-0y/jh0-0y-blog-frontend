import type { UserRole } from "./user.enums";

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  nickname: string;
  role: UserRole;
  position: string | null;
  about: string | null;
  profileImagePath: string | null;
}

export interface BlogUserResponse {
  nickname: string;
  profileImageUrl: string | null;
}