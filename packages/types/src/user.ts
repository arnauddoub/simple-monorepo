import type { DateTime } from 'luxon'

export interface UserInterface {
  id: string
  fullName: string
  email: string
  role: UserRole
  createdAt: DateTime
  updatedAt: DateTime | null
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
} 