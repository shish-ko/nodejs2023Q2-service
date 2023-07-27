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
  constructor(dto: CreateTrackDto, artist?: Artist) {
    this.id = uuid();
    this.name = dto.name;
    this.albumId = dto.albumId;
    this.artistId = this.artist?.id;
    this.duration = dto.duration;
    this.artist = artist;
  }
}

const artists = [new Artist({ name: 'Test', grammy: false })];
const track = new Track(
  { name: 'Track', duration: 123, artistId: null, albumId: null },
  artists[0],
);
console.log(track);
artists.length = 0;
console.log(track);
