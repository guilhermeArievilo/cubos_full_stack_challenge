import type { User } from '../../domain/entity/user'
import type UserRepository from '../../domain/repository/userRepository'
import type UserRemoteDatasource from '../datasource/userRemoteDatasource'
import type { UserStoreDatasource } from '../datasource/userStoreDatasource'

export default class UserRepositoryImpl implements UserRepository {
  constructor(
    private readonly userRemoteDatasource: UserRemoteDatasource,
    private readonly userLocalDatasource: UserStoreDatasource,
  ) {}
  saveUser(user: User): void {
    this.userLocalDatasource.setUser(user)
  }

  getLocalUser(): User | null {
    return this.userLocalDatasource.user
  }

  async findUser(): Promise<User> {
    return await this.userRemoteDatasource.findUser()
  }
}
