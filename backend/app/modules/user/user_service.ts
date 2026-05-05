import type { CreateUserValidator, UpdateUserValidator } from '#user/user_validator'
import { inject } from '@adonisjs/core'
import UserRepository from '#user/user_repository'

@inject()
export default class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers() {
    return this.userRepository.getAll()
  }

  async getUserById(id: string) {
    return this.userRepository.getById(id)
  }

  async createUser(payload: CreateUserValidator) {
    return this.userRepository.create(payload)
  }

  async updateUser(id: string, payload: UpdateUserValidator) {
    return this.userRepository.update(id, payload)
  }

  async deleteUser(id: string) {
    return this.userRepository.delete(id)
  }
}
