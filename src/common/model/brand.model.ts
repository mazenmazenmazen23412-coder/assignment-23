import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";




@Schema({
    timestamps:true,
    toJSON:{
        virtuals:true,
        getters:true,
        transform(ret,doc){
            const brand = ret as any
            delete brand.password
            delete brand.__v
            delete brand.id
            return brand

        }
    },
    toObject:{
        virtuals:true,
        getters:true
    },
    strict:true,
    strictQuery:true
})

export class brand{

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



export const brandScheam = SchemaFactory.createForClass(brand)

export const brandModel = MongooseModule.forFeature([{name:brand.name,schema:brandScheam}])