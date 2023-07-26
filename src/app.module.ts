import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DBmodule } from './dataBase/db.module';

@Module({
  imports: [UserModule, DBmodule],
})
export class AppModule {}
