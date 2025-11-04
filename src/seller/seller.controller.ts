import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { SellerService } from './seller.service';
import { createSellerRequestBodyDto, CreateSellerRequestBodyDto } from './dtos';
import { SellerResponseDto } from './dtos/seller-response.dto';
import { toSnakeCase } from 'src/shared/utils';
import { ZodValidationPipe } from 'src/shared/pipes';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createSellerRequestBodyDto))
  async create(
    @Body() body: CreateSellerRequestBodyDto,
  ): Promise<SellerResponseDto> {
    const createdSeller = await this.sellerService.create({
      fullName: body.full_name,
      phone: body.phone,
      email: body.email,
      password: body.password,
      street: body.street,
      number: body.number,
      complement: body.complement,
      neighborhood: body.neighborhood,
      city: body.city,
      state: body.state,
      zipCode: body.zip_code,
    });

    return toSnakeCase({
      id: createdSeller.id || createdSeller._id.toString(),
      ...createdSeller,
      password: undefined,
    });
  }
}
