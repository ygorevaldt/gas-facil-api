import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AddressDocument = HydratedDocument<Address>;

@Schema({ collection: 'addresses', timestamps: true })
export class Address {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  sessionId: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: false, default: '' })
  district: string;

  @Prop({ required: false, default: '' })
  street: string;

  @Prop({ required: true })
  number: number;

  @Prop({ required: true })
  cep: number;

  @Prop({ required: false, default: '' })
  complement?: string;

  @Prop({ required: false, default: '' })
  reference?: string;

  @Prop()
  type: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
