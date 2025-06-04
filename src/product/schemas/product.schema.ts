import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ _id: false })
export class OpeningHours {
  @Prop({ required: true })
  start: number;

  @Prop({ required: true })
  end: number;
}

export const OpeningHoursSchema = SchemaFactory.createForClass(OpeningHours);

@Schema({ _id: false })
export class Seller {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, type: OpeningHoursSchema })
  openingHours: OpeningHours;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);

@Schema({ collection: 'products', timestamps: true })
export class Product {
  id?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: SellerSchema })
  seller: Seller;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  note: number;

  @Prop({ required: true })
  sumNote: number;

  @Prop({ required: true })
  amountNotes: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
