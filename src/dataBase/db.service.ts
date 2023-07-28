import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/user/dto/update-user.dto';
import { v4 as uuid, validate } from 'uuid';
import { DBStorage } from './dbStorage';
import { User } from 'src/user/entities/User';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/Track';
import { Album } from 'src/albums/entities/album.entity';

const dbBootstrap: User[] = [
  {
    id: '8d923674-c999-45d1-b9ef-87330e367b8f',
    login: 'test1',
    password: '123',
    version: 1,
    createdAt: 1690443663540,
    updatedAt: 1690443663540,
  },
  {
    id: '73444a19-faf3-4296-8b98-e5c8f98cf960',
    login: 'test2',
    password: '123',
    version: 1,
    createdAt: 1690443969772,
    updatedAt: 1690443969772,
  },
];

@Injectable()
export class DBservice {
  users: DBStorage<User>;
  artists: DBStorage<Artist>;
  tracks: DBStorage<Track>;
  albums: DBStorage<Album>;
  // favorites: DBStorage<Favorites>;

  constructor() {
    this.users = new DBStorage<User>();
    this.artists = new DBStorage<Artist>();
    this.tracks = new DBStorage<Track>();
    this.albums = new DBStorage<Album>();
    // this.favorites = new DBStorage<Favorites>();
    // for (const user of dbBootstrap) {
    //   this.users.create(user);
    // }
  }
}
