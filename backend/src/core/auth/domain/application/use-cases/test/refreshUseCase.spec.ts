
import UserRepository from "@/core/users/domain/application/repository/userRepository";
import { UnauthorizedException } from "@nestjs/common";
import AuthRepository from "../../repository/authRepository";
import RefreshUseCase from "./../refreshUseCase";
import { JwtServiceRS } from "@/shared/infra/jwt/jwt.service";
import RefreshToken from "../../../entities/refreshToken";
import User from "@/core/users/domain/entity/user";

describe('RefreshUseCase', () => {
  let useCase: RefreshUseCase;
  let userRepository: jest.Mocked<UserRepository>;
  let authRepository: jest.Mocked<AuthRepository>;
  let jwtService: jest.Mocked<JwtServiceRS>;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
    };
    authRepository = {
      generateTokenAndSave: jest.fn(),
      findByHash: jest.fn(),
      revokeById: jest.fn(),
      revokeAllByUserId: jest.fn(),
      verifyToken: jest.fn(),
      hash: jest.fn(),
    };
    jwtService = {
      signAccess: jest.fn(),
      signRefresh: jest.fn(),
      verify: jest.fn(),
    } as unknown as jest.Mocked<JwtServiceRS>;

    useCase = new RefreshUseCase(userRepository, authRepository, jwtService);
  });

  it('should refresh the tokens', async () => {
    const token = new RefreshToken({
      userId: 'user-id',
      expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24),
      revoked: false,
      tokenHash: 'token-hash',
    }, 'token-id');

    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    }, 'user-id');

    authRepository.verifyToken.mockResolvedValue(token);
    userRepository.findById.mockResolvedValue(user);
    jwtService.signAccess.mockReturnValue('new-access-token');
    authRepository.generateTokenAndSave.mockResolvedValue({ token: 'new-refresh-token', created: {} as RefreshToken });

    const result = await useCase.execute('valid-token');

    expect(authRepository.verifyToken).toHaveBeenCalledWith('valid-token');
    expect(authRepository.revokeById).toHaveBeenCalledWith('token-id');
    expect(userRepository.findById).toHaveBeenCalledWith('user-id');
    expect(jwtService.signAccess).toHaveBeenCalled();
    expect(authRepository.generateTokenAndSave).toHaveBeenCalledWith('user-id');
    expect(result).toEqual({ accessToken: 'new-access-token', refreshToken: 'new-refresh-token' });
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    authRepository.verifyToken.mockResolvedValue(null);
    await expect(useCase.execute('invalid-token')).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if user is not found', async () => {
    const token = new RefreshToken({
      userId: 'user-id',
      expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24),
      revoked: false,
      tokenHash: 'token-hash',
    }, 'token-id');

    authRepository.verifyToken.mockResolvedValue(token);
    userRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('valid-token')).rejects.toThrow(UnauthorizedException);
  });
});
