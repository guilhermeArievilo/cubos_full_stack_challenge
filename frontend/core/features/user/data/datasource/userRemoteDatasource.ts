import type { Axios } from 'axios'
import type { User } from '../../domain/entity/user'
import type { RegisterDTO } from '@/features/auth/domain/entities/authEntities'

export default class UserRemoteDatasource {
  constructor(private apiClient: Axios) {}

  public async findUser() {
    const res = await this.apiClient.get<User>('/user')
    return res.data
  }

  public async register(userData: RegisterDTO) {
    const res = await this.apiClient.post<User>('/user/register', userData)
    return res.data
  }
}
