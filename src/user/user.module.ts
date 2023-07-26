import { Module } from '@nestjs/common';
import { DBmodule } from 'src/dataBase/db.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DBmodule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
