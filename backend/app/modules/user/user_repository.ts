import type { CreateUser } from '@my-monorepo/types'
import User from '#user/user_model'

export default class UserRepository {
  async getAllUsers() {
    return await User.all()
  }

  async getUserById(id: string) {
    return await User.findOrFail(id)
  }

  async createUser(user: CreateUser) {
    return await User.create(user)
  }

  async updateUser(id: string, payload: Partial<CreateUser>) {
    const user = await User.findOrFail(id)
    user.merge(payload)
    await user.save()
    return user
  }

  async deleteUser(id: string) {
    const user = await User.findOrFail(id)
    await user.delete()
    return user
  }
}
