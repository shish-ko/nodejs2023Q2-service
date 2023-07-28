import { Injectable, Inject } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { DBservice } from 'src/dataBase/db.service';

@Injectable()
export class FavoriteService {
  constructor(@Inject(DBservice) private db: DBservice) {}
  create(createFavoriteDto: CreateFavoriteDto) {
    return 'This action adds a new favorite';
  }

  findAll() {
    return `This action returns all favorite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(type: string, id: string) {
    this.db.
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
