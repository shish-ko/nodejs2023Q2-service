import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { parse } from 'yamljs';

const SWAGGERDOC = resolve(__dirname, '../doc/api.yaml');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const yamlConf = await readFile(SWAGGERDOC, 'utf-8');
  const config = parse(yamlConf);
  // const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, config, {});
  await app.listen(4000);
}
bootstrap();
