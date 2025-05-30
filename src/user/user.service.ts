import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: User) {
    return await this.userModel.create(user);
  }

  async findBySessionId(sessionId: string) {
    const document = await this.userModel.findOne({ sessionId }).exec();
    if (!document) throw new NotFoundException();

    return document;
  }
}
