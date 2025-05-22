import type { HttpContext } from '@adonisjs/core/http'
import type { UsersSchema, Response } from '@my-monorepo/types'
import { inject } from '@adonisjs/core'
import { createUserValidator } from '@my-monorepo/validators'
import UserService from '#user/user_service'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async index(): Response<UsersSchema['index']> {
    return await this.userService.getAllUsers()
  }

  async show({ params }: HttpContext): Response<UsersSchema['show']> {
    return await this.userService.getUserById(params.id)
  }

  async store({ request }: HttpContext): Response<UsersSchema['store']> {
    const payload = await request.validateUsing(createUserValidator)

    return await this.userService.createUser(payload)
  }

  async update({ params, request }: HttpContext): Response<UsersSchema['update']> {
    const payload = await request.validateUsing(createUserValidator)

    return await this.userService.updateUser(params.id, payload)
  }

  async destroy({ params, response }: HttpContext): Response<UsersSchema['destroy']> {
    await this.userService.deleteUser(params.id)
    response.noContent()
  }
}
