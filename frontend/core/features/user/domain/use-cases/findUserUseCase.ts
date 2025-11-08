import type { User } from '../entity/user'
import type UserRepository from '../repository/userRepository'

export default class findUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User> {
    const user = await this.userRepository.findUser()
    this.userRepository.saveUser(user)
    return user
  }
}
