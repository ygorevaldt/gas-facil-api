import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Seller, SellerSchema } from './schemas';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seller.name, schema: SellerSchema }]),
    ProductModule,
  ],
  controllers: [SellerController],
  providers: [SellerService],
  exports: [SellerService],
})
export class SellerModule {}
