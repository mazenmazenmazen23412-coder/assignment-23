import { Module } from '@nestjs/common';
import { CartService } from './cart.service.js';
import { CartController } from './cart.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { usermodel } from '../common/model/user.model.js';
import { ProductModel } from '../common/model/product.model.js';
import { CartModel } from '../common/model/cart.model.js';

@Module({
  imports:[  
      JwtModule,
      usermodel,
      ProductModel,
      CartModel
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
