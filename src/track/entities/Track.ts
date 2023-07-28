import { Artist } from 'src/artist/entities/artist.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { v4 as uuid } from 'uuid';
export class Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // in
  private artist?: Artist;
  constructor(dto: CreateTrackDto) {
    this.id = uuid();
    this.name = dto.name;
    this.albumId = dto.albumId;
    this.duration = dto.duration;
    this.artistId = dto.artistId;
  }
}
