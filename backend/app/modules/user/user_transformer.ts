import type User from '#user/user_model';
import { BaseTransformer } from '@adonisjs/core/transformers';

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return this.pick(this.resource, ['id', 'fullName', 'email', 'role', 'createdAt', 'updatedAt']);
  }
}
