import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { createUserValidator, updateUserValidator } from '#user/user_validator'
import UserService from '#user/user_service'
import UserTransformer from '#user/user_transformer'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async index({ serialize }: HttpContext) {
    const users = await this.userService.getAllUsers()
    return serialize(UserTransformer.transform(users))
  }

  async show({ params, serialize }: HttpContext) {
    const user = await this.userService.getUserById(params.id)
    return serialize(UserTransformer.transform(user))
  }

  async store({ request, serialize }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    const user = await this.userService.createUser(payload)
    return serialize(UserTransformer.transform(user))
  }

  async update({ params, request, serialize }: HttpContext) {
    const payload = await request.validateUsing(updateUserValidator, {
      meta: { userId: params.id },
    })
    const user = await this.userService.updateUser(params.id, payload)
    return serialize(UserTransformer.transform(user))
  }

  async destroy({ params, response }: HttpContext) {
    await this.userService.deleteUser(params.id)
    response.noContent()
  }
}
