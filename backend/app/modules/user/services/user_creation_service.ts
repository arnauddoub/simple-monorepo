import { inject } from '@adonisjs/core';
import User from '#user/user_model';
import type { CreateUserValidator } from '#user/user_validator';

@inject()
export default class UserCreationService {
  async create(payload: CreateUserValidator) {
    const user = await User.create(payload);

    // TODO: send welcome email via @adonisjs/mail
    // TODO: emit `user:created` via @adonisjs/core/events

    return user;
  }
}
