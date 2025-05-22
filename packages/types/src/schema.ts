import type { User } from "./user.js"
import type { CreateUserValidator, UpdateUserValidator } from "@my-monorepo/validators";

export type Response<T extends (...args: any) => any> = Promise<ReturnType<T>>;
export type Validator<T> = T extends (arg: infer A, ...args: any[]) => any ? A : never

export interface UsersSchema {
  index: () => User[]
  show: () => User
  store: (validator: CreateUserValidator) => User
  update: (validator: UpdateUserValidator) => User
  destroy: () => void
}