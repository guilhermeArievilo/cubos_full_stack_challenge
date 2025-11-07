import RefreshToken from "../../entities/refreshToken";

export type GeneratedTokenResponse = {
  token: string;
  created: RefreshToken
}



export default abstract class AuthRepository {
  abstract generateTokenAndSave(userId: string): Promise<GeneratedTokenResponse>;
  abstract findByHash(hash: string): Promise<RefreshToken | null>;
  abstract revokeById(id: string): Promise<void>
  abstract revokeAllByUserId(userId: string): Promise<void>
  abstract verifyToken(refreshToken: string): Promise<RefreshToken | null>
  abstract hash(token: string): string;
}