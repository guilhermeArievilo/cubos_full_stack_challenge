import { User } from '@/core/features/user/domain/entity/user'
import type { LoginDTO, RegisterDTO, TokenDto } from '../../domain/entities/authEntities'
import api from '@/infra/http/axios/api'

export default class AuthRemoteDatasource {
  public async login(params: LoginDTO) {
    const res = await api.post<TokenDto>('/auth/login', params)
    return res.data
  }

  public async logout() {
    await api.post('/auth/logout')
  }

  public async refreshToken() {
    const res = await api.post<TokenDto>('/auth/refresh')
    return res.data
  }

  public async register(userData: RegisterDTO) {
    const res = await api.post<User>('/user/register', userData)
    return res.data
  }
}
