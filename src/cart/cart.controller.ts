import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service.js';
import {type addTocartDto, addTocartSchema } from './cart.validation.js';
import { Auth } from '../common/decorator/auth.decorator.js';
import { User } from '../common/decorator/decorator.js';
import { Types } from 'mongoose';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @Auth()
  create(@Body({
    schema:addTocartSchema
  }) addTocartDto:addTocartDto,@User("_id") userId:Types.ObjectId ) {
    return this.cartService.addCart(addTocartDto,userId);
  }

  @Get()
  @Auth()
  getcart(@User("_id") userId:Types.ObjectId) {
   return this.cartService.BuildCart(userId)
}
}