import { Injectable, UnauthorizedException } from "@nestjs/common";
import AuthRepository from "../repository/authRepository";

export type LoginDTO = {
  identifier: string;
  password: string;
}


@Injectable()
export default class LogoutUseCase {
  constructor(
    private authRepository: AuthRepository
  ) {}

  async execute(refreshToken: string): Promise<void> {
    const token = await this.authRepository.verifyToken(refreshToken);
    
    if (!token || token.revoked) throw new UnauthorizedException("Invalid refresh token");
    if (token.expiresIn < new Date()) throw new UnauthorizedException("Refresh token expired")
    
    await this.authRepository.revokeById(token.id!);
  }
}