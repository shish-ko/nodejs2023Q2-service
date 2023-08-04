import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpException,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FAVORITE } from './entities/favorite.entity';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly service: FavoriteService) {}

  @Post(':type/:id')
  create(@Param('id', ParseUUIDPipe) id: string, @Param('type') type: string) {
    return this.service.addFavs(type, id);
  }

  @Get()
  findAll() {
    return this.service.getAll();
  }

  @Delete(':type/:id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string, @Param('type') type: string) {
    return this.service.removeFavs(type, id);
  }
}
