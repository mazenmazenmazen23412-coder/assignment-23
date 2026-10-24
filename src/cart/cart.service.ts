import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { addTocartDto } from './cart.validation.js';
import { HydratedDocument, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from '../common/model/cart.model.js';
import { Product } from '../common/model/product.model.js';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class CartService {
constructor(
  @InjectModel(Cart.name) private readonly CartModel:Model<Cart>,
  @InjectModel(Product.name) private readonly ProductModel:Model<Product>
){}



 async addCart({product:productId,quantity:additionalQuantity}:addTocartDto,userId:Types.ObjectId) {
      const product = await this.getproductorFail(productId)
      const cart = await this.CartModel.findOne({user:userId})
      const currentQuantity = cart?.item.find((item)=>{
        return item.product.toString() == product.id
      })
      const quantity =   (currentQuantity?.quantity ?? 0) + additionalQuantity;

      this.CheckStock(product,quantity)
      if (currentQuantity) {
        await this.CartModel.updateOne({
          user:userId,
          "item.product":product.id
        },{
          $set:{"item.$.quantity":quantity}
        })
      }else{
        await this.CartModel.updateOne({
          user:userId
        },{
            $push:{item:{product:product._id,quantity}}
        },{
            upsert:true
        })
      }

    return {
      data:{}
    }
  }



  async BuildCart(userId:Types.ObjectId){
    const cart = await this.CartModel.findOne({user:userId}).populate([
      {
        path:"item.product",
        select:"name slug image price finalprice discount stock"
      }
    ])
    const item = (cart?.item || []).filter(item => {
      return item.product
    })
    .map(item =>{
      const product = item.product as unknown as Product
      return{
        product,
        quantity:item.quantity,
        total:Math.round(product.finalPrice * item.quantity ),
        instock:product.stock>=item.quantity

      }
    })
if (cart &&item.length !=cart.item.length) {
  await this.CartModel.updateOne({user:userId},{
    $set:{
      item:item.map(item=>({
        product:(item.product as HydratedDocument<Product>)._id,
        quantity:item.quantity

      }))
    }
  })
}return{
  data:{
    item,
    itemCount:item.length,
    subtotal:Math.round(item.reduce((sum,item)=>sum + item.total,0))
  }
}

  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }


  
      private async getproductorFail(id:string){
       if (!isValidObjectId(id)) {
          throw new BadRequestException("is-valid product id")
       }
       const product = await this.ProductModel.findById(id)
       if (!product) {
          throw new NotFoundException('product not found')
       }
       return product
      }

      private CheckStock(product:Product,quantity:number){
        if (product.stock < quantity) {
          throw new BadRequestException(`only ${product.stock} left in stock`)
        }
      }
}
