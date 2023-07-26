import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/user/dto/update-user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DBservice {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: Favorites[];

  constructor() {
    this.users = [];
    this.artists = [];
    this.tracks = [];
    this.albums = [];
    this.favorites = [];
  }
  addUser(dto: CreateUserDto) {
    const user = new User(dto);
    this.users.push(user);
    return user;
  }

  updateUser(id: string, dto: UpdatePasswordDto) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      // TODO Throw
    }
    user.updateUser(dto);
    return user;
  }
}

export class User {
  id: string;
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
  constructor(dto: CreateUserDto) {
    this.id = uuid();
    this.login = dto.login;
    this.password = dto.password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  updateUser(dto: UpdatePasswordDto) {
    if (this.password === dto.oldPassword) {
      this.password = dto.newPassword;
      this.updatedAt = Date.now();
      this.version += 1;
    }
  }
}
