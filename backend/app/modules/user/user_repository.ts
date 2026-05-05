import type { CreateUserValidator, UpdateUserValidator } from '#user/user_validator'
import User from '#user/user_model'

export default class UserRepository {
  async getAll() {
    return User.all()
  }

  async getById(id: string) {
    return User.findOrFail(id)
  }

  async create(payload: CreateUserValidator) {
    return User.create(payload)
  }

  async update(id: string, payload: UpdateUserValidator) {
    const user = await User.findOrFail(id)
    user.merge(payload)
    await user.save()
    return user
  }

  async delete(id: string) {
    const user = await User.findOrFail(id)
    await user.delete()
    return user
  }
}
