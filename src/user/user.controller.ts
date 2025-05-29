import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { ZodValidationPipe } from 'src/shared/pipes';
import {
  CreateUserRequestBodyDto,
  createUserRequestBodyDto,
  UserResponseDto,
} from './dtos';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserRequestBodyDto))
  async create(
    @Body() body: CreateUserRequestBodyDto,
  ): Promise<UserResponseDto> {
    const { id, sessionId, createdAt, updatedAt } =
      await this.userService.create({
        sessionId: body.session_id,
      });

    return {
      id,
      session_id: sessionId,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }

  @Get('/:session_id')
  async findOne(
    @Param('session_id') session_id: string,
  ): Promise<UserResponseDto> {
    const { id, sessionId, createdAt, updatedAt } =
      await this.userService.findBySessionId(session_id);

    return {
      id,
      session_id: sessionId,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }
}
