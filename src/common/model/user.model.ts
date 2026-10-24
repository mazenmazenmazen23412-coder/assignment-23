import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IUser, ROleEnum } from "../../User/types/user.types.js";
import { EncryptionService } from "../security/encryption.service.js";
import { HashService } from "../security/hash.service.js";
import { userservice } from "../../User/user.service.js";



@Schema({
    timestamps:true,
    toJSON:{
        virtuals:true,
        getters:true,
        transform(ret,doc){
            const user = ret as any
            delete user.password
            delete user.__v
            delete user.id
            return user

        }
    },
    toObject:{
        virtuals:true,
        getters:true
    },
    strict:true,
    strictQuery:true

})

export class User implements IUser{
 @Prop({
    type:String,
    required:true
 }) 
    name: string;

 @Prop({
        type:String,
    required:true

 })
    email: string;

@Prop({
        type:String,
    required:true,
    min:6,
    max:20

})
    password: string;

@Prop({
        type:Number,
    required:true

})
    age: number;


    @Prop({
        type:Number,
        required:true
    })
    phone:number
   @Prop({
    type: String,
     enum: ROleEnum,
      default: ROleEnum.user
   })
    role: ROleEnum;

    @Prop({
        type:Date,
        required:true
     })
     confirmedAt: Date
      
    

}



export const BuildSchema =(
    hashservice:HashService,
    encryptionservice:EncryptionService
)=>{
     UserSchema.path("phone").get((value:string)=>value ? encryptionservice.decrypt(value):value)
     UserSchema.path("phone").set((value:string)=>value ?encryptionservice.encrypt(value):value)

     UserSchema.pre("save",async function(){
        if (this.isNew || this.isModified("password")) {
           this.password = await hashservice.hash(this.password)            
        }
     })
     UserSchema.pre(["updateOne","updateMany","findOneAndUpdate"],async function(){
        const update = this.getUpdate() as Record<string, any>
        if (!update) {
            return
        }
        const target = update.$set ?? update
        if (target.password) {
            target.password = await hashservice.hash(target.password)
        }
     })
}





export const UserSchema = SchemaFactory.createForClass(User)
export const usermodel = MongooseModule.forFeature([{name:User.name,schema:UserSchema}])