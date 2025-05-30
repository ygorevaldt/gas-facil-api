import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Address } from './schemas';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {}

  async create(address: Address) {
    return await this.addressModel.create(address);
  }

  async findOne(sessionId: string) {
    const address = await this.addressModel.findOne({ sessionId });
    if (!address) throw new NotFoundException();

    return address;
  }

  async update(address: Partial<Address>) {
    const document = await this.addressModel.findOneAndUpdate(
      { sessionId: address.sessionId, userId: address.userId },
      address,
      { new: true },
    );

    if (!document) throw new NotFoundException();

    return document;
  }
}
