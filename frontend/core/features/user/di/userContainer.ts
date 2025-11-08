import api from '@/core/http/axiosClient'
import UserRemoteDatasource from '../data/datasource/userRemoteDatasource'
import { useUserStore } from '../data/datasource/userStoreDatasource'
import UserRepositoryImpl from '../data/repository/userRepositoryImpl'
import findUserUseCase from '../domain/use-cases/findUserUseCase'
import getLocalUserUseCase from '../domain/use-cases/getLocalUser'

export function createUserContainer() {
  const userRemoteDatasource = new UserRemoteDatasource(api)
  const userLocalDatasource = useUserStore()

  const userRepository = new UserRepositoryImpl(userRemoteDatasource, userLocalDatasource)

  return {
    findUser: new findUserUseCase(userRepository),
    getLocalUser: new getLocalUserUseCase(userRepository),
  }
}

export type UserContainer = ReturnType<typeof createUserContainer>
