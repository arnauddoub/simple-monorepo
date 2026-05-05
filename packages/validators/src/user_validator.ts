import type { Infer } from '@vinejs/vine/types'
import vine from '@vinejs/vine'
import { UserRole } from '@my-monorepo/contracts'

export const createUserValidator = vine.create(
  vine.object({
    fullName: vine.string(),
    email: vine.string().email(),
    password: vine.string().minLength(8),
    role: vine.enum(Object.values(UserRole)),
  })
)
export type CreateUserValidator = Infer<typeof createUserValidator>

export const updateUserValidator = vine.create(
  vine.object({
    fullName: vine.string().optional(),
    email: vine.string().email().optional(),
    password: vine.string().minLength(8).optional(),
    role: vine.enum(Object.values(UserRole)).optional(),
  })
)
export type UpdateUserValidator = Infer<typeof updateUserValidator>
