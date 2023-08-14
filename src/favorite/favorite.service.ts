import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Album, Artist, Track } from '@prisma/client';
import { DBservice } from 'src/dataBase/db.service';

@Injectable()
export class FavoriteService {
  constructor(@Inject(DBservice) private db: DBservice) {}

  async getAll() {
    const artistsDB = await this.db.favoriteArtist.findMany({
      include: { artist: true },
    });
    const albumsDB = await this.db.favoriteAlbum.findMany({
      include: { album: true },
    });
    const tracksDB = await this.db.favoriteTrack.findMany({
      include: { track: true },
    });
    return {
      artists: artistsDB.map((item) => item.artist),
      albums: albumsDB.map((item) => item.album),
      tracks: tracksDB.map((item) => item.track),
    };
  }

  async addFavs(type: string, id: string) {
    let res: Artist | Album | Track;
    switch (type) {
      case 'artist':
        const { artist } = await this.db.favoriteArtist.create({
          data: { artistId: id },
          include: { artist: true },
        });
        res = artist;
        break;
      case 'album':
        const { album } = await this.db.favoriteAlbum.create({
          data: { albumId: id },
          include: { album: true },
        });
        res = album;
        break;
      case 'track':
        const { track } = await this.db.favoriteTrack.create({
          data: { trackId: id },
          include: { track: true },
        });
        res = track;
        break;

      default:
        throw new HttpException('does not exist', 404);
    }
    return res;
  }

  async removeFavs(type: string, id: string) {
    switch (type) {
      case 'artist':
        await this.db.favoriteArtist.delete({ where: { artistId: id } });
        break;
      case 'album':
        await this.db.favoriteAlbum.delete({ where: { albumId: id } });
        break;
      case 'track':
        await this.db.favoriteTrack.delete({ where: { trackId: id } });
        break;

      default:
        throw new HttpException('does not exist', 404);
    }
  }
}
