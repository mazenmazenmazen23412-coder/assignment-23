import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";


@Catch(HttpException)
export class AppError implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const http = host.switchToHttp()
        const req = http.getRequest()
        const res = http.getResponse()
        const status = exception.getStatus()
       Logger.error(exception.stack )
       res.
       status(status).json({
        msg:exception.message,
        status:status,
        timeStamp: new Date(Date.now())                                         
       })


         
    }
}
