import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DBmodule } from 'src/dataBase/db.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DBmodule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
