import type { HttpContext } from '@adonisjs/core/http'
import User from '#user/user_model'
import UserTransformer from '#user/user_transformer'

export default class ListUsersController {
  async index({ serialize }: HttpContext) {
    const users = await User.all()
    return serialize(UserTransformer.transform(users))
  }
}
