import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envSchema } from './env';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { SellerModule } from './seller/seller.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    ClientModule,
    ProductModule,
    AddressModule,
    AuthModule,
    SellerModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
