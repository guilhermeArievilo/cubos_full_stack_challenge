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
    const store = this.userLocalDatasource;
    return store.setUser(user);
  }

  getLocalUser(): User | null {
    const store = this.userLocalDatasource;
    return store.user;
  }

  clearLocalUserInfo(): void {
    const store = this.userLocalDatasource;
    store.clearUserData();
  }

  async findUser(): Promise<User> {
    return await this.userRemoteDatasource.findUser()
  }
}
