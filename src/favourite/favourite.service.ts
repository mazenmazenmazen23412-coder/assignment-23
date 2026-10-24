import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { favourite } from '../common/model/favourite.model.js';
import { Product } from '../common/model/product.model.js';
Injectable
@Injectable()
export class FavouriteService {
   constructor(
    @InjectModel(favourite.name) private readonly FavouriteModel:Model<favourite>,
    @InjectModel(Product.name) private readonly ProductModel:Model<Product>
   ){}

   async add(productId:string,userId:Types.ObjectId) {
      const isProductExist = await this.FavouriteModel.exists({
        _id:productId
      })
      if (!isProductExist) {
        throw new NotFoundException("product not found")
      }
      await this.FavouriteModel.updateOne({
        user:userId
      },{
        $addToSet:{
          products:productId
        }
      },{
        upsert:true
      })

    return {
      data:{}
    };
  }

 async findAll(userId:Types.ObjectId) {
      const favourite  = await this.FavouriteModel.findOne({user:userId})
      .populate([
        {
          path:"products",
          select:"name slug image price discount finalPrice stock"
        }
      ])

    return {
      data:{
        favourite
      }
    }
  }

async  remove(productId:string,userId:Types.ObjectId) {
      const {modifiedCount} =await this.FavouriteModel.updateOne(
        {
          user:userId
        },
        {
          $pull:{
            products: new Types.ObjectId(productId)
          }
        }
      ) 
      if (!modifiedCount) {
        throw new NotFoundException("product not found in favourite")
      }

    return {
      data:{}
    }

  }
}
