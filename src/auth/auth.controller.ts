import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
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
import { Response } from 'express';
import { Request as ExpressRequest } from 'express';

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
  async login(
    @Body() body: LoginRequestBodyDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token, user } = await this.authService.login(
      body.email,
      body.password,
    );

    response.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, //Expira em 1 dia
    });

    return {
      user: user,
      access_token: access_token,
    };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
    });

    return { message: 'Logout realizado com sucesso.' };
  }
}
