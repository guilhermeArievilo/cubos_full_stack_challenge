import AuthRepository, { GeneratedTokenResponse } from "@/core/auth/domain/application/repository/authRepository";
import RefreshToken from "@/core/auth/domain/entities/refreshToken";
import { PrismaService } from "@/shared/infra/db/prisma/database.service";
import { Injectable } from "@nestjs/common";
import { createHash, randomBytes } from "crypto";
import dayjs from "dayjs";

@Injectable()
export default class AuthRepositoryImpl implements AuthRepository {
  constructor(private prismaService: PrismaService) {}

  async generateTokenAndSave(userId: string): Promise<GeneratedTokenResponse> {
    const token = randomBytes(64).toString("hex");
    const hash = this.hash(token);

    const daysValid = Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS) || 7 ;
    const expiresIn = dayjs().add(daysValid, "days").toDate();

    const createdRefreshToken = await this.prismaService.refreshToken.create({
      data: {
        tokenHash: hash,
        userId,
        expiresIn
      }
    });

    return {
      token,
      created: new RefreshToken(createdRefreshToken, createdRefreshToken.id)
    }
  }

  async findByHash(hash: string): Promise<RefreshToken | null> {
    const refreshToken = await this.prismaService.refreshToken.findUnique({
      where: { tokenHash: hash }
    });

    if (!refreshToken) return null;

    return new RefreshToken(refreshToken, refreshToken.id);
  }
  
  async revokeById(id: string): Promise<void> {
    await this.prismaService.refreshToken.update({
      where: { id },
      data: { revoked: true }
    });
  }

  async revokeAllByUserId(userId: string): Promise<void> {
    await this.prismaService.refreshToken.updateMany({
      where: { userId },
      data: { revoked: true }
    });
  }

  async verifyToken(refreshToken: string): Promise<RefreshToken | null> {
    if (!refreshToken) return null;
    const tokenHash = this.hash(refreshToken);
    return await this.findByHash(tokenHash);
  }

  hash(token: string): string {
    return createHash("sha256").update(token).digest("hex");
  }
}