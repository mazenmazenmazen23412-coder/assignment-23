import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Mongoose, Types } from "mongoose";
import { User } from "./user.model.js";
import { Product } from "./product.model.js";







@Schema({
        timestamps:true,
    toJSON:{
        virtuals:true,
        getters:true,
        transform(ret,doc){
            const favourite = ret as any
            delete favourite.password
            delete favourite.__v
            delete favourite.id
            return favourite

        }
    },
    toObject:{
        virtuals:true,
        getters:true
    },
    strict:true,
    strictQuery:true

})
export class favourite{

@Prop({
    type:Types.ObjectId,
    required:true,
    unique:true,
    ref:User.name
})
  user:Types.ObjectId


@Prop({

   type: [{type:Types.ObjectId, ref:Product.name}],
    default:[]
})
  product:Types.ObjectId[]


}
export const favouriteSchema = SchemaFactory.createForClass(favourite)
export const favouriteModel = MongooseModule.forFeature([{name:favourite.name,schema:favouriteSchema}])