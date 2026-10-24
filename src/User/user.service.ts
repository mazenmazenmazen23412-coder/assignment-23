import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { confirmEmailDto, CreateUserDTO, loginDto, signUserDTO } from "./user.validation.js";
import { Model } from "mongoose";
import { User } from "../common/model/user.model.js";
import { inject } from "vitest";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { createOtp } from "../common/email/createotp.js";
import { signupKey } from "../common/redis/redis.service.js";
import type { Cache } from "cache-manager";
import { SendEamil } from "../common/email/sendemail.js";
import { HashService } from "../common/security/hash.service.js";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable()

export class userservice{
 constructor(
   @InjectModel(User.name) private readonly userModel:Model<User>,
   @Inject(CACHE_MANAGER) private cacheManger:Cache,
      private readonly hashservice: HashService,
      private readonly jwtservice:JwtService,
      private readonly configservice:ConfigService
 ){}


 async createUser(body:CreateUserDTO){
   return await this.userModel.find()
 }


async signup(body:signUserDTO){
const IsEmailexist = await this.userModel.findOne({
  email:body.email
})
if (IsEmailexist) {
  throw new BadRequestException("email already exist")
}
const user = await this.userModel.create(body)
const otp = createOtp()

await this.cacheManger.set(signupKey(user.id),otp,3000)
SendEamil({to:user.email,subject:"confirm your email",html:`
        <h1>${otp}<>
  `})
return {
  data:{
    user
  }
}
}


async confirmedEmail(body:confirmEmailDto){
    const user = await this.userModel.findOne({
      email:body.email,
      confirmedAt:{
        $exists:false
      }
    })
    if (!user) {
      throw new NotFoundException("user not found")
    }
    const otp = await this.cacheManger.get(signupKey(user.id))
    if (!otp || otp != body.otp) {
      throw new BadRequestException("invlid otp or expire")
    }
    user.confirmedAt = new Date(Date.now())
    await user.save()
    return{
      data:{}
    }

}


async login(body:loginDto){
    const user = await this.userModel.findOne({email:body.email,confirmedAt:{$exists:true}})
    if (!user) {
       throw new NotFoundException("user not found")     
    }
    if (!await this.hashservice.compare(body.password,user.password)) {
      throw new BadRequestException("invlid-credentials")
    }
    const accessToken = await this.jwtservice.signAsync({
      email:body.email,
      _id:user._id
    },{
      secret: this.configservice.get<string>("TOKEN_SECURITY"),
      expiresIn:"30M"
    })
    return {
      data:{
      accessToken
      }
    }
}
 
 }

