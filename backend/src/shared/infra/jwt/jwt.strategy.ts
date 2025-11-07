import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as fs from 'fs';
import * as path from 'path';
import { JwtPayload } from '@/core/auth/domain/entities/payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const pub = fs.readFileSync(path.resolve(process.cwd(), 'resources/keys/public.pem'));
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: pub,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any): Promise<JwtPayload> {
    return { sub: payload.sub, name: payload.name, email: payload.email };
  }
}
export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
