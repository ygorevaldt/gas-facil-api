import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AddressDocument = HydratedDocument<Address>;

@Schema({ collection: 'addresses', timestamps: true })
export class Address {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  sessionId: string;

  @Prop({ required: false, default: '' })
  city: string;

  @Prop({ required: false, default: '' })
  district: string;

  @Prop({ required: false, default: '' })
  street: string;

  @Prop({ required: false, default: 0 })
  number: number;

  @Prop({ required: false, default: 0 })
  cep: number;

  @Prop({ required: false, default: '' })
  complement?: string;

  @Prop({ required: false, default: '' })
  reference?: string;

  @Prop({ required: false, default: 'Casa' })
  type: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
