import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ collection: 'users', timestamps: true })
export class Client {
  id?: string;

  @Prop({ required: false, type: Boolean, default: false })
  isAdmin?: boolean;

  @Prop({ required: true })
  sessionId: string;

  @Prop({ required: true, default: [] })
  bookmarks?: string[];

  createdAt?: Date;
  updatedAt?: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
