import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
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

export const UserSchema = SchemaFactory.createForClass(User);
