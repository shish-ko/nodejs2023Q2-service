import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FAVORITE } from './entities/favorite.entity';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly service: FavoriteService) {}

  @Post(':type/:id')
  create(@Param('id') id: string, @Param('type') type: string) {
    if (!Object.values(FAVORITE).includes(type))
      throw new HttpException('does not exist', 404);
    return this.service.addFavs(type, id);
  }

  @Get()
  findAll() {
    return this.service.getAll();
  }

  @Delete(':type/:id')
  @HttpCode(204)
  delete(@Param('id') id: string, @Param('type') type: string) {
    if (!Object.values(FAVORITE).includes(type))
      throw new HttpException('does not exist', 404);
    return this.service.removeFavs(type, id);
  }
}
