import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { SessionStrategy } from './strategies/session.strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, SessionStrategy],
  exports: [AuthService, SessionStrategy],
})
export class AuthModule {}
