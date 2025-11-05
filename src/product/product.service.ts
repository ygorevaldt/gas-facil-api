import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(product: Product) {
    const created = await this.productModel.create(product);
    return created.toJSON();
  }

  async fetch() {
    const products = await this.productModel
      .aggregate([
        {
          $addFields: {
            sellerIdObj: { $toObjectId: '$sellerId' },
          },
        },
        {
          $lookup: {
            from: 'sellers',
            localField: 'sellerIdObj',
            foreignField: '_id',
            as: 'seller',
          },
        },
        { $unwind: '$seller' },
      ])
      .exec();

    return products.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      note: item.note,
      sum_note: item.sumNote,
      amount_notes: item.amountNotes,
      price: item.price,
      seller: {
        name: item.seller.fullName,
        phone: item.seller.phone,
        opening_hours: item.seller.openingHours,
      },
      created_at: item.createdAt,
      updated_at: item.updatedAt,
    }));
  }

  async fetchByIds(ids: string[]) {
    const products = await this.productModel
      .aggregate([
        {
          $match: {
            _id: { $in: ids.map((id) => new mongoose.Types.ObjectId(id)) },
          },
        },
        {
          $addFields: {
            sellerIdObj: { $toObjectId: '$sellerId' },
          },
        },
        {
          $lookup: {
            from: 'sellers',
            localField: 'sellerIdObj',
            foreignField: '_id',
            as: 'seller',
          },
        },
        { $unwind: '$seller' },
      ])
      .exec();

    console.log(products);

    return products.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      note: item.note,
      sumNote: item.sumNote,
      amountNotes: item.amountNotes,
      price: item.price,
      seller: {
        name: item.seller.fullName,
        phone: item.seller.phone,
        openingHours: item.seller.openingHours,
      },
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  }

  async update(product: Partial<Product>) {
    return await this.productModel
      .findOneAndUpdate({ _id: product.id }, product, { new: true })
      .lean()
      .exec();
  }
}
