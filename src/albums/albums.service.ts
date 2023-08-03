import { Injectable, Inject } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DBservice } from 'src/dataBase/db.service';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(@Inject(DBservice) private db: DBservice) {}

  addAlbum(dto: CreateAlbumDto) {
    return this.db.album.create({ data: dto });
  }
  getAllAlbums() {
    return this.db.album.findMany();
  }
  getAlbum(id: string) {
    return this.db.album.findUniqueOrThrow({ where: { id } });
  }
  updateAlbum(id: string, dto: UpdateAlbumDto) {
    return this.db.album.update({ where: { id }, data: dto });
  }
  deleteAlbum(id: string) {
    return this.db.album.delete({ where: { id } });
  }
}
