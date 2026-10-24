import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { HUser, ROleEnum } from "../../User/types/user.types.js";
import { Reflector } from "@nestjs/core";



@Injectable()

export class AuthorizationGuard  implements CanActivate{

    constructor(
        private readonly reflector:Reflector
    ){

    }
   async canActivate(context: ExecutionContext): Promise<boolean>  {
        
        const user:HUser = context.switchToHttp().getRequest().user
        let roles =  this.reflector.getAllAndOverride<ROleEnum[]>(
            "role",
            [context.getHandler(),context.getClass()]
        )
       roles = roles.length == 0 ? Object.values(ROleEnum) :roles
 
        if(!roles.includes(user.role)){
            throw new UnauthorizedException()
        }




        return true
    }
}