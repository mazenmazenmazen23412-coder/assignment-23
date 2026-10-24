import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    throw new HttpException("busy",HttpStatus.BAD_REQUEST)
    return 'Hello World!';
  }
}

