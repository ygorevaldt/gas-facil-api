import { Injectable } from '@nestjs/common';
import { User } from './schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: User) {
    const user = new this.userModel(data);
    const createdUser = await user.save();

    return createdUser;
  }

  async findBySessionId(sessionId: string) {
    return await this.userModel.findOne({ sessionId }).exec();
  }
}
