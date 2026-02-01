export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  nickname: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
