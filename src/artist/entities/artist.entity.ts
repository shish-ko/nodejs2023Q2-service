import { v4 as uuid } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';

export class Artist {
  id: string;
  name: string;
  grammy: boolean;
  constructor(dto: CreateArtistDto) {
    this.id = uuid();
    this.grammy = dto.grammy;
    this.name = dto.name;
  }
}
