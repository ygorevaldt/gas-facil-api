import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientModule } from 'src/client/client.module';
import { SessionStrategy } from './strategies/session.strategy';

@Module({
  imports: [ClientModule],
  controllers: [AuthController],
  providers: [AuthService, SessionStrategy],
  exports: [AuthService, SessionStrategy],
})
export class AuthModule {}
