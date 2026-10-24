import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavouriteService } from './favourite.service.js';
import { Auth } from '../common/decorator/auth.decorator.js';
import { User } from '../common/decorator/decorator.js';
import { Types } from 'mongoose';

@Controller('favourite')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @Post(":productId")
  @Auth()
  add(@Param("productId") productId: string,@User("_id") userId:Types.ObjectId) {
    return this.favouriteService.add(productId,userId);
  }

  @Get()
  @Auth()
  findAll(@User("_id")userId:Types.ObjectId) {
    return this.favouriteService.findAll(userId);
  }

  @Delete('productId')
  @Auth()
  remove(@Param('productId') productId:string , @User("_id") userId: Types.ObjectId) {
    return this.favouriteService.remove(productId,userId);
  }
}
