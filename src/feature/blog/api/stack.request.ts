/**
 * 스택 생성 요청
 * 백엔드: StackRequest.Create
 */
export interface CreateStackRequest {
  name: string;
  stackGroup: string;
}

/**
 * 스택 수정 요청
 * 백엔드: StackRequest.Update
 */
export interface UpdateStackRequest {
  name: string;
  stackGroup: string;
}