import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { Auth } from '../common/decorator/auth.decorator.js';
import { type HUser, ROleEnum } from '../User/types/user.types.js';
import { type ProductDto, ProductSchema } from './product.validation.js';
import { User } from '../common/decorator/decorator.js';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productservice :ProductService
    ){}


@Post()
@Auth(ROleEnum.admin)
async create(@Body({schema:ProductSchema})body:ProductDto,@User() user:HUser){
const {data} = await this.productservice.create(body,user)
return{
data
} 
}
}
