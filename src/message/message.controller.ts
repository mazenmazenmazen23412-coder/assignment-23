import { Controller, createParamDecorator, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { MessageService } from './message.service.js';


const testdecor = createParamDecorator((data,ctx)=>{
    //  console.log({data});
    const req =  ctx.switchToHttp().getRequest()
     const query = req.body
     return data ?query[data]:query
     
})

@Controller('message')
export class MessageController {
    constructor(private readonly messageservice:MessageService){}

@Get(":id")
test(@Param('id',ParseIntPipe) id:number){
    console.log({id});
    
return {
    data:{
        msg:"hello world back end"
    }
}
}

}
