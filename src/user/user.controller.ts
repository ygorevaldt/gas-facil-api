import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ZodValidationPipe } from 'src/shared/pipes';
import {
  CreateUserRequestBodyDto,
  createUserRequestBodyDto,
  UserResponseDto,
} from './dtos';
import { ProductResponseDto } from 'src/product/dto';
import { UpdateUserRequestBodyDto } from './dtos/update-user-request-body.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserRequestBodyDto))
  async create(
    @Body() body: CreateUserRequestBodyDto,
  ): Promise<UserResponseDto> {
    const { id, sessionId, createdAt, updatedAt, bookmarks } =
      await this.userService.create({
        sessionId: body.session_id,
      });

    return {
      id,
      session_id: sessionId,
      bookmarks,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }

  @Get('/:session_id')
  async findOne(
    @Param('session_id') session_id: string,
  ): Promise<UserResponseDto> {
    const { id, sessionId, createdAt, updatedAt, bookmarks, isAdmin } =
      await this.userService.findBySessionId(session_id);

    return {
      id,
      session_id: sessionId,
      isAdmin,
      bookmarks,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }

  @Get('/bookmarks/:user_id')
  async fetchBookmarks(
    @Param('user_id') userId: string,
  ): Promise<ProductResponseDto[]> {
    const response = await this.userService.fetchBookmarks(userId);

    return response.map((product) => {
      return {
        id: product.id,
        name: product.name,
        note: product.note,
        amount_notes: product.amountNotes,
        sum_note: product.sumNote,
        price: product.price,
        created_at: product.createdAt,
        updated_at: product.updatedAt,
        seller: {
          name: product.seller.name,
          phone: product.seller.phone,
          opening_hours: product.seller.openingHours,
        },
      };
    });
  }

  @Patch('/bookmarks')
  async updateBookmarks(
    @Body() body: UpdateUserRequestBodyDto,
  ): Promise<UserResponseDto> {
    const { id, sessionId, createdAt, updatedAt, bookmarks } =
      await this.userService.updateBookmarks(body.user_id, body.bookmarks);

    return {
      id,
      session_id: sessionId,
      bookmarks,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }
}
