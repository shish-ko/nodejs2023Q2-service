import { Injectable, Inject } from '@nestjs/common';
import { DBservice } from 'src/dataBase/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(@Inject(DBservice) private db: DBservice) {}

  async addTrack(dto: CreateTrackDto) {
    return await this.db.track.create({ data: dto });
  }
  async getAllTracks() {
    return await this.db.track.findMany();
  }
  async getTrack(id: string) {
    return await this.db.track.findUniqueOrThrow({ where: { id } });
  }
  async updateTrack(id: string, dto: UpdateTrackDto) {
    return this.db.track.update({ where: { id }, data: dto });
  }
  deleteTrack(id: string) {
    return this.db.track.delete({ where: { id } });
  }
}
