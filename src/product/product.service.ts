import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(product: Product) {
    return await this.productModel.create(product);
  }

  async fetch() {
    return await this.productModel.find();
  }

  async fetchByIds(ids: string[]) {
    return await this.productModel.find({
      _id: { $in: ids },
    });
  }

  async update(product: Partial<Product>) {
    return await this.productModel.findOneAndUpdate(
      { _id: product.id },
      product,
      { new: true },
    );
  }
}
