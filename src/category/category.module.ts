import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller.js';
import { CategoryService } from './category.service.js';
import { SubcategoryModel } from '../common/model/sub-Category.model.js';
import { userModule } from '../User/user.module.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[CategoryModule,SubcategoryModel,userModule,JwtModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
