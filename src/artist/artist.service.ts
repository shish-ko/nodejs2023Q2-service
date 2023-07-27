import { Injectable, Inject } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DBservice } from 'src/dataBase/db.service';
import { getUniqueItem } from 'src/utils';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(@Inject(DBservice) private db: DBservice) {}

  addArtist(dto: CreateArtistDto) {
    const artist = new Artist(dto);
    return this.db.artists.create(artist);
  }
  getAllArtists() {
    return this.db.artists.findMany();
  }
  getArtist(id: string) {
    return getUniqueItem(id, this.db.artists);
  }
  updateArtist(id: string, dto: UpdateArtistDto) {
    getUniqueItem(id, this.db.artists);
    return this.db.artists.update(id, Object.entries(dto));
  }
  deleteArtist(id: string) {
    getUniqueItem(id, this.db.artists);
    return this.db.artists.delete(id);
  }
}
