import { Module } from "@nestjs/common";
import { usercontroller } from "./user.controller.js";
import { userservice } from "./user.service.js";
import { usermodel } from "../common/model/user.model.js";
import { SecurityModule } from "../common/security/security.module.js";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[usermodel,SecurityModule,JwtModule],
    controllers:[usercontroller],
    providers:[userservice]
})

export class userModule{}

    
