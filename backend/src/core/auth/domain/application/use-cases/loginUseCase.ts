import { Injectable } from "@nestjs/common";
import AuthRepository from "../repository/authRepository";
import * as bcrypt from "bcrypt";
import { JwtPayload } from "../../entities/payload";
import { JwtServiceRS } from "@/shared/infra/jwt/jwt.service";
import { TokensResponse } from "../../entities/tokensResponse";
import InvalidCredentialsError from "@/shared/exceptions/invalidCredentialsError";
import UserRepository from "@/core/user/domain/application/repository/userRepository";

export type LoginDTO = {
  identifier: string;
  password: string;
}


@Injectable()
export default class LoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
    private jwtService: JwtServiceRS
  ) {}

  async execute({ identifier, password }: LoginDTO): Promise<TokensResponse> {
    const user = await this.userRepository.findByEmail(identifier);
    if (!user) throw new InvalidCredentialsError();

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new InvalidCredentialsError();

    const payload: JwtPayload = {
      sub: user.id!,
      name: user.name,
      email: user.email
    }

    const accessToken = this.jwtService.signAccess(payload);
    const { token: refreshToken } = await this.authRepository.generateTokenAndSave(user.id!);

    return {
      accessToken,
      refreshToken
    }
  }
}