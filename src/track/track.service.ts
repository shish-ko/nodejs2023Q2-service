import { Injectable, Inject } from '@nestjs/common';
import { DBservice } from 'src/dataBase/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/Track';
import { getUniqueItem } from 'src/utils';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(@Inject(DBservice) private db: DBservice) {}

  addTrack(dto: CreateTrackDto) {
    const track = new Track(dto);
    if (dto.artistId) {
      this.db.artists
        .find((artist) => artist.id === dto.artistId)
        .addTrack(track);
    }
    return this.db.tracks.create(track);
  }
  getAllTracks() {
    return this.db.tracks.findMany();
  }
  getTrack(id: string) {
    return getUniqueItem(id, this.db.tracks);
  }
  updateTrack(id: string, dto: UpdateTrackDto) {
    getUniqueItem(id, this.db.tracks);
    return this.db.tracks.update(id, Object.entries(dto));
  }
  deleteTrack(id: string) {
    getUniqueItem(id, this.db.tracks);
    return this.db.tracks.delete(id);
  }
}
