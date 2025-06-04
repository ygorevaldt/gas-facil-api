import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { AddressService } from './address.service';
import {
  AddressResponseDto,
  createAddressRequestBodyDto,
  CreateAddressRequestBodyDto,
} from './dtos';
import { ZodValidationPipe } from 'src/shared/pipes';
import {
  UpdateAddressRequestBodyDto,
  updateAddressRequestBodyDto,
} from './dtos/update-address-request-body.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAddressRequestBodyDto))
  async create(
    @Body() body: CreateAddressRequestBodyDto,
  ): Promise<AddressResponseDto> {
    const result = await this.addressService.create({
      cep: body.cep,
      city: body.city,
      district: body.district,
      latitude: body.latitude,
      longitude: body.longitude,
      number: body.number,
      sessionId: body.session_id,
      userId: body.user_id,
      street: body.street,
      complement: body.complement,
      reference: body.reference,
      type: body.type,
    });

    return {
      id: result.id,
      cep: result.cep,
      city: result.city,
      district: result.district,
      latitude: result.latitude,
      longitude: result.longitude,
      number: result.number,
      street: result.street,
      complement: result.complement,
      created_at: result.createdAt,
      updated_at: result.updatedAt,
    };
  }

  @Get('/:session_id')
  async findOne(
    @Param('session_id') session_id: string,
  ): Promise<AddressResponseDto> {
    const result = await this.addressService.findOne(session_id);
    return {
      id: result.id,
      cep: result.cep,
      city: result.city,
      district: result.district,
      latitude: result.latitude,
      longitude: result.longitude,
      number: result.number,
      street: result.street,
      complement: result.complement,
      reference: result.reference,
      created_at: result.createdAt,
      updated_at: result.updatedAt,
    };
  }

  @Put()
  @UsePipes(new ZodValidationPipe(updateAddressRequestBodyDto))
  async update(
    @Body() { session_id, user_id, ...rest }: UpdateAddressRequestBodyDto,
  ): Promise<AddressResponseDto> {
    const result = await this.addressService.update({
      ...rest,
      sessionId: session_id,
      userId: user_id,
    });

    return {
      id: result.id,
      cep: result.cep,
      city: result.city,
      district: result.district,
      latitude: result.latitude,
      longitude: result.longitude,
      number: result.number,
      street: result.street,
      complement: result.complement,
      reference: result.reference,
      created_at: result.createdAt,
      updated_at: result.updatedAt,
    };
  }
}
