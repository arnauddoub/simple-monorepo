import type { DateTime } from 'luxon'

export interface User {
  id: string
  fullName: string
  email: string
  role: UserRole
  password: string
  createdAt: DateTime | string
  updatedAt: DateTime | string | null
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export type CreateUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUser = Partial<User>;