import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private productService: ProductService,
  ) {}

  async create(user: User) {
    return await this.userModel.create(user);
  }

  async findBySessionId(sessionId: string) {
    const document = await this.userModel.findOne({ sessionId }).exec();
    if (!document) throw new NotFoundException();

    return document;
  }

  async fetchBookmarks(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User is not registered');

    const bookmarks = await this.productService.fetchByIds(user.bookmarks);
    return bookmarks;
  }

  async updateBookmarks(userId: string, bookmarks: string[]) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User is not registered');

    return await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { bookmarks } },
      { new: true },
    );
  }
}
