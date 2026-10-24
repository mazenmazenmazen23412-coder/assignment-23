import z from "zod";


export const createCategorySchema = z.strictObject({

    name:z.string().min(2).max(200),
    image:z.string().optional()
}) 


export type createCategoryDTO = z.infer<typeof createCategorySchema>

export const updatecategorySchema = createCategorySchema.partial()
export type updatecategoryDTO = z.infer<typeof updatecategorySchema>