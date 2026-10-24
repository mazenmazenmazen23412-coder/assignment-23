import { IsEmail, IsInt, IsString } from "class-validator"


export class CreateUserDTO{
    @IsString()
   name:string 

   @IsEmail()
   email:string

   @IsString()
   password:string

   @IsInt()
   age:number
}


