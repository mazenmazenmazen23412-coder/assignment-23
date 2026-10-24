
import { customAlphabet } from "nanoid";
export const createOtp = ()=>{

    return   customAlphabet("123456",6)(6)
}