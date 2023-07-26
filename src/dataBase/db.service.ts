import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/user/dto/update-user.dto';
import { v4 as uuid, validate } from 'uuid';
import { DBStorage } from './dbStorage';
import { User } from 'src/user/entities/User';

type Idb = {
  users: DBStorage<User>;
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: Favorites[];
};

const db: Idb = {
  users: new DBStorage<User>(),
  artists: [],
  tracks: [],
  albums: [],
  favorites: [],
};

@Injectable()
export class DBservice {
  d: Idb;
  a: string;
  // users: User[];
  // artists: Artist[];
  // tracks: Track[];
  // albums: Album[];
  // favorites: Favorites[];

  constructor() {
    this.d = db;
    this.a = 'qqwer';
    console.log(this.d);
  }
}
