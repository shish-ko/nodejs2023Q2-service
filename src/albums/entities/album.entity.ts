import { v4 as uuid } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { Track } from 'src/track/entities/Track';

export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
  private trackReferences: Track[];
  constructor(dto: CreateAlbumDto) {
    this.id = uuid();
    this.name = dto.name;
    this.artistId = dto.artistId;
    this.year = dto.year;
    this.trackReferences = [];
  }
  addTrack(track: Track) {
    this.trackReferences.push(track);
  }
  deleteReferences() {
    this.trackReferences.forEach((track) => (track.albumId = null));
  }
}
