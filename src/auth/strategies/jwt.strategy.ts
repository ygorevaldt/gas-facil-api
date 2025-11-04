import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  sub: string;
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: () => {
        const secret = this.configService.get<string>('TOKEN_KEY');
        return secret;
      },
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUserFromJwt(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
