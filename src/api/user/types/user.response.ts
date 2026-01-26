import type { UserRole } from "./user.enums";

export interface UserResponse {
  id: number;
  email: string;
  nickname: string;
  role: UserRole;
  profileImageUrl: string | null;
}