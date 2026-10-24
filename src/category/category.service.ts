import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { category } from '../common/model/category.model.js';
import { isValidObjectId, Model } from 'mongoose';
import { createCategoryDTO, updatecategoryDTO } from './category.validation.js';
import { HUser } from '../User/types/user.types.js';
import { slugify } from '../common/utils/slugify.js';
import { Subcategory } from '../common/model/sub-Category.model.js';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(category.name) private readonly categoryModel:Model<category>,
        @InjectModel(Subcategory.name) private readonly subcategory:Model<Subcategory>
    ){}


    async create(body:createCategoryDTO,user:HUser){
    const isnameExist = await this.categoryModel.findOne({name:body.name})
    if (isnameExist) {
        throw new ConflictException('category already exist')
    }
    const category = await this.categoryModel.create({
        ...body,
        slug:slugify(body.name),
        createdBy:user._id
    })
    return{
        data:{
            category
        }
    }
    }


    async findAll(){
        const categories = (await this.categoryModel.find().sort({createdBy:-1}))
        return{
            data:{
                categories
            }
        }
    }
    async findOne(id:string){
        const category = await this.getGategoryorFail(id)
        return{
            data:{
                category
            }
        }
    }
   async update(id:string,body:updatecategoryDTO){
    const category = await this.getGategoryorFail(id)
    if (body.name && body.name != category.name) {
        throw new ConflictException('category not found')
    }
    category.name = body.name
    category.slug = slugify(body.name)


    if (body.image !== undefined) {
        category.image = body.image       
    }
    await category.save()
    return {
        data:{
            category
        }
    }
   }
    








    private async getGategoryorFail(id:string){
     if (!isValidObjectId(id)) {
        throw new BadRequestException("is-valid category id")
     }
     const gategory = await this.categoryModel.findById(id)
     if (!gategory) {
        throw new NotFoundException('category not found')
     }
     return gategory
    }
}
