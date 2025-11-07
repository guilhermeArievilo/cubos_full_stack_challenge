
import { UnauthorizedException } from "@nestjs/common";
import AuthRepository from "../../repository/authRepository";
import LogoutUseCase from "./../logoutUseCase";
import RefreshToken from "../../../entities/refreshToken";

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;
  let authRepository: jest.Mocked<AuthRepository>;

  beforeEach(() => {
    authRepository = {
      generateTokenAndSave: jest.fn(),
      findByHash: jest.fn(),
      revokeById: jest.fn(),
      revokeAllByUserId: jest.fn(),
      verifyToken: jest.fn(),
      hash: jest.fn(),
    };

    useCase = new LogoutUseCase(authRepository);
  });

  it('should revoke a refresh token', async () => {
    const token = new RefreshToken({
      userId: 'user-id',
      expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24),
      revoked: false,
      tokenHash: 'token-hash',
    }, 'token-id');

    authRepository.verifyToken.mockResolvedValue(token);

    await useCase.execute('valid-token');

    expect(authRepository.verifyToken).toHaveBeenCalledWith('valid-token');
    expect(authRepository.revokeById).toHaveBeenCalledWith('token-id');
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    authRepository.verifyToken.mockResolvedValue(null);

    await expect(useCase.execute('invalid-token')).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if token is revoked', async () => {
    const token = new RefreshToken({
      userId: 'user-id',
      expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24),
      revoked: true,
      tokenHash: 'token-hash',
    }, 'token-id');

    authRepository.verifyToken.mockResolvedValue(token);

    await expect(useCase.execute('revoked-token')).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if token is expired', async () => {
    const token = new RefreshToken({
      userId: 'user-id',
      expiresIn: new Date(Date.now() - 1000),
      revoked: false,
      tokenHash: 'token-hash',
    }, 'token-id');

    authRepository.verifyToken.mockResolvedValue(token);

    await expect(useCase.execute('expired-token')).rejects.toThrow(UnauthorizedException);
  });
});
