import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DBmodule } from './dataBase/db.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [UserModule, DBmodule, TrackModule],
})
export class AppModule {}
