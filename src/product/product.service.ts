import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../common/model/product.model.js';
import { isValidObjectId, Model } from 'mongoose';
import { category } from '../common/model/category.model.js';
import { Subcategory } from '../common/model/sub-Category.model.js';
import { brand } from '../common/model/brand.model.js';
import { ProductDto } from './product.validation.js';
import { HUser } from '../User/types/user.types.js';
import { slugify } from '../common/utils/slugify.js';

@Injectable()
export class ProductService {

constructor(
    @InjectModel(Product.name) private readonly productmodel:Model<Product>,
    @InjectModel(category.name) private readonly categorymodel:Model<category>,
    @InjectModel(Subcategory.name) private readonly subcategorymodel:Model<Subcategory>,
    @InjectModel(brand.name) private readonly brandmodel:Model<brand>

){} 

async create(body:ProductDto,user:HUser){
   const iscategoryExist =await this.categorymodel.exists({_id:body.category})
   if (!iscategoryExist) {
    throw new NotFoundException("category not found")
   }
    const issubcategoryExist =await this.subcategorymodel.exists({_id:body.subcategory})
   if (!issubcategoryExist) {
    throw new NotFoundException("subcategory not found")
   }

    const isbrandExist =await this.brandmodel.exists({_id:body.brand})
   if (!isbrandExist) {
    throw new NotFoundException("brand not found")
   }
   const product = await this.productmodel.create({
    ...body,
    slug:slugify(body.name),
    createdBy:user._id
   })
  return {
    data:{
        product
    }
  }
}


    private async getproductorFail(id:string){
     if (!isValidObjectId(id)) {
        throw new BadRequestException("is-valid product id")
     }
     const product = await this.productmodel.findById(id)
     if (!product) {
        throw new NotFoundException('category not found')
     }
     return product
    }

}
