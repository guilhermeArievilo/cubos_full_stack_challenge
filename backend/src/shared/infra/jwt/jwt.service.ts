import { Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from "@/core/auth/domain/entities/payload";

@Injectable()
export class JwtServiceRS {
  private privateKey: Buffer;
  private publicKey: Buffer;
  private accessExpires = process.env.ACEESS_TOKEN_EXPIRES_IN || '15m';

  constructor() {
    const base = path.resolve(process.cwd(), 'resources/keys');
    this.privateKey = fs.readFileSync(path.join(base, 'private.pem'));
    this.publicKey = fs.readFileSync(path.join(base, 'public.pem'));
  }

  signAccess(
    payload: JwtPayload
  ) {
    return jwt.sign(payload, this.privateKey, {
      algorithm: 'RS256',
      expiresIn: this.accessExpires
    });
  }

  verifyAccess(token: string) {
    return jwt.verify(
      token,
      this.publicKey,
      {
        algorithms: ['RS256']
      }
    );
  }
}