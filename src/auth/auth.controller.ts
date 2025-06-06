import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('session'))
  @Post('validate')
  async validate(@Request() req) {
    return { message: 'Valid session!', user: req.user };
  }
}
