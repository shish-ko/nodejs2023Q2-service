import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Put,
  Param,
  HttpCode,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private service: TrackService) {}

  @Get()
  getAllTracks() {
    return this.service.getAllTracks();
  }

  @Get(':id')
  getTrack(@Param('id') id: string) {
    return this.service.getTrack(id);
  }

  @Post()
  addTrack(@Body() dto: CreateTrackDto) {
    return this.service.addTrack(dto);
  }

  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() dto: UpdateTrackDto) {
    return this.service.updateTrack(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    return this.service.deleteTrack(id);
  }
}
