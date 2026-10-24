import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { StandardSchemaValidationPipe } from '@nestjs/common';
import { AppError } from './common/Exception/error.handle.js';
import { UniformResInterceptors } from './common/interceptors/interceptors.js';
import { Express } from "express";


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.useGlobalInterceptors(new UniformResInterceptors())
  app.useGlobalFilters(new AppError())
  app.useGlobalPipes(new StandardSchemaValidationPipe())

  const config = app.get(ConfigService)
  await app.listen(config.get<number>("PORT")||5000);
}
await bootstrap();
