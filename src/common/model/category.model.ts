import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";




@Schema({
    timestamps:true,
    toJSON:{
        virtuals:true,
        getters:true,
        transform(ret,doc){
            const category = ret as any
            delete category.password
            delete category.__v
            delete category.id
            return category

        }
    },
    toObject:{
        virtuals:true,
        getters:true
    },
    strict:true,
    strictQuery:true
})

export class category{

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
      required:true,
      
  })
   createdBy:Types.ObjectId
}



export const categoryScheam = SchemaFactory.createForClass(category)

export const categoryModel = MongooseModule.forFeature([{name:category.name,schema:categoryScheam}])