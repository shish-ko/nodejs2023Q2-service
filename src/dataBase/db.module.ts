import { Module, Global } from '@nestjs/common';
import { DBservice } from './db.service';

@Global()
@Module({
  providers: [DBservice],
  exports: [DBservice],
})
export class DBmodule {}
