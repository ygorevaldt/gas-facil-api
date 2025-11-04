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
import { ClientService } from './client.service';
import { ZodValidationPipe } from 'src/shared/pipes';
import {
  CreateClientRequestBodyDto,
  createClientRequestBodyDto,
  ClientResponseDto,
} from './dtos';
import { ProductResponseDto } from 'src/product/dto';
import { UpdateClientRequestBodyDto } from './dtos/update-client-request-body.dto';

@Controller('user')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createClientRequestBodyDto))
  async create(
    @Body() body: CreateClientRequestBodyDto,
  ): Promise<ClientResponseDto> {
    const { id, sessionId, createdAt, updatedAt, bookmarks } =
      await this.clientService.create({
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
  ): Promise<ClientResponseDto> {
    const { id, sessionId, createdAt, updatedAt, bookmarks, isAdmin } =
      await this.clientService.findBySessionId(session_id);

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
    const response = await this.clientService.fetchBookmarks(userId);

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
    @Body() body: UpdateClientRequestBodyDto,
  ): Promise<ClientResponseDto> {
    const { id, sessionId, createdAt, updatedAt, bookmarks } =
      await this.clientService.updateBookmarks(body.user_id, body.bookmarks);

    return {
      id,
      session_id: sessionId,
      bookmarks,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }
}
