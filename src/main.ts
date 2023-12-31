import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { parse } from 'yamljs';
import { PrismaErrorHandler } from './utils/PrismaErrorHandler';
import { AppLogger } from './logger/logger.service';

const SWAGGERDOC = resolve(__dirname, '../doc/api.yaml');
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new AppLogger() });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaErrorHandler(httpAdapter));
  const yamlConf = await readFile(SWAGGERDOC, 'utf-8');
  const config = parse(yamlConf);
  SwaggerModule.setup('doc', app, config, {});
  await app.listen(process.env.PORT || 4000);
  console.log(`app is running on PORT ${process.env.PORT || 4000}`);
}
bootstrap();
