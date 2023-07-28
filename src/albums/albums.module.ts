import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DBmodule } from 'src/dataBase/db.module';

@Module({
  imports: [DBmodule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
