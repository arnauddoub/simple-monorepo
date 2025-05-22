import type { Infer } from '@vinejs/vine/types'
import { UserRole } from '@my-monorepo/types'
import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string(),
    email: vine.string().email(),
    password: vine.string().minLength(8),
    role: vine.enum(Object.values(UserRole)),
  })
)
export type CreateUserValidator = Infer<typeof createUserValidator>

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().optional(),
    email: vine.string().email().optional(),
    password: vine.string().minLength(8).optional(),
    role: vine.enum(Object.values(UserRole)).optional(),
  })
)
export type UpdateUserValidator = Infer<typeof updateUserValidator>