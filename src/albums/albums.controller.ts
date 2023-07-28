import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly service: AlbumsService) {}

  @Get()
  getAllTracks() {
    return this.service.getAllAlbums();
  }

  @Get(':id')
  getTrack(@Param('id') id: string) {
    return this.service.getAlbum(id);
  }

  @Post()
  addTrack(@Body() dto: CreateAlbumDto) {
    return this.service.addAlbum(dto);
  }

  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
    return this.service.updateAlbum(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    return this.service.deleteAlbum(id);
  }
}
