import { Injectable, UnauthorizedException } from "@nestjs/common";
import AuthRepository from "../repository/authRepository";
import { JwtServiceRS } from "@/shared/infra/jwt/jwt.service";
import { TokensResponse } from "../../entities/tokensResponse";
import { JwtPayload } from "../../entities/payload";
import UserRepository from "@/core/user/domain/application/repository/userRepository";


@Injectable()
export default class RefreshUseCase {
  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
    private jwtService: JwtServiceRS
  ) {}

  async execute(refreshToken: string): Promise<TokensResponse> {
    const token = await this.authRepository.verifyToken(refreshToken);
    
    if (!token || token.revoked) throw new UnauthorizedException("Invalid refresh token");
    if (token.expiresIn < new Date()) throw new UnauthorizedException("Refresh token expired")
    
    await this.authRepository.revokeById(token.id!);
    
    const user = await this.userRepository.findById(token.userId);
    if (!user) throw new UnauthorizedException("Invalid refresh token");

    const payload: JwtPayload = {
      sub: user.id!,
      name: user.name,
      email: user.email
    }

    const accessToken = this.jwtService.signAccess(payload);
    const { token: newRefreshToken } = await this.authRepository.generateTokenAndSave(user.id!);
    
    return {
      accessToken,
      refreshToken: newRefreshToken
    }
  }
}