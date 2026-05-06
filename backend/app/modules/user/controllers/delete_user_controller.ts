import type { HttpContext } from '@adonisjs/core/http'
import User from '#user/user_model'

export default class DeleteUserController {
  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    response.noContent()
  }
}
