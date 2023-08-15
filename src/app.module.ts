import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DBmodule } from './dataBase/db.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoriteModule } from './favorite/favorite.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './utils/AuthMiddleware';

@Module({
  imports: [
    UserModule,
    DBmodule,
    ArtistModule,
    TrackModule,
    AlbumsModule,
    FavoriteModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth/signup', 'auth/login', '/api', '/')
      .forRoutes('*');
  }
}
