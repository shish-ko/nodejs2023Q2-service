import { Module, Global } from '@nestjs/common';
import { DBservice } from './db.service';

@Module({
  providers: [DBservice],
  exports: [DBservice],
})
export class DBmodule {}
