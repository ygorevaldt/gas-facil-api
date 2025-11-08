import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ZodValidationPipe } from 'src/shared/pipes';
import {
  CreateProductRequestBodyDto,
  createProductRequestBodyDto,
} from './dto/create-product-body.dto';
import { ProductResponseDto } from './dto';
import {
  UpdateProductRequestBodyDto,
  updateProductRequestBodyDto,
} from './dto/update-product-body.dto';
import { AuthGuard } from '@nestjs/passport';
import { toSnakeCase } from 'src/shared/utils';
import { Request } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ZodValidationPipe(createProductRequestBodyDto))
  async create(
    @Body() body: CreateProductRequestBodyDto,
    @Req() req: Request,
  ): Promise<ProductResponseDto> {
    const user = req.user as { id: string; email: string };
    const product = await this.productService.create({
      name: body.name,
      description: body.description,
      note: body.note,
      sumNote: body.sum_note,
      amountNotes: body.amount_notes,
      price: body.price,
      sellerId: user.id,
    });

    return toSnakeCase({
      id: product.id || product._id.toString(),
      ...product,
    });
  }

  @Get()
  async fetch(): Promise<ProductResponseDto[]> {
    const response = await this.productService.fetch();

    const products = response.map((item) => {
      return toSnakeCase({
        id: item.id,
        ...item,
      });
    });

    return products;
  }

  @Get('/seller')
  @UseGuards(AuthGuard('jwt'))
  async fetchBySeller(@Req() req: Request): Promise<ProductResponseDto[]> {
    const user = req.user as { id: string; email: string };
    const response = await this.productService.fetch(user.id);

    const products = response.map((item) => {
      return toSnakeCase({
        id: item.id,
        ...item,
      });
    });

    return products;
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ZodValidationPipe(updateProductRequestBodyDto))
  async update(
    @Body()
    { amount_notes, sum_note, ...rest }: UpdateProductRequestBodyDto,
  ): Promise<ProductResponseDto> {
    const response = await this.productService.update({
      ...rest,
      amountNotes: amount_notes,
      sumNote: sum_note,
    });

    return toSnakeCase({
      id: response.id || response._id.toString(),
      ...response,
    });
  }

  @Delete('/:product_id')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('product_id') productId: string,
    @Req() req: Request,
  ): Promise<void> {
    const user = req.user as { id: string; email: string };
    await this.productService.delete(productId, user.id);
  }
}
