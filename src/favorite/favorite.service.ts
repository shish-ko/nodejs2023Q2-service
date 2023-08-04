import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { DBservice } from 'src/dataBase/db.service';
import { validate } from 'uuid';

@Injectable()
export class FavoriteService {
  constructor(@Inject(DBservice) private db: DBservice) {}

  async getAll() {
    const artists = await this.db.favoriteArtist.findMany({
      include: { artist: true },
    });
    const albums = await this.db.favoriteAlbum.findMany({
      include: { album: true },
    });
    const tracks = await this.db.favoriteTrack.findMany({
      include: { track: true },
    });
    return {
      artists,
      albums,
      tracks,
    };
  }

  async addFavs(type: string, id: string) {
    let res;
    switch (type) {
      case 'artist':
        res = await this.db.favoriteArtist.create({
          data: { artistId: id },
          include: { artist: true },
        });
        break;
      case 'album':
        res = await this.db.favoriteAlbum.create({ data: { albumId: id } });
        break;
      case 'track':
        res = await this.db.favoriteTrack.create({ data: { trackId: id } });
        break;

      default:
        throw new HttpException('does not exist', 404);
    }
    return res;
  }

  removeFavs(type: string, id: string) {
    switch (type) {
      case 'artist':
        this.db.favoriteArtist.delete({ where: { artistId: id } });
        break;
      case 'album':
        this.db.favoriteAlbum.delete({ where: { albumId: id } });
        break;
      case 'track':
        this.db.favoriteTrack.delete({ where: { trackId: id } });
        break;

      default:
        throw new HttpException('does not exist', 404);
    }
  }
}
