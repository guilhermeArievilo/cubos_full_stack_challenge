import type { User } from '@/features/user/domain/entity/user'
import type { LoginDTO, RegisterDTO, TokenDto } from '../entities/authEntities'

export default abstract class AuthRepository {
  abstract login(params: LoginDTO): Promise<TokenDto>
  abstract register(params: RegisterDTO): Promise<User>
  abstract logout(): Promise<void>
  abstract setAccessToken(token: string): void
  abstract getAccessToken(): string | null
  abstract clearAccessToken(): void
  abstract refreshToken(): Promise<TokenDto>
}
