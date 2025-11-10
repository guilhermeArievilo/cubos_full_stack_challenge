import { RegisterDTO } from '@/core/features/auth/domain/entities/authEntities'
import type { User } from '../../domain/entity/user'
import api from '@/infra/http/axios/api'

export default class UserRemoteDatasource {

  public async findUser() {
    const res = await api.get<User>('/user')
    return res.data
  }

  public async register(userData: RegisterDTO) {
    const res = await api.post<User>('/user/register', userData)
    return res.data
  }
}
