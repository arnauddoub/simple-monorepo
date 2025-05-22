import { User } from "./user.js"

export * from "./user.js"

export type Response<T extends (...args: any) => any> = Awaited<ReturnType<T>>;

export interface UserSchema {
  index: () => Promise<User[]>
}