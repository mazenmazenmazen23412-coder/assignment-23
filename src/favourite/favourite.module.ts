import { Module } from '@nestjs/common';
import { FavouriteService } from './favourite.service.js';
import { FavouriteController } from './favourite.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { usermodel } from '../common/model/user.model.js';
import { ProductModel } from '../common/model/product.model.js';

@Module({
  imports:[JwtModule,usermodel, ProductModel],
  controllers: [FavouriteController],
  providers: [FavouriteService],
})
export class FavouriteModule {}
