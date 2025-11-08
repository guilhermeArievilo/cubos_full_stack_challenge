import type { User } from '../entity/user'
import type UserRepository from '../repository/userRepository'

export default class getLocalUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User | null> {
    return this.userRepository.getLocalUser()
  }
}
