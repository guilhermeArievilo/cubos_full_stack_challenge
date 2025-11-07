
import * as bcrypt from 'bcrypt';
import LoginUseCase, { LoginDTO } from './../loginUseCase';
import UserRepository from '@/core/users/domain/application/repository/userRepository';
import AuthRepository from '../../repository/authRepository';
import { JwtServiceRS } from '@/shared/infra/jwt/jwt.service';
import User from '@/core/users/domain/entity/user';
import InvalidCredentialsError from '@/shared/exceptions/invalidCredentialsError';
import RefreshToken from '../../../entities/refreshToken';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let userRepository: jest.Mocked<UserRepository>;
  let authRepository: jest.Mocked<AuthRepository>;
  let jwtService: jest.Mocked<JwtServiceRS>;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
    } as any;

    authRepository = {
      generateTokenAndSave: jest.fn(),
    } as any;

    jwtService = {
      signAccess: jest.fn(),
    } as any;

    loginUseCase = new LoginUseCase(userRepository, authRepository, jwtService);
  });

  it('should login successfully with valid credentials', async () => {
    const fakeUser = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: await bcrypt.hash('123456', 10),
    }, '123')

    userRepository.findByEmail.mockResolvedValue(fakeUser);
    jwtService.signAccess.mockReturnValue('mocked-access-token');
    authRepository.generateTokenAndSave.mockResolvedValue({
      token: 'mocked-refresh-token',
      created: new RefreshToken({
        tokenHash: 'mocked-token-hash',
        expiresIn: new Date(),
        userId: fakeUser.id!,
        revoked: false,
      })
    });

    const dto: LoginDTO = { identifier: 'john@example.com', password: '123456' };

    const result = await loginUseCase.execute(dto);

    expect(result.accessToken).toBe('mocked-access-token');
    expect(result.refreshToken).toBe('mocked-refresh-token');
    expect(userRepository.findByEmail).toHaveBeenCalledWith('john@example.com');
    expect(jwtService.signAccess).toHaveBeenCalledWith({
      sub: fakeUser.id,
      name: fakeUser.name,
      email: fakeUser.email,
    });
  });

  it('should throw InvalidCredentialsError if user does not exist', async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    const dto: LoginDTO = { identifier: 'notfound@mail.com', password: '123456' };

    await expect(loginUseCase.execute(dto)).rejects.toThrow(InvalidCredentialsError);
  });

  it('should throw InvalidCredentialsError if password is invalid', async () => {
    const fakeUser = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: await bcrypt.hash('123456', 10),
    }, '123')

    userRepository.findByEmail.mockResolvedValue(fakeUser);

    const dto: LoginDTO = { identifier: 'john@example.com', password: 'wrongpass' };

    await expect(loginUseCase.execute(dto)).rejects.toThrow(InvalidCredentialsError);
  });
});
