import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ProductService } from './product.service';
import { ZodValidationPipe } from 'src/shared/pipes';
import {
  CreateProductRequestBodyDto,
  createProductRequestBodyDto,
} from './dto/create-product-body.dto';
import { ProductResponseDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createProductRequestBodyDto))
  async create(
    @Body() body: CreateProductRequestBodyDto,
  ): Promise<ProductResponseDto> {
    const { id, name, note, price, seller, createdAt, updatedAt } =
      await this.productService.create({
        name: body.name,
        note: body.note,
        price: body.price,
        seller: body.seller,
      });

    return {
      id,
      name,
      note,
      price,
      seller,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }

  @Get()
  async fetch(): Promise<ProductResponseDto[]> {
    const response = await this.productService.fetch();
    return response.map((item) => {
      return {
        id: item.id,
        name: item.name,
        note: item.note,
        price: item.price,
        seller: item.seller,
        created_at: item.createdAt,
        updated_at: item.updatedAt,
      };
    });
  }
}
