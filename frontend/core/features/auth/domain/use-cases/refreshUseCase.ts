import type AuthRepository from '../repository/authRepository'

export default class RefreshUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<string | null> {
    try {
      const { accessToken } = await this.authRepository.refreshToken()
      this.authRepository.setAccessToken(accessToken)
      return accessToken
    } catch {
      return null
    }
  }
}
