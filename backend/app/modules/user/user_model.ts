import type { UserRole } from '@my-monorepo/contracts'
import { UserSchema } from '#database/schema'

export default class User extends UserSchema {
  declare role: UserRole
}
