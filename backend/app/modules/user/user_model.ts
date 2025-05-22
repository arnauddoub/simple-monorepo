import type { User as UserInterface, UserRole } from '@my-monorepo/types'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import crypto from 'node:crypto'

export default class User extends BaseModel implements UserInterface {
  static readonly selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare fullName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: UserRole

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static assignUuid(user: User) {
    user.id = crypto.randomUUID()
  }
}
