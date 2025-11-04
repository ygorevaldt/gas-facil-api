import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SellerDocument = HydratedDocument<Seller>;

@Schema({ collection: 'sellers', timestamps: true })
export class Seller {
  id?: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  number: string;

  @Prop({ required: false })
  complement?: string;

  @Prop({ required: true })
  neighborhood: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  zipCode: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);
