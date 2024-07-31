import { inject } from '@adonisjs/core'
import UserRepository from '#repositories/user_repository'

@inject()
export default class UserService {
  userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async getAllUsers() {
    return this.userRepository.getAllUsers()
  }
}
