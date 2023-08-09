import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { env } from 'process';

@Injectable()
export class DBservice extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: env.DATABASE_URL,
        },
      },
    });
  }
}
