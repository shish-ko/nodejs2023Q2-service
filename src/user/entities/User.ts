import { CreateUserDto } from '../dto/create-user.dto';
import { v4 as uuid } from 'uuid';

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
}

export enum USER {
  LOGIN = 'login',
  PASSWORD = 'password',
  VERSION = 'version',
  UPDATEDAT = 'updatedAt',
}
