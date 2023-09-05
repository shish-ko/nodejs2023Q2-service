import { Injectable, Inject } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DBservice } from 'src/dataBase/db.service';

@Injectable()
export class ArtistService {
  constructor(@Inject(DBservice) private db: DBservice) {}

  async addArtist(dto: CreateArtistDto) {
    return await this.db.artist.create({ data: dto });
  }
  async getAllArtists() {
    return await this.db.artist.findMany();
  }
  async getArtist(id: string) {
    return await this.db.artist.findUniqueOrThrow({ where: { id } });
  }
  async updateArtist(id: string, dto: UpdateArtistDto) {
    return await this.db.artist.update({ where: { id }, data: dto });
  }
  deleteArtist(id: string) {
    return this.db.artist.delete({ where: { id } });
  }
}
