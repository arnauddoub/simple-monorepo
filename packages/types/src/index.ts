import { User } from "./user"

export * from "./user"

export type Response<T extends (...args: any) => any> = Awaited<ReturnType<T>>;

export interface UserSchema {
  index: () => Promise<User[]>
}