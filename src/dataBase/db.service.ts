import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { env } from 'process';

@Injectable()
export class DBservice extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: `postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@db:5432/mydb?schema=public`,
        },
      },
    });
  }
}
