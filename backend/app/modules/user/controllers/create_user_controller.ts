import type { HttpContext } from '@adonisjs/core/http';
import { inject } from '@adonisjs/core';
import { createUserValidator } from '#user/user_validator';
import UserTransformer from '#user/user_transformer';
import UserCreationService from '#user/services/user_creation_service';

@inject()
export default class CreateUserController {
  constructor(private userCreation: UserCreationService) {}

  async store({ request, serialize }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator);
    const user = await this.userCreation.create(payload);
    return serialize(UserTransformer.transform(user));
  }
}
