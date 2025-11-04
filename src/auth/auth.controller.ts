import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  loginRequestBodyDto,
  LoginRequestBodyDto,
} from './dtos/login-request-body.dto';
import { ZodValidationPipe } from 'src/shared/pipes';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('session'))
  @Post('validate')
  async validate(@Request() req) {
    return { message: 'Valid session!', user: req.user };
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(loginRequestBodyDto))
  async login(@Body() body: LoginRequestBodyDto) {
    return this.authService.login(body.email, body.password);
  }
}
