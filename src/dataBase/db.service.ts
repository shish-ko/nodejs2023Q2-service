import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/user/dto/update-user.dto';
import { v4 as uuid, validate } from 'uuid';
import { DBStorage } from './dbStorage';
import { User } from 'src/user/entities/User';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/Track';
import { Album } from 'src/albums/entities/album.entity';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { PrismaClient } from '@prisma/client';
import { env } from 'process';

@Injectable()
export class DBservice extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: env.DATABASE_URL,
        },
      },
    });
  }
}
