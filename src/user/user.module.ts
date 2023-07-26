import { Module } from '@nestjs/common';
import { DBmodule } from 'src/dataBase/db.module';
import { UserController } from './user.controller';

@Module({
  imports: [DBmodule],
  controllers: [UserController],
})
export class UserModule {}
