import type { StackGroup } from "./stack.enums";

export interface Stack {
  id: number;
  name: string;
  stackGroup: StackGroup;
}