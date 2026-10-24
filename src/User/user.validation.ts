import z, { email } from "zod";



export const CreateUserSchema = z.strictObject({
    name:z.string(),
    email:z.email(),
    password:z.string(),
    age:z.number()
    
})
export type CreateUserDTO = z.infer<typeof CreateUserSchema>



export const signupSchema = z.strictObject({
    name:z.string(),
    email:z.email(),
    password:z.string(),
    age:z.number(),
    phone:z.number()
    
})
export type signUserDTO = z.infer<typeof signupSchema>


export const confirmedEmaiSchema =z.strictObject({
    email:z.email(),
    otp:z.string().length(6)
})
export type confirmEmailDto = z.infer<typeof confirmedEmaiSchema>

export const loginSchema = z.strictObject({
    email:z.email(),
    password:z.string()
})
export type loginDto = z.infer<typeof loginSchema>