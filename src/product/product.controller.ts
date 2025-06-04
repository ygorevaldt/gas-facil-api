import { Body, Controller, Get, Post, Put, UsePipes } from '@nestjs/common';
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

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createProductRequestBodyDto))
  async create(
    @Body() body: CreateProductRequestBodyDto,
  ): Promise<ProductResponseDto> {
    const {
      id,
      name,
      note,
      sumNote,
      amountNotes,
      price,
      seller,
      createdAt,
      updatedAt,
    } = await this.productService.create({
      name: body.name,
      note: body.note,
      sumNote: body.sum_note,
      amountNotes: body.amount_notes,
      price: body.price,
      seller: {
        name: body.seller.name,
        phone: body.seller.phone,
        openingHours: {
          start: body.seller.opening_hours.start,
          end: body.seller.opening_hours.end,
        },
      },
    });

    return {
      id,
      name,
      note,
      sum_note: sumNote,
      amount_notes: amountNotes,
      price,
      seller: {
        name: seller.name,
        phone: seller.phone,
        opening_hours: seller.openingHours,
      },
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
        sum_note: item.sumNote,
        amount_notes: item.amountNotes,
        price: item.price,
        seller: {
          name: item.seller.name,
          phone: item.seller.phone,
          opening_hours: item.seller.openingHours,
        },
        created_at: item.createdAt,
        updated_at: item.updatedAt,
      };
    });
  }

  @Put()
  @UsePipes(new ZodValidationPipe(updateProductRequestBodyDto))
  async update(
    @Body()
    { amount_notes, sum_note, seller, ...rest }: UpdateProductRequestBodyDto,
  ) {
    return await this.productService.update({
      ...rest,
      amountNotes: amount_notes,
      sumNote: sum_note,
      seller: seller
        ? {
            name: seller?.name,
            phone: seller?.phone,
            openingHours: seller?.opening_hours
              ? {
                  start: seller?.opening_hours?.start,
                  end: seller?.opening_hours?.end,
                }
              : undefined,
          }
        : undefined,
    });
  }
}
