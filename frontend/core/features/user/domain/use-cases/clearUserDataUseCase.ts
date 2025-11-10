import type { User } from '../entity/user'
import type UserRepository from '../repository/userRepository'

export default class ClearUserDataUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    this.userRepository.clearLocalUserInfo()
  }
}
