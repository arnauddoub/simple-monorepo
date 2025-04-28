import type { UserSchema } from '@my-monorepo/types'
import { inject } from '@adonisjs/core'
import UserService from '#services/user_service'

@inject()
export default class UsersController implements UserSchema {
  userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  async index() {
    return await this.userService.getAllUsers()
  }
}
