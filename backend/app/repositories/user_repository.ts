import User from '#models/user'

export default class UserRepository {
  async getAllUsers() {
    return await User.all()
  }
}
