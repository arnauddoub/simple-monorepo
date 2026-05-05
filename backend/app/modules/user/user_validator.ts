import type { Infer } from '@vinejs/vine/types'
import vine from '@vinejs/vine'
import { UserRole } from '@my-monorepo/contracts'

export const createUserValidator = vine.create(
  vine.object({
    fullName: vine.string(),
    email: vine.string().email().unique({ table: 'users', column: 'email' }),
    password: vine.string().minLength(8),
    role: vine.enum(Object.values(UserRole)),
  })
)
export type CreateUserValidator = Infer<typeof createUserValidator>

export const updateUserValidator = vine.withMetaData<{ userId: string }>().create(
  vine.object({
    fullName: vine.string().optional(),
    email: vine
      .string()
      .email()
      .unique({
        table: 'users',
        column: 'email',
        filter: (query, _value, field) => {
          query.whereNot('id', field.meta.userId)
        },
      })
      .optional(),
    password: vine.string().minLength(8).optional(),
    role: vine.enum(Object.values(UserRole)).optional(),
  })
)
export type UpdateUserValidator = Infer<typeof updateUserValidator>
