import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionStrategy extends PassportStrategy(Strategy, 'session') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: any): Promise<any> {
    const sessionId = req.headers['session-id'];
    if (!sessionId) {
      throw new UnauthorizedException('session_id is required');
    }

    return this.authService.validateSession(sessionId);
  }
}
