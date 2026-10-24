
import { HydratedDocument, Types } from "mongoose"


export enum ROleEnum{
    user,
 admin
}


export interface IUser{
    name:string,
    email:string,
    age:number,
    password:string,
    role:ROleEnum
}
export type HUser = HydratedDocument<IUser>



export interface Jwtpayload{
     _id: Types.ObjectId;
    iat: number;
    exp: number;
    jti: string;
}