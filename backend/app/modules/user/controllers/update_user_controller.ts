import type { HttpContext } from '@adonisjs/core/http';
import { updateUserValidator } from '#user/user_validator';
import User from '#user/user_model';
import UserTransformer from '#user/user_transformer';

export default class UpdateUserController {
  async update({ params, request, serialize }: HttpContext) {
    const payload = await request.validateUsing(updateUserValidator, {
      meta: { userId: params.id },
    });
    const user = await User.findOrFail(params.id);
    user.merge(payload);
    await user.save();
    return serialize(UserTransformer.transform(user));
  }
}
