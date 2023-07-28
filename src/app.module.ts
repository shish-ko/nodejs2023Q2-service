import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DBmodule } from './dataBase/db.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [UserModule, DBmodule, TrackModule, ArtistModule, AlbumsModule],
})
export class AppModule {}
