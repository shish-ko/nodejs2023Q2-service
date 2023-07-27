import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DBmodule } from 'src/dataBase/db.module';

@Module({
  imports: [DBmodule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
