import { createParamDecorator } from "@nestjs/common"
import type{  Request } from "express"
import { HUser } from "../../User/types/user.types.js"



export const User = createParamDecorator((data:keyof HUser,ctx)=>{
  const req:Request = ctx.switchToHttp().getRequest()
  const user = req.user
  return data ?user[data]:user
})