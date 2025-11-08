import type AuthRepository from '../repository/authRepository'

export default class LogoutUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<void> {
    await this.authRepository.logout()
    this.authRepository.clearAccessToken()
  }
}
