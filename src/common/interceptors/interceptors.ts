import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable, timestamp } from "rxjs";




export class UniformResInterceptors implements NestInterceptor{
        intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>  {
            

            return next
            .handle()
            .pipe(
                map((res)=>{
                    const {data,message,status} = res
                    return{
                        message,
                        data,
                        status,
                        timestamp:new Date(Date.now())
                    }
                })
            )
            
        }
}