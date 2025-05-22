import type { CreateUser, UpdateUser } from '@my-monorepo/types'
import { inject } from '@adonisjs/core'
import UserRepository from '#user/user_repository'

@inject()
export default class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers() {
    return this.userRepository.getAllUsers()
  }

  async getUserById(id: string) {
    return this.userRepository.getUserById(id)
  }

  async createUser(user: CreateUser) {
    return this.userRepository.createUser(user)
  }

  async updateUser(id: string, user: UpdateUser) {
    return this.userRepository.updateUser(id, user)
  }

  async deleteUser(id: string) {
    return this.userRepository.deleteUser(id)
  }
}
