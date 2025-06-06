import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateSession(sessionId: string): Promise<any> {
    const user = await this.userService.findBySessionId(sessionId);
    if (!user) {
      throw new UnauthorizedException('user is not registered');
    }

    if (!user.isAdmin) {
      throw new UnauthorizedException('user is not authorized');
    }

    return user;
  }
}
