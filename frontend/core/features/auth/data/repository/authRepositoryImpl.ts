import { User } from '@/core/features/user/domain/entity/user'
import type { LoginDTO, TokenDto, RegisterDTO } from '../../domain/entities/authEntities'
import type AuthRepository from '../../domain/repository/authRepository'
import AuthRemoteDatasource from '../datasource/authRemoteDatasource'
import { AuthStoreDatasource } from '../datasource/authStoreDatasource'

export default class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly authRemoteDatasource: AuthRemoteDatasource,
    private readonly authLocalDatasource: AuthStoreDatasource,
  ) {}

  async refreshToken(): Promise<TokenDto> {
    return this.authRemoteDatasource.refreshToken()
  }

  async login(params: LoginDTO): Promise<TokenDto> {
    return await this.authRemoteDatasource.login(params)
  }

  async register(params: RegisterDTO): Promise<User> {
    return await this.authRemoteDatasource.register(params)
  }

  async logout(): Promise<void> {
    return await this.authRemoteDatasource.logout()
  }

  setAccessToken(token: string): void {
    const store = this.authLocalDatasource;
    store.setAccessToken(token);
  }

  getAccessToken(): string | null {
    const store = this.authLocalDatasource;
    return store.accessToken;
  }

  clearAccessToken(): void {
    const store = this.authLocalDatasource;
    store.clearAcessToken();
  }
}
