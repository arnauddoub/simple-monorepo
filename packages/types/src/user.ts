import type { DateTime } from 'luxon'

export interface User {
  id: string
  fullName: string
  email: string
  role: UserRole
  createdAt: DateTime | string
  updatedAt: DateTime | string | null
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
