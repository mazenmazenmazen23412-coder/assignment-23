import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodError, ZodType } from "zod";



export class Mypipe implements PipeTransform{
    constructor(private readonly Schema:ZodType){}
    transform(value: any, metadata: ArgumentMetadata) {
        try {
            this.Schema.parse(value)
        } catch (error) {
            if (error instanceof ZodError) {
                throw new BadRequestException({
                    message:'validation error',
                    errors:error.issues
                })
            }
        }
    }
}