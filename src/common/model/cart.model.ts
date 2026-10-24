import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Product } from "./product.model.js";
import { User } from "./user.model.js";



@Schema()

export class CartItem{

  @Prop({
    type:Types.ObjectId,
    required:true,
    ref:Product.name
  })
  product:Types.ObjectId


@Prop({
    type:Number,
    required:true,
    min:1,
    default:1
})
  quantity:number

}
export const cartItemSchema =SchemaFactory.createForClass(CartItem)








@Schema()
export class Cart{


@Prop({
    type:Types.ObjectId,
    required:true,
    unique:true,
    ref:User.name
})
    user:Types.ObjectId


@Prop({
    type:[cartItemSchema],
    default:[]
})
  item:CartItem[]

}


export const CartSchema = SchemaFactory.createForClass(Cart)
export const CartModel = MongooseModule.forFeature([{name:Cart.name,schema:CartSchema}])