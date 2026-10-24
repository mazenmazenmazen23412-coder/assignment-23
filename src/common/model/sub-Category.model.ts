import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "./user.model.js";
import { category } from "./category.model.js";




@Schema({
    timestamps:true,
    toJSON:{
        virtuals:true,
        getters:true,
        transform(ret,doc){
            const Subcategory = ret as any
            delete Subcategory.password
            delete Subcategory.__v
            delete Subcategory.id
            return Subcategory

        }
    },
    toObject:{
        virtuals:true,
        getters:true
    },
    strict:true,
    strictQuery:true
})

export class Subcategory{

 @Prop({
    type:String,
    required:true,
    unique:true,
    trim:true,
    minLength:2,
    maxLength:200
 })
  name:string


  @Prop({
      type:String,
      required:true,
      unique:true
  })

   slug:string

  
  @Prop({
      type:String
  })
   image:string

 @Prop({
      type:Types.ObjectId,
      ref:category.name,
      required:true,
      
  })

category:Types.ObjectId


  @Prop({
      type:Types.ObjectId,
      ref:User.name,
      required:true,
      
  })
   createdBy:Types.ObjectId
}



export const subcategoryScheam = SchemaFactory.createForClass(Subcategory)

subcategoryScheam.index({name:1,category:1},{unique:true})
subcategoryScheam.index({slug:1,category:1},{unique:true})


export const SubcategoryModel = MongooseModule.forFeature([{name:Subcategory.name,schema:subcategoryScheam}])