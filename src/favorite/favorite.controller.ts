import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HostParam
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly service: FavoriteService) {}

  @Post(':type/:id')
  create(@Param('id') id: string, @Param('type') type: string) {
    return this.service.update(type, id);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.favoriteService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateFavoriteDto: UpdateFavoriteDto,
  // ) {
  //   return this.favoriteService.update(+id, updateFavoriteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.favoriteService.remove(+id);
  // }
}
