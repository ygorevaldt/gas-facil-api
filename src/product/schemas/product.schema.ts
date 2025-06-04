import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ collection: 'products', timestamps: true })
export class Product {
  id?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  seller: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  note: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
