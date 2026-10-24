import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common"
import { AuthGuard } from "../guards/auth.guard.js"
import { AuthorizationGuard } from "../guards/authorization.guard.js"
import { ROleEnum } from "../../User/types/user.types.js"


export const Auth = (...roles:ROleEnum[])=>{
    return applyDecorators(
        SetMetadata("roles",roles),
        UseGuards(AuthGuard),
        UseGuards(AuthorizationGuard)
    )
}