import { Injectable, Inject } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DBservice } from 'src/dataBase/db.service';
import { getUniqueItem } from 'src/utils';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(@Inject(DBservice) private db: DBservice) {}

  addAlbum(dto: CreateAlbumDto) {
    const album = new Album(dto);
    if (dto.artistId) {
      getUniqueItem(dto.artistId, this.db.artists);
      this.db.artists
        .find((artist) => artist.id === dto.artistId)
        .addAlbum(album);
    }
    return this.db.albums.create(album);
  }
  getAllAlbums() {
    return this.db.albums.findMany();
  }
  getAlbum(id: string) {
    return getUniqueItem(id, this.db.albums);
  }
  updateAlbum(id: string, dto: UpdateAlbumDto) {
    getUniqueItem(id, this.db.albums);
    return this.db.albums.update(id, Object.entries(dto));
  }
  deleteAlbum(id: string) {
    getUniqueItem(id, this.db.albums);
    return this.db.albums.delete(id);
  }
}
