import { v4 as uuid } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/track/entities/Track';

export class Artist {
  id: string;
  name: string;
  grammy: boolean;
  #trackReferences: Track[] = [];
  #albumReferences: Album[] = [];
  constructor(dto: CreateArtistDto) {
    this.id = uuid();
    this.grammy = dto.grammy;
    this.name = dto.name;
  }
  deleteReferences() {
    this.#trackReferences.forEach((track) => (track.artistId = null));
    this.#albumReferences.forEach((album) => (album.artistId = null));
  }
  addTrack(track: Track) {
    this.#trackReferences.push(track);
  }
  addAlbum(album: Album) {
    this.#albumReferences.push(album);
  }
}
