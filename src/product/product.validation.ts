
import { isValidObjectId } from "mongoose";
import z from "zod";
import { objectIdSchema } from "../common/utils/validation.utils.js";


export const ProductSchema = z.strictObject({
    name:z.string().min(2).max(200).trim(),
    decsription:z.string().max(2000).trim().optional(),
    price:z.number().min(2),
    discount:z.number().min(0).max(100).optional(),
    stock:z.number().min(0),
    category:objectIdSchema,
    subcategory:objectIdSchema,
    brand:objectIdSchema
})

export type ProductDto = z.infer<typeof ProductSchema>