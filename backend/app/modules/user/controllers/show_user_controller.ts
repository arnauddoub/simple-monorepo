import type { HttpContext } from '@adonisjs/core/http';
import User from '#user/user_model';
import UserTransformer from '#user/user_transformer';

export default class ShowUserController {
  async show({ params, serialize }: HttpContext) {
    const user = await User.findOrFail(params.id);
    return serialize(UserTransformer.transform(user));
  }
}
