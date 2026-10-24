import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { threadId } from "worker_threads";
import { HUser, Jwtpayload } from "../../User/types/user.types.js";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../model/user.model.js";
import type{ Request } from "express";

 declare module "express-serve-static-core" {
   interface Request {
     user: HUser;
   }
 }


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private readonly jwtservice:JwtService,
        private readonly configservice:ConfigService,
        @InjectModel(User.name) private readonly userModel:Model<User>
    
    ){

    }
   async canActivate(context: ExecutionContext):  Promise<boolean> {
     const  req = context.switchToHttp().getRequest()
     const authorization = req.headers.authorization
     if (!authorization || !authorization.startsWith("Bearer")) {
       throw new UnauthorizedException()        
     }
     const token = authorization.split(" ")[1]
    if (!token) {
        throw new UnauthorizedException()
    }
    const payload = await this.jwtservice.verifyAsync<Jwtpayload>(token,{
        secret:this.configservice.get<string>("TOKEN_SECURITY")
    })
    
const user = await this.userModel.findById(payload._id)
if (!user) {
    throw new UnauthorizedException()
}
if (!user.confirmedAt) {
    throw new UnauthorizedException()
}
req.user = user

    return true
    }
}