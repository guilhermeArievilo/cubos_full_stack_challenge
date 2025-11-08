import type { LoginDTO, TokenDto } from '../entities/authEntities'
import type AuthRepository from '../repository/authRepository'

export default class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(params: LoginDTO): Promise<TokenDto> {
    const { identifier, password } = params

    if (!identifier) {
      throw new Error('Identifier is required')
    }

    if (!password) {
      throw new Error('Password is required')
    }

    const { accessToken } = await this.authRepository.login(params)
    this.authRepository.setAccessToken(accessToken)
    return { accessToken }
  }
}
