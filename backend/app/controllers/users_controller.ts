import { inject } from '@adonisjs/core'
import { UserListResponse } from 'types/dist/user.js'
import UserService from '#services/user_service'

@inject()
export default class UsersController {
  userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  async index(): Promise<UserListResponse> {
    return await this.userService.getAllUsers()
  }
}
