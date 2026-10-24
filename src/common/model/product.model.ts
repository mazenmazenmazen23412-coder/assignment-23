import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { category } from "./category.model.js";
import { Subcategory } from "./sub-Category.model.js";
import { brand } from "./brand.model.js";
import { User } from "./user.model.js";
import { slugify } from "../utils/slugify.js";




@Schema()
export class Product  {
    @Prop({
      type:String,
      required:true,
      trim:true,
      minLength:2,
      maxlength:200
    })
     name:string

     @Prop({
     type:String,
      required:true,

     })

     slug:string

@Prop({
     type:String,
      required:true,
      maxLength:200

})
description:string


@Prop({
    type:[
        String
    ]
})
images:string[]


@Prop({
         type:Number,
      required:true,
      min:0
})

price:number

@Prop({
    type:Number,
    default:0,
    min:0,
    max:100
})

discount:number

@Prop({
    type:Number,
    min:0
})

finalPrice:number

@Prop({
    type:Number,
    required:true,
    min:0
})
stock:number
@Prop({
  type:Number,
  min:0,
  default:0
})
soldcount:number

@Prop({
    type:Types.ObjectId,
    required:true,
    ref:category.name
})

 category: Types.ObjectId
@Prop({
        type:Types.ObjectId,
    required:true,
    ref:Subcategory.name

})

subcategory: Types.ObjectId
@Prop({
     type:Types.ObjectId,
    required:true,
    ref:brand.name

})

brand: Types.ObjectId
@Prop({
        type:Types.ObjectId,
    required:true,
    ref:User.name

})

createdBy:Types.ObjectId

}
export const ProductSchema = SchemaFactory.createForClass(Product)

ProductSchema.index({name:"text",description:"text"})

// ProductSchema.pre("save",function(){
//     if (this.isNew || this.isModified("name")) {
//         this.slug = slugify(this.name)
//     }
// })

ProductSchema.pre("save",function(){
    if (this.isNew || this.isModified("price")||this.isModified("discount")) {
        this.finalPrice = Math.round(this.price -(this.price *(this.discount ?? 0)/100))
    }
})


export const ProductModel = MongooseModule.forFeature([{name:Product.name,schema:ProductSchema}])

