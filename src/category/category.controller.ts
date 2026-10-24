import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { Auth } from '../common/decorator/auth.decorator.js';
import {type HUser, ROleEnum } from '../User/types/user.types.js';
import {  type createCategoryDTO, createCategorySchema } from './category.validation.js';
import { User } from '../common/decorator/decorator.js';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryservice:CategoryService){

    }



    @Post()
    @Auth(ROleEnum.admin)
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body({schema:createCategorySchema})body:createCategoryDTO,
        @User()  user:HUser
    ){
        const {data} = await this.categoryservice.create(body,user)
        return{
            data
        }
    }
}
