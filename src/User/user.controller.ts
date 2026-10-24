import { Body, Controller, Get, HttpCode, Patch, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { userservice } from "./user.service.js";

import  {  confirmedEmaiSchema,type confirmEmailDto, CreateUserSchema, type CreateUserDTO, type signUserDTO, signupSchema, loginSchema,type loginDto } from "./user.validation.js";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "../common/guards/auth.guard.js";
import type{ Request } from "express";
import { User } from "../common/decorator/decorator.js";
import { type HUser, ROleEnum } from "./types/user.types.js";
import { Auth } from "../common/decorator/auth.decorator.js";
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import type{ Express } from "express";
import { UploadFile } from "../common/utils/multer.js";

@Controller("users")
export class usercontroller{
    constructor(private readonly userservice:userservice,
                private readonly config:ConfigService
    ){
        
    }

    @Post("signup")
    async signup(@Body({
        schema:signupSchema
    })body:signUserDTO){
     const{data} = await this.userservice.signup(body)
     return {
        data
     }
    }





    @Get('/create-user')
   async CreateUser(@Body({
        schema:CreateUserSchema
    }) body:CreateUserDTO){
        
        
        return await this.userservice.createUser(body)
    }

    @Patch("confirm-email")
    @HttpCode(200)
    async confirmEmail(@Body({
        schema:confirmedEmaiSchema
    })body:confirmEmailDto){
         const{data} = await this.userservice.confirmedEmail(body)
         return{
            data
         }
    }
    @Post("login")
    async login(@Body({schema:loginSchema})body:loginDto){
      const {data} = await this.userservice.login(body)
      return {
        data
      }
    }


    @Get("me")
    @Auth(ROleEnum.user)
    getprofile(@User()user:HUser){
    return{
    data:{user}
}
    }





    @Post("upload-file")
    @UseInterceptors(FileInterceptor("image",UploadFile({dest:'user'})))
    // FileInterceptor =>single image
    // FilesInterceptor => many images
    //     @UseInterceptors(FileFieldsInterceptor([
    //     {name:"image"},
    //     {name:"coverImages"}
    // ]))

    async upload(@UploadedFiles() file:Express.Multer.File[]){
        return{
            data:{file}
        }
    }

}


