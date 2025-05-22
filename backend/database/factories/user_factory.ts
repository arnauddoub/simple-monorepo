import { UserRole } from '@my-monorepo/types'
import factory from '@adonisjs/lucid/factories'
import User from '#user/user_model'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'password',
      role: UserRole.USER,
    }
  })
  .build()
