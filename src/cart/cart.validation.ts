import z from "zod";
import { objectIdSchema } from "../common/utils/validation.utils.js";



export const addTocartSchema = z.strictObject({
    product:objectIdSchema,
    quantity:z.number().int().min(1).max(100).default(1)
})


export type addTocartDto = z.infer<typeof addTocartSchema>