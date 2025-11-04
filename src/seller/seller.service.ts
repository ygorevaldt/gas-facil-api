import { Injectable, NotFoundException } from '@nestjs/common';
import { Seller } from './schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SellerService {
  constructor(@InjectModel(Seller.name) private sellerModel: Model<Seller>) {}

  async create(seller: Seller) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(seller.password, salt);

    const sellerToCreate = {
      ...seller,
      password: hashedPassword,
    };
    return (await this.sellerModel.create(sellerToCreate)).toJSON();
  }

  async findByEmail(email: string) {
    return this.sellerModel.findOne({ email }).lean().exec();
  }

  async findById(id: string) {
    return this.sellerModel.findById(id).lean().exec();
  }

  async update(seller: Seller) {
    const document = await this.sellerModel.findOneAndUpdate(
      { _id: seller.id },
      seller,
      { new: true, upsert: true },
    );

    return document.toJSON();
  }
}
