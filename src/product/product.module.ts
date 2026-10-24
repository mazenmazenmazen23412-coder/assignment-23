import { Module } from '@nestjs/common';
import { ProductController } from './product.controller.js';
import { ProductService } from './product.service.js';
import { JwtModule } from '@nestjs/jwt';
import { userModule } from '../User/user.module.js';
import { categoryModel } from '../common/model/category.model.js';
import { SubcategoryModel } from '../common/model/sub-Category.model.js';
import { brandModel } from '../common/model/brand.model.js';
import { usermodel } from '../common/model/user.model.js';
import { ProductModel } from '../common/model/product.model.js';

@Module({
  imports:[
    JwtModule,
    usermodel,
    ProductModel,
    categoryModel,
    SubcategoryModel,
    brandModel
  ],

  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
