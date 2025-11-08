import AuthRemoteDatasource from '../features/auth/data/datasource/authRemoteDatasource'
import AuthRepositoryImpl from '../features/auth/data/repository/authRepositoryImpl';
import LoginUseCase from '../features/auth/domain/use-cases/loginUseCase';
import LogoutUseCase from '../features/auth/domain/use-cases/logoutUseCase';
import RefreshUseCase from '../features/auth/domain/use-cases/refreshUseCase';
import RegisterUseCase from '../features/auth/domain/use-cases/registerUseCase';
import { useAuthStore } from '../features/auth/data/datasource/authStoreDatasource';


export default function useContainer() {
  const authStore = useAuthStore()
  const authRemoteDatasource = new AuthRemoteDatasource();

  const authRepository = new AuthRepositoryImpl(authRemoteDatasource, authStore);

  const loginUseCase = new LoginUseCase(authRepository);
  const logoutUseCase = new LogoutUseCase(authRepository);
  const refreshUseCase = new RefreshUseCase(authRepository);
  const registerUseCase = new RegisterUseCase(authRepository);

  const authModule = {
    loginUseCase,
    logoutUseCase,
    refreshUseCase,
    registerUseCase
  }

  return {
    authModule
  }
}