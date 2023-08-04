import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaErrorHandler extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception.code === 'P2025') {
      response.status(HttpStatus.NOT_FOUND).send();
    } else if (exception.code === 'P2003') {
      response.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
    } else {
      console.log(exception.code);
      throw new HttpException('DB Error', 500);
    }
  }
}
